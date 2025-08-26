# PowerShell script to verify deployment readiness
Write-Host "🔍 Farm Fresh - GitHub Pages Deployment Check" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Check if required files exist
$requiredFiles = @(
    "index.html",
    "404.html", 
    "robots.txt",
    "sitemap.xml",
    "CNAME",
    ".github/workflows/pages.yml"
)

Write-Host "`n📋 Checking required files..." -ForegroundColor Yellow
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file (MISSING)" -ForegroundColor Red
    }
}

# Check Git status
Write-Host "`n📊 Git Status:" -ForegroundColor Yellow
git status --porcelain
if ($LASTEXITCODE -eq 0 -and (git status --porcelain).Length -eq 0) {
    Write-Host "✅ Working tree clean" -ForegroundColor Green
} else {
    Write-Host "⚠️  Uncommitted changes detected" -ForegroundColor Yellow
}

# Check remote
Write-Host "`n🔗 Remote Repository:" -ForegroundColor Yellow
git remote get-url origin

# Instructions
Write-Host "`n🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Go to: https://github.com/Knights24/Farms-Fresh/settings/pages" -ForegroundColor White
Write-Host "2. Under 'Source', select 'GitHub Actions'" -ForegroundColor White
Write-Host "3. Click 'Save'" -ForegroundColor White
Write-Host "4. Wait 2-3 minutes for deployment" -ForegroundColor White
Write-Host "5. Visit: https://knights24.github.io/Farms-Fresh/" -ForegroundColor White

Write-Host "`n✨ Deployment check complete!" -ForegroundColor Green
