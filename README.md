# Portfolio Site

Standalone workspace for Aditya Nayak's portfolio site.

## Source

- Imported from `/Users/adityanayak/Downloads/aditya-nayak-portfolio-v5.html`
- Main entry file: `index.html`

## Run locally

```bash
cd "/Users/adityanayak/Documents/New project/portfolio-site"
pnpm dev
```

Open `http://localhost:4321`.

## Current structure

- `index.html`: single-page portfolio site
- `assets/styles.css`: shared site styles
- `assets/site.js`: shared interactions, theme toggle, tabs, and nav behavior
- `assets/tailwind-config.js`: shared Tailwind config
- `package.json`: minimal local preview scripts

## Notes

- The site is static and uses shared assets for styling and interactions.
- There is no build step yet.
- Light theme is the default, with a persisted dark-theme toggle.
