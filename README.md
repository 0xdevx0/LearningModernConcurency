# ⚡ SwiftLab — Modern Concurrency in Swift

<div align="center">

![Swift](https://img.shields.io/badge/Swift-5.9+-orange?logo=swift)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Lessons](https://img.shields.io/badge/Lessons-100-purple)
![License](https://img.shields.io/badge/License-MIT-green)

**۱۰۰ درس کامل آموزش همزمانی مدرن در سوئیفت — از مبانی تا پیشرفته**

*100 Complete Lessons on Modern Concurrency in Swift — From Basics to Advanced*

[🌐 Live Demo](https://YOUR_USERNAME.github.io/swiftlab/) | [📖 Lessons](#-سرفصلها--topics) | [🚀 Deploy](#-دیپلوی-رایگان-روی-github-pages)

</div>

---

## 🎯 سریع شروع کن / Quick Start

### فقط ۳ دستور:

```bash
# 1. Clone
git clone https://github.com/YOUR_USERNAME/swiftlab.git
cd swiftlab

# 2. Install
npm install

# 3. Run locally
npm run dev
```

### یا با اسکریپت اتوماتیک:

```bash
chmod +x setup.sh
./setup.sh
```

---

## 🚀 دیپلوی رایگان روی GitHub Pages

### روش سریع (۵ دقیقه):

#### ۱. ریپازیتوری بساز:
```bash
git init
git add .
git commit -m "⚡ SwiftLab - Modern Concurrency in Swift"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/swiftlab.git
git push -u origin main
```

#### ۲. GitHub Pages رو فعال کن:
1. برو به **Settings** → **Pages**
2. Source رو بذار روی **GitHub Actions**
3. تمام! ✨

#### ۳. صبر کن تا Actions تموم بشه:
- برو به تب **Actions**
- صبر کن workflow سبز بشه ✅
- سایتت آماده‌ست: `https://YOUR_USERNAME.github.io/swiftlab/`

---

### روش‌های دیگه:

<details>
<summary><b>🟣 Vercel (پیشنهادی — راحت‌ترین)</b></summary>

1. برو به [vercel.com](https://vercel.com)
2. با GitHub لاگین کن
3. **New Project** → ریپازیتوری رو انتخاب کن
4. **Deploy** بزن
5. آدرس: `https://swiftlab.vercel.app`

</details>

<details>
<summary><b>🔵 Netlify</b></summary>

1. برو به [netlify.com](https://netlify.com)
2. **Add new site** → **Import from Git**
3. Build command: `npm run build`
4. Publish directory: `dist`
5. **Deploy**

</details>

<details>
<summary><b>🟢 Cloudflare Pages</b></summary>

1. برو به [pages.cloudflare.com](https://pages.cloudflare.com)
2. **Create a project** → Connect Git
3. Build command: `npm run build`
4. Output directory: `dist`
5. **Save and Deploy**

</details>

---

### 🌐 دامنه سفارشی / Custom Domain

```bash
# فایل CNAME بساز
echo "yourdomain.com" > public/CNAME
git add public/CNAME
git commit -m "Add custom domain"
git push
```

DNS Records:
```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     YOUR_USERNAME.github.io
```

---

## 📚 سرفصل‌ها / Topics

| # | دسته‌بندی | Category | Lessons |
|---|-----------|----------|---------|
| 1 | 🟢 مبانی همزمانی | Concurrency Basics | 1-10 |
| 2 | 🟡 Async/Await | Async/Await | 11-20 |
| 3 | 🔵 همزمانی ساختاریافته | Structured Concurrency | 21-30 |
| 4 | 🟣 تسک‌ها و گروه تسک | Tasks & TaskGroups | 31-40 |
| 5 | 🔴 اکتورها | Actors | 41-50 |
| 6 | 🟠 Sendable و Isolation | Sendable & Isolation | 51-60 |
| 7 | 🔷 AsyncSequence | AsyncSequence & Streams | 61-70 |
| 8 | ⚫ مدیریت خطا | Error Handling | 71-80 |
| 9 | ⬛ الگوهای پیشرفته | Advanced Patterns | 81-90 |
| 10 | 🌟 پروژه‌های واقعی | Real-world Projects | 91-100 |

---

## ✨ ویژگی‌ها / Features

- ✅ **۱۰۰ درس کامل** — از مبانی تا پروژه‌های واقعی
- ✅ **آزمون‌های اینتراکتیو** — بعد از هر درس
- ✅ **دوزبانه** — فارسی و انگلیسی (FA/EN toggle)
- ✅ **RTL Support** — پشتیبانی کامل از راست به چپ
- ✅ **Progress Tracking** — ذخیره پیشرفت در مرورگر (localStorage)
- ✅ **Responsive Design** — موبایل، تبلت، دسکتاپ
- ✅ **Dark Theme** — طراحی تاریک حرفه‌ای
- ✅ **Code Examples** — نمونه کدهای Swift با syntax highlighting
- ✅ **Search** — جستجو در تمام درس‌ها
- ✅ **Category Filter** — فیلتر بر اساس دسته‌بندی
- ✅ **Zero Backend** — کاملاً استاتیک، بدون نیاز به سرور

---

## 🛠 تکنولوژی‌ها / Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Tailwind CSS v4 | Styling |
| Vite | Build Tool |
| Font Awesome 6 | Icons |
| Vazirmatn | Persian Font |
| GitHub Actions | CI/CD & Deployment |

---

## 📱 اسکرین‌شات / Screenshots

<div align="center">

### 🏠 صفحه اصلی
صفحه اصلی با ۱۰۰ درس، جستجو و فیلتر دسته‌بندی

### 📖 نمای درس
نمایش کد Swift با توضیحات فارسی و انگلیسی

### 🧪 آزمون
آزمون‌های اینتراکتیو با نمایش نتیجه و توضیحات

</div>

---

## 🤝 مشارکت / Contributing

Pull requests خوش‌آمدید! برای تغییرات بزرگ، اول issue باز کنید.

1. Fork کنید
2. Branch بسازید: `git checkout -b feature/amazing-feature`
3. Commit کنید: `git commit -m 'Add amazing feature'`
4. Push کنید: `git push origin feature/amazing-feature`
5. Pull Request باز کنید

---

## 📄 لایسنس / License

MIT License - آزاد برای استفاده شخصی و تجاری.

---

<div align="center">

**ساخته شده با ❤️ برای جامعه سوئیفت فارسی‌زبان**

*Made with ❤️ for the Persian Swift Community*

⭐ اگه خوشت اومد، یه ستاره بده!

</div>
