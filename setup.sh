#!/bin/bash

# ============================================
# ⚡ SwiftLab - GitHub Pages Deployment Script
# ============================================
# This script sets up everything needed to deploy
# SwiftLab to GitHub Pages for free.

set -e

echo ""
echo "⚡ ═══════════════════════════════════════════ ⚡"
echo "⚡   SwiftLab - GitHub Pages Setup Script     ⚡"
echo "⚡ ═══════════════════════════════════════════ ⚡"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "⚠️  GitHub CLI (gh) is not installed."
    echo "   Install it from: https://cli.github.com/"
    echo "   Or follow manual steps in README.md"
    echo ""
    read -p "Continue with manual git commands? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    MANUAL_MODE=true
else
    MANUAL_MODE=false
fi

# Get repo name
read -p "📝 Enter repository name (e.g., swiftlab): " REPO_NAME
if [ -z "$REPO_NAME" ]; then
    REPO_NAME="swiftlab"
fi

# Get GitHub username
if [ "$MANUAL_MODE" = false ]; then
    GITHUB_USER=$(gh api user --jq .login 2>/dev/null || echo "")
    if [ -n "$GITHUB_USER" ]; then
        echo "👤 Detected GitHub user: $GITHUB_USER"
    else
        read -p "👤 Enter your GitHub username: " GITHUB_USER
    fi
else
    read -p "👤 Enter your GitHub username: " GITHUB_USER
fi

echo ""
echo "📋 Summary:"
echo "   Repository: $GITHUB_USER/$REPO_NAME"
echo "   URL: https://$GITHUB_USER.github.io/$REPO_NAME/"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "🚀 Step 1: Initializing git repository..."
git init
git add .
git commit -m "⚡ Initial commit - SwiftLab: Modern Concurrency in Swift

100 interactive lessons covering:
- async/await fundamentals
- Actors & Sendable
- TaskGroups & Structured Concurrency
- AsyncSequence & AsyncStreams
- Error handling patterns
- Real-world projects

Built with React + TypeScript + Tailwind CSS"

echo ""
echo "🚀 Step 2: Creating GitHub repository..."

if [ "$MANUAL_MODE" = false ]; then
    gh repo create "$REPO_NAME" --public --source=. --push --description "⚡ 100 Interactive Lessons - Modern Concurrency in Swift | آموزش همزمانی مدرن در سوئیفت"
else
    echo ""
    echo "⚠️  Manual mode - Please create the repository manually:"
    echo "   1. Go to https://github.com/new"
    echo "   2. Repository name: $REPO_NAME"
    echo "   3. Set as Public"
    echo "   4. DO NOT initialize with README"
    echo "   5. Then run these commands:"
    echo ""
    echo "   git branch -M main"
    echo "   git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git"
    echo "   git push -u origin main"
    echo ""
    exit 0
fi

echo ""
echo "🚀 Step 3: Enabling GitHub Pages..."

if [ "$MANUAL_MODE" = false ]; then
    # Enable Pages with GitHub Actions as source
    gh api repos/$GITHUB_USER/$REPO_NAME/pages -X POST -f "build_type=workflow" 2>/dev/null || \
    echo "⚠️  Pages might need manual activation. Go to Settings > Pages > Source > GitHub Actions"
fi

echo ""
echo "✅ ═══════════════════════════════════════════ ✅"
echo ""
echo "🎉 Done! Your site will be available at:"
echo ""
echo "   🌐 https://$GITHUB_USER.github.io/$REPO_NAME/"
echo ""
echo "📋 Next steps:"
echo "   1. Go to https://github.com/$GITHUB_USER/$REPO_NAME/actions"
echo "   2. Wait for the deployment workflow to finish"
echo "   3. Visit your site!"
echo ""
echo "🔧 To enable custom domain:"
echo "   1. Add CNAME file in public/ folder"
echo "   2. Configure DNS records"
echo "   3. See README.md for details"
echo ""
echo "⚡ ═══════════════════════════════════════════ ⚡"
