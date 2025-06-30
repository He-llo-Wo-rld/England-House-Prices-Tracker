# 🚀 Quick Start Instructions

## 📋 Prerequisites

- Node.js 18+
- npm or yarn

## 🛠️ Setup Steps

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 If you encounter errors:

### Missing dependencies error:

```bash
npm install autoprefixer postcss tailwindcss
```

### TypeScript errors:

```bash
npm install @types/react @types/react-dom @types/node
```

### Build errors:

```bash
npm run build
```

## 📊 What you'll see:

- ✅ Beautiful homepage with UK house price tracker
- 📈 National statistics cards
- 🏠 Regional price cards with hover effects
- 🔥 Trending areas section
- 🔍 Search functionality (frontend only)

## 🗄️ To add database (optional):

1. Set up Supabase account
2. Copy connection string to `.env.local`
3. Run `npm run db:push`

## 🎨 Tech Stack:

- Next.js 14 + TypeScript
- Tailwind CSS + shadcn/ui components
- Prisma (for future database)
- Mock data (currently)

**Enjoy exploring UK house prices!** 🏠💷
