import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("🔥 Trending API called");

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "5");
    const minChange = parseFloat(searchParams.get("minChange") || "0");
    const region = searchParams.get("region");

    console.log("📊 Trending params:", { limit, minChange, region });

    // Get trending regions based on latest price changes
    const latestMonth = await prisma.regionMonthlyStats.findFirst({
      orderBy: { month: "desc" },
      select: { month: true },
    });

    if (!latestMonth) {
      console.log("❌ No monthly stats found");
      return NextResponse.json({
        success: true,
        data: [],
        meta: {
          total: 0,
          filters: {
            limit,
            minChange: minChange || null,
            region: region || null,
          },
          lastUpdated: new Date().toISOString(),
        },
      });
    }

    console.log("📅 Latest month:", latestMonth.month);

    let whereClause: any = {
      month: latestMonth.month,
      priceChangeYoY: { gte: minChange },
    };

    if (region) {
      whereClause.region = {
        name: { contains: region, mode: "insensitive" },
      };
    }

    const trendingStats = await prisma.regionMonthlyStats.findMany({
      where: whereClause,
      include: {
        region: true,
      },
      orderBy: { priceChangeYoY: "desc" },
      take: limit,
    });

    console.log(`✅ Found ${trendingStats.length} trending areas`);

    const trendingData = trendingStats.map((stat, index) => ({
      id: stat.id,
      name: stat.region.name,
      region: stat.region.name, // Could be more specific regional data
      priceChange: stat.priceChangeYoY,
      averagePrice: stat.averagePrice,
      reason: getTrendingReason(stat.region.name, stat.priceChangeYoY),
      salesVolume: stat.salesCount,
      marketCap: getMarketCap(stat.averagePrice),
      trend: getTrendType(stat.priceChangeYoY),
      coordinates: {
        lat: getCoordinates(stat.region.name).lat,
        lng: getCoordinates(stat.region.name).lng,
      },
    }));

    return NextResponse.json({
      success: true,
      data: trendingData,
      meta: {
        total: trendingData.length,
        filters: {
          limit,
          minChange: minChange || null,
          region: region || null,
        },
        lastUpdated: latestMonth.month.toISOString(),
      },
    });
  } catch (error) {
    console.error("❌ Trending API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch trending areas",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Helper functions
function getTrendingReason(regionName: string, priceChange: number): string {
  const reasons = {
    london: "Financial sector growth and limited supply",
    manchester: "Tech sector expansion and urban regeneration",
    birmingham: "HS2 infrastructure development",
    bristol: "Strong job market and university presence",
    leeds: "Northern Powerhouse investment",
    liverpool: "Cultural quarter development",
  };

  const key = regionName.toLowerCase();
  if (reasons[key as keyof typeof reasons]) {
    return reasons[key as keyof typeof reasons];
  }

  if (priceChange > 15) return "Exceptional market conditions";
  if (priceChange > 10) return "Strong local demand";
  if (priceChange > 5) return "Steady growth market";
  return "Market adjustment";
}

function getMarketCap(averagePrice: number): "small" | "medium" | "large" {
  if (averagePrice > 500000) return "large";
  if (averagePrice > 300000) return "medium";
  return "small";
}

function getTrendType(
  priceChange: number
): "strongly_increasing" | "increasing" | "stable" | "decreasing" {
  if (priceChange > 15) return "strongly_increasing";
  if (priceChange > 5) return "increasing";
  if (priceChange > -2) return "stable";
  return "decreasing";
}

function getCoordinates(regionName: string): { lat: number; lng: number } {
  const coordinates = {
    london: { lat: 51.5074, lng: -0.1278 },
    manchester: { lat: 53.4808, lng: -2.2426 },
    birmingham: { lat: 52.4862, lng: -1.8904 },
    bristol: { lat: 51.4545, lng: -2.5879 },
    leeds: { lat: 53.8008, lng: -1.5491 },
    liverpool: { lat: 53.4084, lng: -2.9916 },
  };

  const key = regionName.toLowerCase();
  return (
    coordinates[key as keyof typeof coordinates] || {
      lat: 52.3555,
      lng: -1.1743,
    }
  ); // UK center
}
