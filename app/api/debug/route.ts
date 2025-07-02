import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        status: "error",
        message: "DATABASE_URL environment variable not set",
        timestamp: new Date().toISOString(),
      });
    }

    // Check if Prisma client is available
    if (!prisma) {
      return NextResponse.json({
        status: "error",
        message: "Prisma client not initialized",
        timestamp: new Date().toISOString(),
      });
    }

    // Test basic database connection
    console.log("Testing database connection...");
    await prisma.$queryRaw`SELECT 1 as test`;
    console.log("Database connection successful");

    // Check if tables exist and get basic info
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    `;

    // Try to get counts with error handling
    let regionCount = 0;
    let propertyCount = 0;
    let hasData = false;
    let error_details = null;

    try {
      regionCount = await prisma.region.count();
      propertyCount = await prisma.property.count();
      hasData = true;
      console.log(
        `Found ${regionCount} regions and ${propertyCount} properties`
      );
    } catch (countError) {
      console.error("Error counting records:", countError);
      error_details =
        countError instanceof Error
          ? countError.message
          : "Unknown count error";
    }

    // Try to get a sample region
    let sampleRegion = null;
    try {
      sampleRegion = await prisma.region.findFirst();
    } catch (regionError) {
      console.error("Error fetching sample region:", regionError);
    }

    return NextResponse.json({
      status: "connected",
      message: "Database connection successful",
      data: {
        hasData,
        tables: Array.isArray(tables) ? tables.length : 0,
        regions: regionCount,
        properties: propertyCount,
        sampleRegion: sampleRegion
          ? {
              id: sampleRegion.id,
              name: sampleRegion.name,
              slug: sampleRegion.slug,
            }
          : null,
        error_details,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    return NextResponse.json(
      {
        status: "error",
        message:
          error instanceof Error ? error.message : "Unknown database error",
        stack:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.stack
              : undefined
            : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
