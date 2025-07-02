import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        status: "error",
        message: "DATABASE_URL environment variable not set",
        timestamp: new Date().toISOString()
      });
    }

    // Check if Prisma client is available
    if (!prisma) {
      return NextResponse.json({
        status: "error",
        message: "Prisma client not initialized",
        timestamp: new Date().toISOString()
      });
    }

    // Test database connection
    await prisma.$queryRaw`SELECT 1 as test`;
    
    // Get basic database info
    const regionCount = await prisma.region.count();
    const propertyCount = await prisma.property.count();

    return NextResponse.json({
      status: "connected",
      message: "Database connection successful",
      data: {
        regions: regionCount,
        properties: propertyCount
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Database health check failed:", error);
    
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown database error",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}