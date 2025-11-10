# Setup Local Development Database (SQLite)
# This ensures your local environment uses SQLite

Write-Host "🔧 Setting up local development database..." -ForegroundColor Cyan

# Check if .env.local exists, create if not
if (-not (Test-Path ".env.local")) {
    Write-Host "📝 Creating .env.local file..." -ForegroundColor Yellow
    @"
# Local Development Database (SQLite)
DATABASE_URL="file:./src/podcast.db"

# NextAuth Configuration
NEXTAUTH_SECRET="local-dev-secret-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
"@ | Out-File -FilePath ".env.local" -Encoding utf8
    Write-Host "✅ Created .env.local" -ForegroundColor Green
} else {
    Write-Host "✅ .env.local already exists" -ForegroundColor Green
}

# Generate Prisma client
Write-Host "🔨 Generating Prisma client..." -ForegroundColor Cyan
npm run db:generate

# Push schema to database
Write-Host "📊 Pushing schema to SQLite database..." -ForegroundColor Cyan
npm run db:push

Write-Host ""
Write-Host "✅ Local development setup complete!" -ForegroundColor Green
Write-Host "📍 Database location: src/podcast.db" -ForegroundColor Cyan
Write-Host "🚀 Run 'npm run dev' to start development server" -ForegroundColor Cyan

