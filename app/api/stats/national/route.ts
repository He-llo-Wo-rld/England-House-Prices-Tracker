import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get overall statistics
    const totalProperties = await prisma.property.count();

    const averagePrice = await prisma.property.aggregate({
      _avg: { price: true },
    });

    // Get latest month's data for YoY comparison
    const latestMonth = await prisma.regionMonthlyStats.findFirst({
      orderBy: { month: "desc" },
    });

    // Calculate national YoY change (simplified - would need proper aggregation)
    const nationalYoYChange = await prisma.regionMonthlyStats.aggregate({
      _avg: { priceChangeYoY: true },
      where: {
        month: latestMonth?.month,
      },
    });

    // Get top performing region
    const topRegion = await prisma.regionMonthlyStats.findFirst({
      where: {
        month: latestMonth?.month,
      },
      include: {
        region: true,
      },
      orderBy: { priceChangeYoY: "desc" },
    });

    // Get property type breakdown
    const propertyTypeBreakdown = await prisma.property.groupBy({
      by: ["propertyType"],
      _avg: { price: true },
      _count: { id: true },
    });

    // Get regional breakdown
    const regionalBreakdown = await prisma.region.findMany({
      include: {
        monthlyStats: {
          orderBy: { month: "desc" },
          take: 1,
        },
      },
    });

    const nationalStats = {
      averagePrice: Math.round(averagePrice._avg.price || 0),
      priceChangeYoY: nationalYoYChange._avg.priceChangeYoY || 0,
      priceChangeMoM: 2.1, // Would need month-over-month calculation
      totalSales: totalProperties,
      lastUpdated: latestMonth?.month || new Date().toISOString(),
      topPerformer: {
        name: topRegion?.region.name || "Unknown",
        region: "UK",
        change: topRegion?.priceChangeYoY || 0,
      },
      dataSource: "HM Land Registry",
      marketTrend:
        (nationalYoYChange._avg.priceChangeYoY || 0) > 0
          ? ("increasing" as const)
          : ("decreasing" as const),
      averagePriceByType: {
        detached: Math.round(
          propertyTypeBreakdown.find((p) => p.propertyType === "DETACHED")?._avg
            .price || 0
        ),
        semi: Math.round(
          propertyTypeBreakdown.find((p) => p.propertyType === "SEMI_DETACHED")
            ?._avg.price || 0
        ),
        terraced: Math.round(
          propertyTypeBreakdown.find((p) => p.propertyType === "TERRACED")?._avg
            .price || 0
        ),
        flat: Math.round(
          propertyTypeBreakdown.find((p) => p.propertyType === "FLAT")?._avg
            .price || 0
        ),
      },
      regionalBreakdown: regionalBreakdown.reduce((acc, region) => {
        const latest = region.monthlyStats[0];
        acc[region.slug] = {
          averagePrice: latest?.averagePrice || 0,
          change: latest?.priceChangeYoY || 0,
        };
        return acc;
      }, {} as Record<string, { averagePrice: number; change: number }>),
    };

    return NextResponse.json({
      success: true,
      data: nationalStats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("National Stats API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch national statistics",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
