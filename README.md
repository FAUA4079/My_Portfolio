# Toreno79 — Fuad Hasan’s portfolio

A Next.js / React portfolio, exported as static HTML. The original dark terminal identity and `.html` page URLs are preserved. No server, database or environment secrets are required.

## Run locally

Use Node.js 22 or later.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For the production output:

```sh
npm run build
npm run check
npm start
```

## Maintain content

| Content                                | Edit                                                          |
| -------------------------------------- | ------------------------------------------------------------- |
| Experience                             | `src/pages/experience.jsx` (newest first)                     |
| Education, contact, biography and home | Corresponding `src/pages/*.jsx`                               |
| Projects                               | `src/data/projects.json` (unique id; existing category names) |
| Certifications, seminars, CTF results  | `src/data/achievements.json`                                  |
| Blog articles                          | `src/data/blogs.json` (unique id, ISO date, title, tags, URL) |
| Shared navigation and metadata         | `src/components/Page.jsx`                                     |
| Colors, spacing and responsive styles  | `src/styles/globals.css`                                      |
| Images                                 | `public/assets/images/`                                       |

Dates sort newest first on the blog; the globally newest article receives the NEW badge. CTF member rows contain name, solve count and points in that order. Do not invent or silently replace factual claims.

The CIA logo download returned HTTP 403 during implementation. The Experience page uses the requested CIA text placeholder. When a usable logo is available, place it in `public/assets/images/organizations/cia.jpg` and replace the placeholder with an image using `asset('/assets/images/organizations/cia.jpg')`, width/height, and alt text `Cyber Invasion Army (CIA) logo`.

## Hosting

`next.config.mjs` uses `output: 'export'`. `npm run build` produces `out/`, including `index.html`, the other eight `.html` routes and shared `_next/` assets. Never edit generated output.

- **Vercel:** `vercel.json` explicitly builds and serves `out/` as static output. Root hosting uses an empty base path. Existing dashboard overrides may need to be removed if a preview reports a conflicting framework/output directory.
- **GitHub Pages:** the workflow installs locked dependencies, builds with the repository base path, checks links, and uploads `out/`. Only `main` deploys. Pull requests build/check without a Pages deployment. A custom domain requires adjusting the base path to match that domain’s root.
- **404:** navigation and assets are root/base-path aware, including for deeply nested missing URLs.
- **Preview:** Vercel may automatically create branch previews if its existing integration is enabled. No new hosting service is introduced.

Do not merge until the preview and PR checks have been reviewed. Merging to `main` triggers the existing hosting integrations.

## Information awaiting owner confirmation

Preserved unchanged pending clarification:

- Home says 4 certifications, while Achievements lists 5 entries (classification may differ).
- Meaning of “1+ Years Experience”: learning/practice or professional work.
- Current THM top 2% / 80+ rooms, HTB Script Kiddie / 17+ labs, and kWAPTA preparation status.
- Evidence for LogRisk’s “hours to minutes” performance claim.
- Preferred canonical host: Vercel or GitHub Pages. No canonical URL is imposed yet.

Credential URLs, historical results and source claims are preserved, not independently certified as accurate by this migration.
