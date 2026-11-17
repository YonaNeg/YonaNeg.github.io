# Yonatan N. Degefu — Academic Website

A static Astro website for research, publications, and academic experience.

- **GitHub Pages:** https://yonaneg.github.io/academic-website/
- **Source:** https://github.com/YonaNeg/academic-website
- **Deployment workflow:** `.github/workflows/deploy.yml`
- **Pages settings:** https://github.com/YonaNeg/academic-website/settings/pages

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
| Page security policy and referrer policy | `src/layouts/BaseLayout.astro` |
| Optional Vercel response headers | `vercel.json` |

The CV webpage contains education only, with the updated PDF available at `public/files/cv.pdf`. The homepage portrait is optimized by Astro when the site builds. Publication figures live in `public/images/publications/`; each entry links to its original full-size figure. The homepage and publication page share the same records, including publication status, author lists, and links.

## Publish

Enable **Settings → Pages → Source: GitHub Actions** for this repository. The pinned deployment workflow builds and publishes pushes to `main`; it can also be started manually from the Actions tab. Confirm a successful deployment in GitHub Actions before checking the public URL.

Review `git status` and `git diff`, build, then stage the intended files and commit. Local edits do not change the live website.

The workflow sets `GITHUB_PAGES=true`, and Astro derives its GitHub domain and repository path from `GITHUB_REPOSITORY`. Internal links and public assets use a shared path helper. Normal local development and optional Vercel builds continue to use root paths. A repository named `YonaNeg.github.io` automatically uses the root GitHub Pages URL instead.

See [MAINTENANCE_GUIDE.md](MAINTENANCE_GUIDE.md) for the full workflow, [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for common commands, and [SECURITY_REVIEW.md](SECURITY_REVIEW.md) for the security review and its limits.
