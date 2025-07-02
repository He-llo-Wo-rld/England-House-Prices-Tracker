import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Skip database operations during build time or when DATABASE_URL is not available
  if (!process.env.DATABASE_URL) {
    console.log("DATABASE_URL not available");
    return NextResponse.json({
      success: true,
      regions: [],
      message: "Database not configured",
    });
  }

  // Additional check for prisma client availability
  if (!prisma) {
    console.log("Prisma client not available");
    return NextResponse.json({
      success: true,
      regions: [],
      message: "Database client not available",
    });
  }

  try {
    // Test database connection first
    console.log("Testing database connection in regions API...");
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connection successful");

    const { searchParams } = new URL(request.url);
    const regionSlug = searchParams.get("region");

    if (regionSlug) {
      console.log(`Fetching specific region: ${regionSlug}`);
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

      // Get property type breakdown (with error handling)
      let propertyTypes = {
        detached: { price: 0 },
        semi: { price: 0 },
        terraced: { price: 0 },
        flat: { price: 0 },
      };

      try {
        const propertyBreakdown = await prisma.property.groupBy({
          by: ["propertyType"],
          where: { regionId: region.id },
          _avg: { price: true },
          _count: { id: true },
        });

        propertyTypes = {
          detached: {
            price: Math.round(
              propertyBreakdown.find((p: any) => p.propertyType === "DETACHED")
                ?._avg.price || 0
            ),
          },
          semi: {
            price: Math.round(
              propertyBreakdown.find(
                (p: any) => p.propertyType === "SEMI_DETACHED"
              )?._avg.price || 0
            ),
          },
          terraced: {
            price: Math.round(
              propertyBreakdown.find((p: any) => p.propertyType === "TERRACED")
                ?._avg.price || 0
            ),
          },
          flat: {
            price: Math.round(
              propertyBreakdown.find((p: any) => p.propertyType === "FLAT")
                ?._avg.price || 0
            ),
          },
        };
      } catch (propertyError) {
        console.error("Error fetching property breakdown:", propertyError);
      }

      return NextResponse.json({
        id: region.id,
        name: region.name,
        slug: region.slug,
        averagePrice: latestStats?.averagePrice || 0,
        priceChange: latestStats?.priceChangeYoY || 0,
        salesCount: region._count.properties,
        description: `Major UK region with ${region._count.properties} recorded sales`,
        lastUpdated: latestStats?.month || region.updatedAt,
        propertyTypes,
      });
    }

    // Get all regions
    console.log("Fetching all regions...");
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

    console.log(`Found ${regions.length} regions`);

    // Get property counts and averages for each region
    const regionsWithStats = regions.map((region: any) => {
      const latestStats = region.monthlyStats[0];
      const averagePrice = latestStats?.averagePrice || 0;
      const priceChange = latestStats?.priceChangeYoY || 0;

      return {
        id: region.id,
        name: region.name,
        slug: region.slug,
        averagePrice,
        priceChange,
        salesCount: region._count.properties,
        description: `${region._count.properties} properties sold`,
        lastUpdated: latestStats?.month || region.updatedAt,
      };
    });

    return NextResponse.json({
      success: true,
      regions: regionsWithStats,
    });
  } catch (error) {
    console.error("Database error in regions API:", error);

    // More specific error handling
    if (error instanceof Error) {
      if (
        error.message.includes("connect") ||
        error.message.includes("timeout")
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Database connection failed",
            details:
              process.env.NODE_ENV === "development"
                ? error.message
                : undefined,
          },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch regions",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}
