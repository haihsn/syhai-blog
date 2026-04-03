# syhai.xyz

Editorial blog — navy nav, Playfair Display + Source Serif 4, EN/VN language switcher.

## Stack
- **Astro 4** — static site generator
- **Vercel** — free hosting, auto-deploys on every git push
- **Google Fonts** — Playfair Display · Source Serif 4 · DM Mono

---

## Deploy in 4 steps

### 1. Create GitHub repo
- Go to github.com → "+" → New repository
- Name: `syhai-blog` · Public · No README
- Upload all files from this folder

### 2. Deploy on Vercel
- vercel.com → Add New Project → Import `syhai-blog`
- Vercel auto-detects Astro → click **Deploy**
- Live at `*.vercel.app` in ~90 seconds

### 3. Connect syhai.xyz (after buying domain)
- Vercel → Project → Settings → Domains → add `syhai.xyz`
- Copy the 2 DNS records Vercel shows you
- Namecheap → Advanced DNS → add those records
- Wait up to 24h → live at syhai.xyz with free SSL

### 4. When ready to move to syhai.ai
- Buy syhai.ai on Porkbun
- Vercel → same project → add syhai.ai domain
- Namecheap → set up 301 redirect syhai.xyz → syhai.ai
- Zero content changes needed

---

## Writing a new post

Create `src/content/blog/my-post-title.md`:

```md
---
title:         "Your English Title"
titleVN:       "Tiêu đề tiếng Việt"          # optional
description:   "English description"
descriptionVN: "Mô tả tiếng Việt"             # optional
pubDate:       2025-04-01
category:      "AI Tutorial"  # AI Tutorial | Crypto | Research | Trading
readTime:      8
cover:         "/images/my-post.jpg"           # optional
tags:          ["Claude", "Trading"]
tagsVN:        ["Claude", "Giao dịch"]         # optional
---

Your content in Markdown...
```

### Adding a cover image
1. Put your image in `public/images/` (e.g. `public/images/my-post.jpg`)
2. Add `cover: "/images/my-post.jpg"` to the frontmatter
3. Auto-appears on homepage, blog listing, and post page

---

## Making changes after launch

| What to change | Where |
|---|---|
| Colors / fonts | `src/styles/global.css` |
| Nav links | `src/layouts/Base.astro` |
| "What I'm building" cards | `src/pages/index.astro` |
| About page text | `src/pages/about.astro` |
| Add a new post | New `.md` in `src/content/blog/` |

**Every change:** edit file → save → git push → Vercel deploys in ~30 seconds.

---

## Project structure

```
syhai-blog/
├── public/
│   ├── favicon.svg
│   └── images/          ← cover images go here
├── src/
│   ├── content/
│   │   ├── config.ts    ← post schema (EN + VN fields)
│   │   └── blog/        ← your .md posts
│   ├── layouts/
│   │   ├── Base.astro       ← navy nav + EN/VN switcher + footer
│   │   └── PostLayout.astro ← article page layout
│   ├── pages/
│   │   ├── index.astro      ← homepage
│   │   ├── about.astro      ← about page
│   │   └── blog/
│   │       ├── index.astro  ← blog listing with category filter
│   │       └── [slug].astro ← dynamic post pages
│   └── styles/
│       └── global.css       ← full design system
├── astro.config.mjs
├── package.json
└── vercel.json
```
