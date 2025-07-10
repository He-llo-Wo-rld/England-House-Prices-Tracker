import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        status: "error",
        message: "DATABASE_URL environment variable not set",
        timestamp: new Date().toISOString(),
      });
    }

    if (!prisma) {
      return NextResponse.json({
        status: "error",
        message: "Prisma client not initialized",
        timestamp: new Date().toISOString(),
      });
    }

    await prisma.$queryRaw`SELECT 1 as test`;
    const regionCount = await prisma.region.count();
    const propertyCount = await prisma.property.count();

    return NextResponse.json({
      status: "connected",
      message: "Database connection successful",
      data: {
        regions: regionCount,
        properties: propertyCount,
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
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
