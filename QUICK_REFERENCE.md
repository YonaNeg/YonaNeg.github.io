# Website quick reference

- **GitHub Pages:** https://yonaneg.github.io/
- **Repository:** https://github.com/YonaNeg/YonaNeg.github.io
- **Deployments:** https://github.com/YonaNeg/YonaNeg.github.io/actions
- **One-time setting:** Repository Settings → Pages → Source → GitHub Actions
- **Local:** http://127.0.0.1:4321 while the local server is running

Run commands in the `academic-website` folder.

## Preview

```bash
# Optional, if you use nvm: nvm use
npm ci --ignore-scripts
npm run dev
```

Stop with Ctrl+C. Use the printed URL if Astro selects another port.

## Review and publish

```bash
git status
git diff
npm audit
npm run build
```

Stage the files you intentionally changed, for example:

```bash
git add src/pages/about.astro
git diff --cached
git commit -m 'Update biography'
git push
```

Confirm the Deploy to GitHub Pages workflow succeeded. Do not stage `.env` files, local hosting state, `node_modules/`, or generated output.

## Where to edit

| Content | File |
| --- | --- |
| Home | `src/pages/index.astro` |
| Portrait | `public/images/portrait/yonatan-degefu.webp` (480 × 720, metadata stripped) |
| About | `src/pages/about.astro` |
| Research | `src/pages/research.astro` |
| Publication records | `src/data/publications.ts` |
| Publication entry layout | `src/components/PublicationEntry.astro` |
| CV education entries | `src/pages/cv.astro` |
| Research sketches | `src/components/sketches/` |
| Navigation and footer | `src/layouts/BaseLayout.astro` |
| Colors, typography, and layout | `src/styles/site.css` |

The CV webpage contains education only. Replace `public/files/cv.pdf` to update the downloadable CV. Add graphical abstracts to `public/images/publications/` and reference their path and descriptive alternative text in the matching publication record. Set `selected: true` to show a publication on the homepage.

For rollback, revert the specific published commit with `git revert COMMIT_SHA`, then push and verify the Pages workflow. Save uncommitted work first.

See [MAINTENANCE_GUIDE.md](MAINTENANCE_GUIDE.md) for details.
