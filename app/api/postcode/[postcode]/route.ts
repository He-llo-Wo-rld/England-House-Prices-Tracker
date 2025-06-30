import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { postcode: string } }
) {
  try {
    console.log("📮 Postcode API called for:", params.postcode);

    const postcode = decodeURIComponent(params.postcode).toUpperCase();
    console.log("🔍 Searching for postcode:", postcode);

    // Find properties with this postcode
    const properties = await prisma.property.findMany({
      where: {
        postcode: { contains: postcode, mode: "insensitive" },
      },
      include: {
        region: true,
      },
      orderBy: { dateSold: "desc" },
      take: 20,
    });

    console.log(`✅ Found ${properties.length} properties for ${postcode}`);

    if (properties.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Postcode not found",
          postcode,
          suggestions: [
            "Try a different postcode format (e.g., SW1A 1AA)",
            "Check if the postcode exists in our database",
            "Search for a nearby area instead",
          ],
        },
        { status: 404 }
      );
    }

    // Calculate stats for this postcode area
    const prices = properties.map((p) => p.price);
    const averagePrice = Math.round(
      prices.reduce((a, b) => a + b, 0) / prices.length
    );
    const medianPrice = prices.sort((a, b) => a - b)[
      Math.floor(prices.length / 2)
    ];
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Group by property type
    const propertyTypes = properties.reduce((acc, prop) => {
      acc[prop.propertyType] = (acc[prop.propertyType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get region stats for comparison
    const regionStats = await prisma.regionMonthlyStats.findFirst({
      where: { regionId: properties[0].region.id },
      orderBy: { month: "desc" },
    });

    const postcodeData = {
      postcode,
      region: properties[0].region.name,
      coordinates:
        properties[0].latitude && properties[0].longitude
          ? {
              lat: properties[0].latitude,
              lng: properties[0].longitude,
            }
          : null,
      statistics: {
        averagePrice,
        medianPrice,
        minPrice,
        maxPrice,
        totalSales: properties.length,
        priceRange: `£${Math.round(minPrice / 1000)}k - £${Math.round(
          maxPrice / 1000
        )}k`,
        regionAverage: regionStats?.averagePrice || 0,
        vsRegion: regionStats
          ? Math.round(
              ((averagePrice - regionStats.averagePrice) /
                regionStats.averagePrice) *
                100
            )
          : 0,
      },
      propertyTypes,
      recentSales: properties.slice(0, 10).map((prop) => ({
        id: prop.id,
        price: prop.price,
        propertyType: prop.propertyType,
        dateSold: prop.dateSold.toISOString().split("T")[0],
        coordinates:
          prop.latitude && prop.longitude
            ? {
                lat: prop.latitude,
                lng: prop.longitude,
              }
            : null,
      })),
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: postcodeData,
    });
  } catch (error) {
    console.error("❌ Postcode API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch postcode data",
        postcode: params.postcode,
      },
      { status: 500 }
    );
  }
}
