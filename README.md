# England House Prices Tracker 🏠

A modern web application for tracking UK house prices with real-time data from HM Land Registry.

## ✨ Features

- 🔍 **Search by postcode or region** - Find prices in any UK location
- 📊 **Interactive charts** - Visualize price trends over time
- 🗺️ **Interactive maps** - Explore regions visually
- 💰 **Affordability calculator** - Check what you can afford
- 📱 **Responsive design** - Works on all devices
- ⚡ **Real-time data** - Latest prices from official sources

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Charts**: Recharts
- **Maps**: Leaflet + React-Leaflet
- **Deployment**: Vercel + Supabase

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Supabase account)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/uk-house-prices
   cd uk-house-prices
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your database credentials:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/uk-house-prices"
   DIRECT_URL="postgresql://username:password@localhost:5432/uk-house-prices"
   ```

4. **Setup database**

   ```bash
   npm run db:push
   npm run db:generate
   ```

5. **Run development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

The app uses 3 main tables:

- **regions** - UK regions (London, Manchester, etc.)
- **properties** - Individual property sales
- **region_monthly_stats** - Aggregated monthly statistics

## 📚 API Endpoints

- `GET /api/regions` - List all regions
- `GET /api/regions/[slug]` - Get region details
- `GET /api/prices/search` - Search properties
- `POST /api/affordability` - Calculate affordability

## 🌐 Deployment

### Vercel + Supabase (Recommended)

1. **Setup Supabase**

   - Create account at [supabase.com](https://supabase.com)
   - Create new project
   - Get connection string

2. **Deploy to Vercel**

   ```bash
   npm run build
   vercel --prod
   ```

3. **Add environment variables** in Vercel dashboard

## 📊 Data Sources

- **HM Land Registry** - Official UK property price data
- **ONS** - Population and geographic data
- **Gov.uk APIs** - Postcode lookup services

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- HM Land Registry for providing open data
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework

---

**Built with ❤️ for the UK property market**
