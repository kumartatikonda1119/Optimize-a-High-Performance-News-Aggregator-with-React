# AetherLens AI News Studio

Premium, frontend-only news intelligence experience built with Vite, React, and Tailwind. This app aggregates multiple public news providers, simulates AI insights, and delivers cinematic interactions without a backend.

## Stack Highlights

- Vite + React
- Tailwind CSS + ShadCN-style UI components
- Framer Motion animations
- Zustand persistence for personalization
- TanStack Query for caching and retries
- Recharts analytics dashboard

## Getting Started (Local)

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`

## Environment

Copy `.env.example` to `.env` and provide API keys for the news providers.

## Docker (Required)

1. Build and run: `docker-compose up -d --build`
2. Open the app: `http://localhost:3000`

The `docker-compose.yml` includes a healthcheck to confirm the web service is serving HTML.

## Performance Work

- Baseline and optimization notes are tracked in [PERFORMANCE.md](PERFORMANCE.md).
- A bundle analyzer report is generated on build as `stats.html`.

## Branches

- `main`: optimized version
- `slow-version`: intentionally unoptimized baseline used for comparison

## Build

- Production build: `npm run build`
- Preview build: `npm run preview`

## Features

- Immersive landing page with animated hero, ticker, and trending carousel
- Discovery view with advanced filtering, layout switcher, and infinite scroll
- Article details dialog with AI summary, sentiment, and reading progress
- Analytics dashboard with source, category, and sentiment charts
- Local persistence for bookmarks, likes, history, and saved searches
