import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  try {
    return new PrismaClient({

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

export const prisma =
  globalForPrisma.prisma ??
  (() => {
    if (!process.env.DATABASE_URL) {
      console.log(
        "DATABASE_URL not available, skipping Prisma client creation"
      );
      return null as any;
    }

    return createPrismaClient();
  })();

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}
