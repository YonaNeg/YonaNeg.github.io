# Yonatan N. Degefu — Academic Website

A static Astro website for research, publications, and academic experience.

- **Live website:** https://ydegefu-research.vercel.app
- **Source:** https://github.com/YonaNeg/academic-website
- **Hosting:** https://vercel.com/dashboard (sign in with the account connected to this project)

## Run locally

Use Node 24 LTS with its latest security updates. Astro requires Node 22.23.4 or newer.

From this repository’s root:

```bash
# Optional, if you use nvm: nvm use
npm ci --ignore-scripts
npm run dev
```

Open http://127.0.0.1:4321. Press Ctrl+C to stop. If port 4321 is busy, use the URL Astro prints.

## Check and preview a release

```bash
npm audit
npm run build
npm run preview
```

The production files are generated in `dist/`. Development and preview servers bind to the local computer.

## Content and design

| Change | File |
| --- | --- |
| Homepage and featured research | `src/pages/index.astro` |
| Homepage portrait | `src/assets/yonatan-degefu.jpeg` |
| Biography and experience | `src/pages/about.astro` |
| Research projects | `src/pages/research.astro` |
| Publication records and homepage selections | `src/data/publications.ts` |
| Publication layout and figure links | `src/components/PublicationEntry.astro` |
| Full publication page | `src/pages/publications.astro` |
| CV section (education only) | `src/pages/cv.astro` |
| Navigation, metadata, and footer | `src/layouts/BaseLayout.astro` |
| Shared theme and responsive styles | `src/styles/site.css` |
| Browser security headers | `vercel.json` |

The CV webpage contains education only, with the updated PDF available at `public/files/cv.pdf`. The homepage portrait is optimized by Astro when the site builds. Publication figures live in `public/images/publications/`; each entry links to its original full-size figure. The homepage and publication page share the same records, including publication status, author lists, and links.

## Publish

Review `git status` and `git diff`, build, then stage the intended files and commit. Pushing to the connected production branch normally triggers Vercel. Confirm the result in the Vercel dashboard; local edits do not change the live site.

See [MAINTENANCE_GUIDE.md](MAINTENANCE_GUIDE.md) for the full workflow, [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for common commands, and [SECURITY_REVIEW.md](SECURITY_REVIEW.md) for the security review and its limits.
