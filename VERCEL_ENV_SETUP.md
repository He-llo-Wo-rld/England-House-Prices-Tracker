# Vercel Environment Variables Setup Guide

## Add these environment variables in your Vercel dashboard:

### Database Configuration
DATABASE_URL="postgresql://postgres.vqjjfmdepwmbndgovbhw:_hWafz3PKT_2Mm%21@aws-0-eu-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=60&pool_timeout=60&socket_timeout=60"

DIRECT_URL="postgresql://postgres.vqjjfmdepwmbndgovbhw:_hWafz3PKT_2Mm%21@aws-0-eu-west-2.pooler.supabase.com:5432/postgres?connect_timeout=60&socket_timeout=60"

### Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://vqjjfmdepwmbndgovbhw.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxampmbWRlcHdtYm5kZ292Ymh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTcyMDUsImV4cCI6MjA2Njg3MzIwNX0.g_eH5GXvvcKjPMhlkQdd3nhO17U2PiUnvisNU2bUlo8"

### App Configuration
NEXT_PUBLIC_APP_URL="https://your-vercel-app.vercel.app"
NEXTAUTH_SECRET="uodXaUjMzSQdHUwNYuRfjtcK3NleqYIRc3KoT3ghYjU="
NEXTAUTH_URL="https://your-vercel-app.vercel.app"

## Key Changes:
1. `!` encoded as `%21` in password
2. Added connection timeouts for serverless environment
3. Updated NEXT_PUBLIC_APP_URL and NEXTAUTH_URL to your Vercel domain

## Steps:
1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add each variable above
4. Redeploy your application