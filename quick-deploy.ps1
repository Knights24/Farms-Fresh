# Quick deploy script using GitHub CLI
param(
    [string]$Message = "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
)

Write-Host "🚀 Farm Fresh - Quick Deploy Script" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Green

# Check if there are changes
$status = git status --porcelain
if (-not $status) {
    Write-Host "✅ No changes to commit" -ForegroundColor Yellow
    exit 0
}

# Build first
Write-Host "🔨 Building project..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Fix errors before deploying." -ForegroundColor Red
    exit 1
}

# Add all changes
Write-Host "📦 Adding changes..." -ForegroundColor Cyan
git add .

# Commit
Write-Host "💾 Committing: $Message" -ForegroundColor Cyan
git commit -m $Message

# Push using GitHub CLI
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
gh repo sync --source Knights24/Farms-Fresh

# Check deployment
Write-Host "🌐 Your site: https://knights24.github.io/Farms-Fresh/" -ForegroundColor Green
Write-Host "✨ Deploy complete!" -ForegroundColor Green
