# ⚡ SwiftLab — Modern Concurrency in Swift

<div align="center">

![Swift](https://img.shields.io/badge/Swift-5.9+-orange?logo=swift)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![License](https://img.shields.io/badge/License-MIT-green)

**۱۰۰ درس کامل آموزش همزمانی مدرن در سوئیفت — از مبانی تا پیشرفته**

*100 Complete Lessons on Modern Concurrency in Swift — From Basics to Advanced*

</div>

---

## 📖 درباره / About

SwiftLab یک پلتفرم آموزشی اینتراکتیو برای یادگیری **Modern Concurrency در سوئیفت** است. این وب‌سایت شامل ۱۰۰ درس کامل با آزمون‌های اینتراکتیو، نمونه کد، و توضیحات به دو زبان فارسی و انگلیسی است.

SwiftLab is an interactive learning platform for **Modern Concurrency in Swift**. It includes 100 complete lessons with interactive quizzes, code examples, and explanations in both Persian (Farsi) and English.

---

## 📚 سرفصل‌ها / Topics

| # | دسته‌بندی | Category | درس‌ها |
|---|-----------|----------|--------|
| 1 | مبانی همزمانی | Concurrency Basics | 1-10 |
| 2 | Async/Await | Async/Await | 11-20 |
| 3 | همزمانی ساختاریافته | Structured Concurrency | 21-30 |
| 4 | تسک‌ها و گروه تسک | Tasks & TaskGroups | 31-40 |
| 5 | اکتورها | Actors | 41-50 |
| 6 | Sendable و Isolation | Sendable & Isolation | 51-60 |
| 7 | AsyncSequence | AsyncSequence & Streams | 61-70 |
| 8 | مدیریت خطا | Error Handling | 71-80 |
| 9 | الگوهای پیشرفته | Advanced Patterns | 81-90 |
| 10 | پروژه‌های واقعی | Real-world Projects | 91-100 |

---

## 🚀 دیپلوی رایگان روی GitHub Pages / Free Deployment

### روش ۱: GitHub Pages (رایگان) / Method 1: GitHub Pages (Free)

#### مرحله ۱: ریپازیتوری بسازید
```bash
# ریپازیتوری جدید بسازید
git init
git add .
git commit -m "Initial commit - SwiftLab"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/swiftlab.git
git push -u origin main
```

#### مرحله ۲: GitHub Actions Workflow بسازید

فایل `.github/workflows/deploy.yml` رو بسازید:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### مرحله ۳: فعال‌سازی GitHub Pages

1. به **Settings** ریپازیتوری برید
2. از منوی سمت چپ **Pages** رو انتخاب کنید
3. در بخش **Source** گزینه **GitHub Actions** رو انتخاب کنید
4. تمام! هر بار که push کنید، خودکار دیپلوی میشه

#### آدرس سایت شما:
```
https://YOUR_USERNAME.github.io/swiftlab/
```

---

### روش ۲: Vercel (رایگان — پیشنهادی) / Method 2: Vercel (Free — Recommended)

1. به [vercel.com](https://vercel.com) برید
2. با GitHub لاگین کنید
3. **New Project** → ریپازیتوری رو انتخاب کنید
4. **Deploy** رو بزنید
5. تمام! آدرس: `https://swiftlab.vercel.app`

---

### روش ۳: Netlify (رایگان) / Method 3: Netlify (Free)

1. به [netlify.com](https://netlify.com) برید
2. **Add new site** → **Import an existing project**
3. ریپازیتوری GitHub رو انتخاب کنید
4. تنظیمات Build:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Deploy** رو بزنید

---

### 🌐 دامنه سفارشی / Custom Domain

#### GitHub Pages + Custom Domain:
```bash
# فایل CNAME در پوشه public بسازید
echo "yourdomain.com" > public/CNAME
```

سپس در تنظیمات DNS دامنه‌تون:
```
A Record    → 185.199.108.153
A Record    → 185.199.109.153
A Record    → 185.199.110.153
A Record    → 185.199.111.153
CNAME       → YOUR_USERNAME.github.io
```

#### Vercel + Custom Domain:
1. در Vercel Dashboard → **Settings** → **Domains**
2. دامنه‌تون رو اضافه کنید
3. DNS records رو طبق راهنما تنظیم کنید

---

## 🛠 توسعه محلی / Local Development

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/swiftlab.git
cd swiftlab

# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

---

## 📱 ویژگی‌ها / Features

- ✅ **۱۰۰ درس کامل** — از مبانی تا پروژه‌های واقعی
- ✅ **آزمون‌های اینتراکتیو** — بعد از هر درس
- ✅ **دو زبانه** — فارسی و انگلیسی
- ✅ **RTL Support** — پشتیبانی کامل از راست به چپ
- ✅ **Progress Tracking** — ذخیره پیشرفت در مرورگر
- ✅ **Responsive** — سازگار با موبایل و دسکتاپ
- ✅ **Dark Mode** — طراحی تاریک حرفه‌ای
- ✅ **Code Examples** — نمونه کدهای Swift
- ✅ **Search** — جستجو در درس‌ها
- ✅ **Category Filter** — فیلتر بر اساس دسته‌بندی

---

## 🏗 تکنولوژی‌ها / Tech Stack

- **React 18** — UI Framework
- **TypeScript** — Type Safety
- **Tailwind CSS** — Styling
- **Vite** — Build Tool
- **Font Awesome** — Icons
- **Vazirmatn** — Persian Font

---

## 📄 لایسنس / License

MIT License — آزاد برای استفاده شخصی و تجاری

---

<div align="center">

**ساخته شده با ❤️ برای جامعه سوئیفت فارسی‌زبان**

*Made with ❤️ for the Persian Swift Community*

</div>
