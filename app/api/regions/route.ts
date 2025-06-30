import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const regionSlug = searchParams.get("region");

    if (regionSlug) {
      // Get specific region
      const region = await prisma.region.findUnique({
        where: { slug: regionSlug },
        include: {
          monthlyStats: {
            orderBy: { month: "desc" },
            take: 12, // Last 12 months
          },
          _count: {
            select: { properties: true },
          },
        },
      });

      if (!region) {
        return NextResponse.json(
          { error: "Region not found" },
          { status: 404 }
        );
      }

      const latestStats = region.monthlyStats[0];

      // Get property type breakdown
      const propertyBreakdown = await prisma.property.groupBy({
        by: ["propertyType"],
        where: { regionId: region.id },
        _avg: { price: true },
        _count: { id: true },
      });

      const propertyTypes = {
        detached: propertyBreakdown.find((p) => p.propertyType === "DETACHED"),
        semi: propertyBreakdown.find((p) => p.propertyType === "SEMI_DETACHED"),
        terraced: propertyBreakdown.find((p) => p.propertyType === "TERRACED"),
        flat: propertyBreakdown.find((p) => p.propertyType === "FLAT"),
      };

      return NextResponse.json({
        id: region.id,
        name: region.name,
        slug: region.slug,
        averagePrice: latestStats?.averagePrice || 0,
        priceChange: latestStats?.priceChangeYoY || 0,
        salesCount: region._count.properties,
        description: `Major UK region with ${region._count.properties} recorded sales`,
        lastUpdated: latestStats?.month || region.updatedAt,
        propertyTypes: {
          detached: {
            price: Math.round(propertyTypes.detached?._avg.price || 0),
            change: 0, // Would need historical data
          },
          semi: {
            price: Math.round(propertyTypes.semi?._avg.price || 0),
            change: 0,
          },
          terraced: {
            price: Math.round(propertyTypes.terraced?._avg.price || 0),
            change: 0,
          },
          flat: {
            price: Math.round(propertyTypes.flat?._avg.price || 0),
            change: 0,
          },
        },
        priceHistory: region.monthlyStats.map((stat) => ({
          month: stat.month,
          averagePrice: stat.averagePrice,
          salesCount: stat.salesCount,
        })),
      });
    }

    // Get all regions
    const regions = await prisma.region.findMany({
      include: {
        monthlyStats: {
          orderBy: { month: "desc" },
          take: 1,
        },
        _count: {
          select: { properties: true },
        },
      },
      orderBy: { name: "asc" },
    });

    const regionsWithStats = regions.map((region) => ({
      id: region.id,
      name: region.name,
      slug: region.slug,
      averagePrice: region.monthlyStats[0]?.averagePrice || 0,
      priceChange: region.monthlyStats[0]?.priceChangeYoY || 0,
      salesCount: region._count.properties,
      description: `${region._count.properties} properties sold`,
      lastUpdated: region.monthlyStats[0]?.month || region.updatedAt,
    }));

    return NextResponse.json({
      regions: regionsWithStats,
      total: regionsWithStats.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
