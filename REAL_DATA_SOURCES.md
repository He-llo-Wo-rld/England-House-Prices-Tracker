# UK Property Data Sources

## 🏠 HM Land Registry APIs

### 1. Price Paid Data API

- **URL**: `https://landregistry.data.gov.uk/landregistry/query`
- **Format**: SPARQL queries
- **Data**: Real property sales since 1995
- **Free**: ✅ Yes
- **Rate Limits**: Reasonable for development

### 2. House Price Index API

- **URL**: `https://landregistry.data.gov.uk/data/hpi`
- **Format**: CSV/JSON
- **Data**: Monthly house price indices
- **Coverage**: England and Wales

## 📍 Postcode API

- **URL**: `https://api.postcodes.io`
- **Free**: ✅ Yes
- **Data**: Coordinates, administrative areas
- **Rate Limits**: 1000 requests/day

## 📊 ONS (Office for National Statistics)

- **URL**: `https://api.beta.ons.gov.uk`
- **Data**: Housing statistics, demographics
- **Free**: ✅ Yes

## 🔧 Usage Commands

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with REAL data
npx tsx prisma/seed-real-data.ts

# Seed with mock data (backup)
npx tsx prisma/seed.ts

# View database
npx prisma studio
```

## 📈 Data Sources by Type

### Property Sales:

- **HM Land Registry Price Paid Data**
- Updates: Monthly
- Coverage: England & Wales
- Since: 1995

### Market Statistics:

- **HM Land Registry House Price Index**
- **ONS Housing Statistics**
- Updates: Monthly

### Geographic Data:

- **Postcode.io**
- **OS Open Data**

## ⚠️ API Limits & Considerations

1. **HM Land Registry**: No strict limits but be respectful
2. **Postcode.io**: 1000 requests/day free tier
3. **Rate limiting**: Built into seed script
4. **Fallback data**: Used when APIs fail

## 🚀 Getting Started

1. Run the real data seeder:

```bash
npx tsx prisma/seed-real-data.ts
```

2. This will:

   - Fetch real UK property sales
   - Get actual postcode coordinates
   - Calculate real market statistics
   - Fallback to mock data if APIs fail

3. Check your database:

```bash
npx prisma studio
```
