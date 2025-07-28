import { PrismaClient, PropertyType } from "@prisma/client";

//npx tsx prisma/seed-england-7days.ts

const prisma = new PrismaClient();

const englandRegions = [
  {
    name: "London",
    slug: "london",
    postcode: "SW1A1AA",
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    name: "South East",
    slug: "south-east",
    postcode: "RG11AA",
    lat: 51.4584,
    lng: -0.9738,
  },
  {
    name: "South West",
    slug: "south-west",
    postcode: "BS11AA",
    lat: 51.4545,
    lng: -2.5879,
  },
  {
    name: "East of England",
    slug: "east-england",
    postcode: "CB11AA",
    lat: 52.2053,
    lng: 0.1218,
  },
  {
    name: "West Midlands",
    slug: "west-midlands",
    postcode: "B11AA",
    lat: 52.4862,
    lng: -1.8904,
  },
  {
    name: "East Midlands",
    slug: "east-midlands",
    postcode: "NG11AA",
    lat: 52.9548,
    lng: -1.1581,
  },
  {
    name: "Yorkshire and the Humber",
    slug: "yorkshire-humber",
    postcode: "LS11AA",
    lat: 53.8008,
    lng: -1.5491,
  },
  {
    name: "North West",
    slug: "north-west",
    postcode: "M11AA",
    lat: 53.4808,
    lng: -2.2426,
  },
  {
    name: "North East",
    slug: "north-east",
    postcode: "NE11AA",
    lat: 54.9783,
    lng: -1.6178,
  },
];

const getEnglandPrices = (slug: string) => {
  const prices: Record<string, { min: number; max: number }> = {
    london: { min: 400000, max: 2000000 },
    "south-east": { min: 300000, max: 1200000 },
    "south-west": { min: 250000, max: 800000 },
    "east-england": { min: 280000, max: 900000 },
    "west-midlands": { min: 160000, max: 600000 },
    "east-midlands": { min: 150000, max: 500000 },
    "yorkshire-humber": { min: 130000, max: 450000 },
    "north-west": { min: 140000, max: 550000 },
    "north-east": { min: 100000, max: 350000 },
  };
  return prices[slug] || { min: 150000, max: 400000 };
};

const englandGrowthRates: Record<string, number> = {
  london: 6.2,
  "south-east": 5.8,
  "south-west": 7.1,
  "east-england": 6.5,
  "west-midlands": 8.8,
  "east-midlands": 9.2,
  "yorkshire-humber": 10.1,
  "north-west": 9.9,
  "north-east": 11.2,
};

const getPropertiesPerRegion = (
  regionSlug: string,
  totalProperties: number
) => {
  const marketShare: Record<string, number> = {
    london: 0.19,
    "south-east": 0.17,
    "north-west": 0.14,
    "yorkshire-humber": 0.11,
    "west-midlands": 0.1,
    "east-england": 0.09,
    "south-west": 0.08,
    "east-midlands": 0.07,
    "north-east": 0.05,
  };

  return Math.round(totalProperties * (marketShare[regionSlug] || 0.08));
};

