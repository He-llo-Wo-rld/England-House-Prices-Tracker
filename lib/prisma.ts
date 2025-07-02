import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Enhanced Prisma configuration for Supabase and Vercel
export const prisma =
  globalForPrisma.prisma ??
  (() => {
    // During build time, DATABASE_URL might not be available
    if (!process.env.DATABASE_URL) {
      console.log("DATABASE_URL not available, skipping Prisma client creation");
      return null as any;
    }

    try {
      // For Vercel deployment, use connection pooling and proper timeout settings
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
      console.warn("Failed to create Prisma client:", error);
      return null as any;
    }
  })();

// Ensure proper connection management and cleanup
if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}
