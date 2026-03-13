# WallpaperLaunchpad

WallpaperLaunchpad is a Next.js App Router wallpaper platform with static SEO pages, local JSON content, downloadable wallpaper packs, and an internal admin generator powered by the OpenAI image API.

Live site:

- `https://wallpaperlaunchpad.vercel.app`

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static JSON data in `data/`
- Local image storage in `public/wallpapers/`
- OpenAI image generation for the internal admin tool
- Vercel deployment and Vercel Analytics

## Features

- Homepage with premium-style sections for categories, trending wallpapers, newest drops, and featured collections
- Browse page with search, filters, sorting, and empty states
- Category pages, wallpaper detail pages, collections, favorites, pricing, and SEO hubs
- Download buttons for original wallpaper files stored in `public/wallpapers/...`
- Local favorites via `localStorage`
- Premium-ready UI states for future monetization
- Static SEO infrastructure with `sitemap.xml`, `robots.txt`, unique metadata, and internal linking
- Internal admin generator at `/admin/generate`

## Local setup

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_IMAGE_MODEL=gpt-image-1-mini
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_BASIC_AUTH_USERNAME=admin
ADMIN_BASIC_AUTH_PASSWORD=change-me
```

Start development:

```bash
npm run dev
```

Build locally:

```bash
npm run build
```

Type-check:

```bash
npm run typecheck
```

Lint:

```bash
npm run lint
```

## Environment variables

Required for image generation:

- `OPENAI_API_KEY`

Recommended:

- `OPENAI_IMAGE_MODEL`
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_BASIC_AUTH_USERNAME`
- `ADMIN_BASIC_AUTH_PASSWORD`

## Admin generator

The internal generator is available at:

- `/admin/generate`

It is protected with HTTP Basic Auth using:

- `ADMIN_BASIC_AUTH_USERNAME`
- `ADMIN_BASIC_AUTH_PASSWORD`

The generator:

- builds prompts from reusable category templates
- generates desktop or mobile wallpapers with the OpenAI image API
- saves images into `public/wallpapers/{category}/`
- appends metadata into `data/wallpapers.json`

## Content model

Main content files:

- `data/categories.json`
- `data/wallpapers.json`
- `data/collections.json`
- `data/seo-guides.json`
- `data/theme-hubs.json`
- `data/faq-pages.json`
- `data/intent-pages.json`

Wallpaper files are stored in:

- `public/wallpapers/{category}/`

## Deployment

The project is configured for Vercel.

Production URL:

- `https://wallpaperlaunchpad.vercel.app`

Set these environment variables in Vercel before using the admin generator:

- `OPENAI_API_KEY`
- `OPENAI_IMAGE_MODEL`
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_BASIC_AUTH_USERNAME`
- `ADMIN_BASIC_AUTH_PASSWORD`

Deploy:

```bash
vercel --prod
```

## Notes

- Favorites are browser-local and use `localStorage`
- Premium access is UI-ready but does not yet include payments or authentication
- Collections and packs are structured so they can be monetized later without changing the content model