async function main() {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  console.log(`📅 Period: ${formatDate(startDate)} to ${formatDate(endDate)}`);
  console.log("");

  // 🗑️ CLEAR DATABASE
  console.log("🗑️ Clearing database...");
  await prisma.regionMonthlyStats.deleteMany();
  await prisma.property.deleteMany();
  await prisma.region.deleteMany();
  console.log("✅ Database cleared!");

  const createdRegions = [];

  // Create England regions
  for (const regionData of englandRegions) {
    const region = await prisma.region.create({
      data: {
        name: regionData.name,
        slug: regionData.slug,
      },
    });

    createdRegions.push({ ...region, ...regionData });
    console.log(`✅ Created region: ${region.name}`);
  }

  const propertyTypes = [
    PropertyType.DETACHED,
    PropertyType.SEMI_DETACHED,
    PropertyType.TERRACED,
    PropertyType.FLAT,
  ];

  const totalWeeklyProperties = 1000;
  let totalGenerated = 0;

  for (const region of createdRegions) {
    const regionProperties = getPropertiesPerRegion(
      region.slug,
      totalWeeklyProperties
    );
    console.log(
      `🏠 Creating ${regionProperties} properties for ${region.name} (last 7 days)...`
    );

    const priceRange = getEnglandPrices(region.slug);

    for (let i = 0; i < regionProperties; i++) {
      const propertyType =
        propertyTypes[Math.floor(Math.random() * propertyTypes.length)];

      const typeMultiplier = {
        [PropertyType.DETACHED]: 1.5,
        [PropertyType.SEMI_DETACHED]: 1.2,
        [PropertyType.TERRACED]: 1.0,
        [PropertyType.FLAT]: 0.7,
      };

      const basePrice =
        priceRange.min + Math.random() * (priceRange.max - priceRange.min);
      const price = Math.round(basePrice * typeMultiplier[propertyType]);

      const dateSold = new Date(
        startDate.getTime() +
          Math.random() * (endDate.getTime() - startDate.getTime())
      );

      const lat = region.lat + (Math.random() - 0.5) * 0.08;
      const lng = region.lng + (Math.random() - 0.5) * 0.08;

      const getRealisticPostcode = (
        basePostcode: string,
        index: number,
        regionSlug: string
      ) => {
        if (regionSlug === "yorkshire-humber") {
          const leedsCodes = [
            "LS1",
            "LS2",
            "LS3",
            "LS4",
            "LS5",
            "LS6",
            "LS7",
            "LS8",
            "LS9",
            "LS10",
            "LS11",
            "LS12",
            "LS13",
            "LS14",
            "LS15",
            "LS16",
            "LS17",
            "LS18",
            "LS19",
            "LS20",
            "LS25",
            "LS26",
            "LS27",
            "LS28",
          ];
          const bradfordCodes = [
            "BD1",
            "BD2",
            "BD3",
            "BD4",
            "BD5",
            "BD6",
            "BD7",
            "BD8",
            "BD9",
            "BD10",
          ];
          const yorkCodes = [
            "YO1",
            "YO10",
            "YO24",
            "YO26",
            "YO30",
            "YO31",
            "YO32",
          ];
          const allCodes = [...leedsCodes, ...bradfordCodes, ...yorkCodes];
          const selectedCode = allCodes[index % allCodes.length];
          return `${selectedCode} ${
            Math.floor(Math.random() * 9) + 1
          }${String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          )}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
        }

        if (regionSlug === "london") {
          const londonAreas = [
            "SW1",
            "SW2",
            "SW3",
            "SW4",
            "SW5",
            "SW6",
            "SW7",
            "SW8",
            "SW9",
            "SW10",
            "SE1",
            "SE5",
            "SE10",
            "SE15",
            "N1",
            "N4",
            "N7",
            "N16",
            "E1",
            "E2",
            "E8",
            "E14",
            "W1",
            "W2",
            "W6",
            "W8",
            "NW1",
            "NW3",
            "NW6",
            "NW8",
          ];
          const selectedArea = londonAreas[index % londonAreas.length];
          return `${selectedArea} ${
            Math.floor(Math.random() * 9) + 1
          }${String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          )}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
        }

        if (regionSlug === "north-west") {
          const manchesterCodes = [
            "M1",
            "M2",
            "M3",
            "M4",
            "M5",
            "M8",
            "M9",
            "M11",
            "M12",
            "M13",
            "M14",
            "M15",
            "M16",
            "M17",
            "M18",
            "M19",
            "M20",
            "M21",
            "M22",
            "M23",
            "M24",
            "M25",
            "M26",
            "M27",
            "M28",
            "M30",
            "M32",
            "M33",
            "M34",
            "M35",
            "M38",
            "M40",
            "M41",
            "M43",
            "M44",
            "M45",
            "M46",
            "M50",
            "M60",
            "M90",
          ];
          const liverpoolCodes = [
            "L1",
            "L2",
            "L3",
            "L4",
            "L5",
            "L6",
            "L7",
            "L8",
            "L9",
            "L10",
            "L11",
            "L12",
            "L13",
            "L14",
            "L15",
            "L17",
            "L18",
            "L19",
            "L20",
            "L21",
            "L22",
            "L23",
            "L24",
            "L25",
          ];
          const allCodes = [...manchesterCodes, ...liverpoolCodes];
          const selectedCode = allCodes[index % allCodes.length];
          return `${selectedCode} ${
            Math.floor(Math.random() * 9) + 1
          }${String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          )}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
        }

        if (regionSlug === "west-midlands") {
          const birminghamCodes = [
            "B1",
            "B2",
            "B3",
            "B4",
            "B5",
            "B6",
            "B7",
            "B8",
            "B9",
            "B10",
            "B11",
            "B12",
            "B13",
            "B14",
            "B15",
            "B16",
            "B17",
            "B18",
            "B19",
            "B20",
            "B21",
            "B23",
            "B24",
            "B25",
            "B26",
            "B27",
            "B28",
            "B29",
            "B30",
            "B31",
            "B32",
            "B33",
            "B34",
            "B35",
            "B36",
            "B37",
            "B38",
            "B42",
            "B43",
            "B44",
            "B45",
            "B46",
            "B47",
            "B48",
            "B49",
            "B50",
            "B60",
            "B61",
            "B62",
            "B63",
            "B64",
            "B65",
            "B66",
            "B67",
            "B68",
            "B69",
            "B70",
            "B71",
            "B72",
            "B73",
            "B74",
            "B75",
            "B76",
            "B77",
            "B78",
            "B79",
            "B80",
            "B90",
            "B91",
            "B92",
            "B93",
            "B94",
            "B95",
            "B96",
            "B97",
            "B98",
          ];
          const coventryCodes = [
            "CV1",
            "CV2",
            "CV3",
            "CV4",
            "CV5",
            "CV6",
            "CV7",
            "CV8",
          ];
          const allCodes = [...birminghamCodes, ...coventryCodes];
          const selectedCode = allCodes[index % allCodes.length];
          return `${selectedCode} ${
            Math.floor(Math.random() * 9) + 1
          }${String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          )}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
        }

        const variations = [
          `${basePostcode.substring(0, 3)}${
            (index % 9) + 1
          }${basePostcode.slice(-2)}`,
          `${basePostcode.substring(0, 2)}${Math.floor(index / 10) + 1} ${
            (index % 9) + 1
          }${basePostcode.slice(-2)}`,
          `${basePostcode.substring(0, 4)} ${(index + 1)
            .toString()
            .padStart(2, "0")}${String.fromCharCode(65 + (index % 26))}`,
        ];
        return variations[index % 3];
      };

      const postcode = getRealisticPostcode(region.postcode, i, region.slug);

      await prisma.property.create({
        data: {
          postcode,
          price,
          propertyType,
          dateSold,
          regionId: region.id,
          latitude: lat,
          longitude: lng,
        },
      });
    }

    totalGenerated += regionProperties;

    console.log(`📊 Creating weekly stats for ${region.name}...`);

    const weeklyAvg = await prisma.property.aggregate({
      _avg: { price: true },
      _count: { id: true },
      where: {
        regionId: region.id,
        dateSold: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const avgPrice = Math.round(weeklyAvg._avg.price || priceRange.min);
    const salesCount = weeklyAvg._count.id || regionProperties;
    const yoyGrowth =
      englandGrowthRates[region.slug] + (Math.random() - 0.5) * 1.5;

    const currentMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

    await prisma.regionMonthlyStats.create({
      data: {
        regionId: region.id,
        month: currentMonth,
        averagePrice: avgPrice,
        medianPrice: Math.round(avgPrice * 0.94),
        salesCount: Math.round(salesCount * 4.3),
        priceChangeYoY: yoyGrowth,
        priceChangeMoM: (Math.random() - 0.5) * 2.5,
        detachedAvg: Math.round(avgPrice * 1.5),
        semiDetachedAvg: Math.round(avgPrice * 1.2),
        terracedAvg: avgPrice,
        flatAvg: Math.round(avgPrice * 0.7),
      },
    });

    console.log(
      `✅ ${
        region.name
      }: ${salesCount} sales, avg £${avgPrice.toLocaleString()}`
    );
  }

  console.log("");
  console.log("🎉 ENGLAND WEEKLY DATA COMPLETED!");
  console.log("");
  console.log("📊 Summary:");
  console.log(`• 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England regions: ${createdRegions.length}`);
  console.log(`• 🏠 Properties generated: ${totalGenerated}`);
  console.log(
    `• 📅 Date range: ${formatDate(startDate)} to ${formatDate(endDate)}`
  );
  console.log(`• 📊 Weekly stats: ${createdRegions.length} regions`);
  console.log(`• 💾 Database size: ~${Math.round(totalGenerated * 0.25)}KB`);
  console.log(`• ⚡ Load time: ~${Math.round(totalGenerated / 10)}ms`);
  console.log("");
  console.log("🔄 Data updates automatically based on current date!");

}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

