import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create Prisma client with proper error handling for Vercel
function createPrismaClient() {
  try {
    return new PrismaClient({
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error"],
      errorFormat: "pretty",
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  } catch (error) {
    console.error("Failed to create Prisma client:", error);
    return null;
  }
}

// Enhanced Prisma configuration for Supabase and Vercel
export const prisma =
  globalForPrisma.prisma ??
  (() => {
    // During build time, DATABASE_URL might not be available
    if (!process.env.DATABASE_URL) {
      console.log(
        "DATABASE_URL not available, skipping Prisma client creation"
      );
      return null as any;
    }

    return createPrismaClient();
  })();

// Ensure proper connection management
if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}
