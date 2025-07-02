import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || searchParams.get("query");
    const limit = parseInt(searchParams.get("limit") || "20");

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Search query is required" },
        { status: 400 }
      );
    }

    const searchTerm = query.trim();

    // Try different search strategies
    let properties = [];
    let regionInfo = null;

    // 1. Search by postcode (exact and partial)
    properties = await prisma.property.findMany({
      where: {
        postcode: {
          contains: searchTerm.toUpperCase(),
          mode: "insensitive",
        },
      },
      include: {
        region: true,
      },
      orderBy: {
        dateSold: "desc",
      },
      take: limit,
    });

    // 2. If no results, try region name search
    if (properties.length === 0) {
      // Special city mappings
      let regionName = null;
      const lowerTerm = searchTerm.toLowerCase();

      if (lowerTerm === "manchester") {
        regionName = "North West";
      } else if (lowerTerm === "birmingham") {
        regionName = "West Midlands";
      } else if (lowerTerm === "leeds") {
        regionName = "Yorkshire and the Humber";
      } else if (lowerTerm === "london") {
        regionName = "London";
      } else if (lowerTerm === "bristol") {
        regionName = "South West";
      } else if (lowerTerm === "liverpool") {
        regionName = "North West";
      } else {
        regionName = searchTerm;
      }

      // Find region
      const region = await prisma.region.findFirst({
        where: {
          OR: [
            {
              name: {
                equals: regionName,
                mode: "insensitive",
              },
            },
            {
              name: {
                contains: regionName,
                mode: "insensitive",
              },
            },
          ],
        },
      });

      if (region) {
        // Get properties from this region
        properties = await prisma.property.findMany({
          where: {
            regionId: region.id,
          },
          include: {
            region: true,
          },
          orderBy: {
            dateSold: "desc",
          },
          take: limit,
        });

        regionInfo = {
          name: region.name,
          slug: region.slug,
          propertyCount: properties.length,
        };
      }
    }

    const prices = properties.map((p) => p.price);
    const stats = {
      totalFound: properties.length,
      averagePrice:
        prices.length > 0
          ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
          : 0,
      minPrice: prices.length > 0 ? Math.min(...prices) : 0,
      maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
    };

    const response = {
      success: true,
      query: searchTerm,
      data: {
        recentSales: properties.map((property) => ({
          id: property.id,
          postcode: property.postcode,
          price: property.price,
          propertyType: property.propertyType,
          dateSold: property.dateSold,
          latitude: property.latitude,
          longitude: property.longitude,
          region: property.region?.name,
        })),
        properties: properties.map((property) => ({
          id: property.id,
          postcode: property.postcode,
          price: property.price,
          propertyType: property.propertyType,
          dateSold: property.dateSold,
          latitude: property.latitude,
          longitude: property.longitude,
          region: property.region?.name,
        })),
        statistics: stats,
        region: regionInfo,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Search failed" },
      { status: 500 }
    );
  }
}
