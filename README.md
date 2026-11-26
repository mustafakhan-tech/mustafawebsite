# Mustafa Khan: personal site

Next.js 14 (App Router), TypeScript and Tailwind. All copy and numbers live in `lib/content.ts`.

## Run locally

```
npm install
npm run dev
```

## Add a case study

Add an entry to `caseStudies` in `lib/content.ts`. It shows up on the home page, on `/work` and at `/work/<slug>`. Set `published: false` to hide a draft.

## Deploy on Netlify

Build command `npm run build`, publish directory `.next`. Netlify detects Next.js automatically.
