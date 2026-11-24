# Karthik Portfolio

A modular React and TypeScript portfolio .

## Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create local environment variables:

   ```bash
   copy .env.example .env
   ```

3. Fill in your own EmailJS values and optional Coursera JSON feed URL.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Build for production:

   ```bash
   npm run build
   ```

## Environment Variables

- `VITE_EMAILJS_SERVICE_ID`: EmailJS service ID
- `VITE_EMAILJS_TEMPLATE_ID`: EmailJS template ID
- `VITE_EMAILJS_PUBLIC_KEY`: EmailJS public key
- `VITE_COURSERA_FEED_URL`: Optional public Coursera course JSON feed override

Never commit `.env`. Only the non-secret `.env.example` file should be tracked.

## Source Structure

```text
src/
  components/
    icons/       Reusable inline SVG icons
    layout/      Header and navigation
    portfolio/   Portfolio overview sections
  data/          Static profile, resume, and course data
  hooks/         External-data synchronization hooks
  lib/           Cache and utility helpers
  pages/         Top-level tab views
  types/         Shared TypeScript types
```

## Live Data

GitHub, GitHub contribution, LeetCode, and HackerRank requests use same-origin proxy routes when running through Vite or the Vercel rewrites in `vercel.json`.

The activity heatmap combines GitHub contributions, LeetCode submission-calendar counts, and dated HackerRank recent challenges for the displayed five-year period.

Coursera private account data is not available through an unauthenticated public API. The overview loads the configured public JSON feed on each page visit; update that feed to change the course cards. `VITE_COURSERA_FEED_URL` can override the default feed URL. Never put passwords, tokens, or other credentials in the feed.
