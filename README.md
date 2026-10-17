# Toreno79 portfolio

A static portfolio with build-time HTML, shared templates and progressively enhanced interactions.

## Edit

- Page content: `src/pages/*.html`. Root HTML files are generated compatibility snapshots; update them from `dist/` after changing templates.
- Shared navigation/footer: `src/partials/`.
- Project and blog entries: `data/projects.json` and `data/blogs.json`.
- Behavior: `assets/js/site.js` and `assets/js/blog.js`.
- Styling: `style.css` and `assets/blog.css`.

## Build and verify

Requires Python 3.10+ and Node 22+.

```sh
npm ci
npm run build
npm run check
npx playwright install chromium
npm test
python3 -m http.server 8000 --directory dist
```

`dist/` is the only deployable directory. Never publish the whole repository.
Use `BASE_PATH=/My_Portfolio/ python3 scripts/build.py` for GitHub Pages.
Vercel builds at `/` using `vercel.json`. Canonical URLs point to `https://toreno79.vercel.app`.
The deployment workflow validates HTML, local links, metadata, browser history,
keyboard interaction, responsive layouts, no-JS content and nested 404 behavior.

The sitemap is generated at `/sitemap.xml`. Search Console submission requires
access to the verified property and is separate from deploying the sitemap.
Security headers are configured for Vercel; GitHub Pages does not apply `vercel.json`.
