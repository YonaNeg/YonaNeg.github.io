# Academic website maintenance guide

**GitHub Pages:** https://yonaneg.github.io/
**Repository:** https://github.com/YonaNeg/YonaNeg.github.io
**Deployments:** https://github.com/YonaNeg/YonaNeg.github.io/actions

## Access the website

The GitHub Pages address is public once Pages is enabled and the deployment succeeds. In repository Settings → Pages, choose GitHub Actions as the publishing source. The Deploy to GitHub Pages workflow runs on pushes to `main` and can be started manually from the Actions tab.

The repository contains source files; there is no separate website editor or admin login. Edit the files locally or through GitHub, then deploy through the GitHub Pages workflow.

## Local development

Open a terminal in your checkout of `academic-website`. On this computer the checkout is:

```bash
cd /path/to/academic-website
```

Use Node 24 LTS with current security updates. With nvm installed:

```bash
nvm use
npm ci --ignore-scripts
npm run dev
```

Visit http://127.0.0.1:4321, or the URL printed by Astro. The server binds to this computer. Stop it with Ctrl+C.

To preview the production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  layouts/BaseLayout.astro    Navigation, metadata, footer
  pages/
    index.astro              Homepage: introduction, research question cards, selected papers
    about.astro              Biography, education, experience
    research.astro           Research questions, each with a sketch
    publications.astro       Papers, preprints, methods
    cv.astro                 Education and CV download
    sitemap.xml.ts           Sitemap for search engines, built from the pages above
    robots.txt.ts            Crawler rules that point search engines to the sitemap
  components/PublicationEntry.astro  Shared publication layout
  components/sketches/       Inline SVG research sketches, colored by the theme
  data/publications.ts       Publication records and homepage selections
  assets/yonatan-degefu.jpeg  Homepage portrait, optimized at build time
  styles/site.css            Shared design, mobile and print styles
public/
  favicon.svg                Academic profile favicon
  images/publications/       Original publication figures
  files/cv.pdf               Updated downloadable CV
astro.config.mjs              Site URL, hosting path, and static build configuration
.github/workflows/deploy.yml   GitHub Pages build and deployment
src/utils/paths.ts             Base-aware internal links and public asset paths
vercel.json                   Optional Vercel hosting configuration
```

Content and styles are separated so that the shared theme stays consistent across pages.

## Make content changes

Edit text in the relevant `.astro` page. The section between the initial `---` markers contains imports and build-time code. The remaining markup contains page content.

Keep academic facts consistent across the homepage, About page, and education section. Edit publication status, author lists, years, summaries, and DOI links in `src/data/publications.ts`. Both the homepage and full publication list use these records. Set `selected: true` to feature an entry on the homepage.

The publication counts are calculated from these records. When a preprint is published, update its existing record to the journal version and preserve the preprint as an additional link.

External links that open new tabs should include `rel="noopener noreferrer"`.

### Update education

The CV webpage at `/cv` contains education only. Edit the degree, institution, dates, and existing education details in `src/pages/cv.astro`. Replace `public/files/cv.pdf` to update the downloadable CV; the homepage and education page link to this file.

### Edit a research sketch

Each sketch in `src/components/sketches/` is inline SVG. Shapes use `sk-*` classes from `src/styles/site.css`, so their colors follow the light and dark themes; avoid hard-coded colors and `style` attributes, which the content security policy blocks. The homepage cards reuse the first three sketches and link to the matching section of the research page by its `id`.

### Add a publication figure

Store the original figure in `public/images/publications/`, using a descriptive filename. Add its `src`, `alt`, `width`, and `height` to the corresponding record in `src/data/publications.ts`. The shared component displays the figure without cropping and links to the original full-size file. Keep alternative text descriptive of the scientific content.

Everything in `public/` is published. Store only intended public assets there.

### Add a photo

Replace `src/assets/yonatan-degefu.jpeg` to update the homepage portrait. Astro generates an optimized image at build time. The desktop layout places the portrait beside the introduction; the phone layout places it above the text. Adjust its display dimensions and framing in `src/styles/site.css`.

### Change the design

Edit `src/styles/site.css`. The variables at the top hold the palette, each written as `light-dark(light value, dark value)`. The site follows the visitor's system setting until they flip the sun/moon switch in the header. `public/theme.js` then stores that choice in the browser and sets `data-theme` on the page, so it applies across pages and visits. The file also contains responsive layouts, keyboard focus indicators, and print styles.

## Check and publish

```bash
git status
git diff
npm audit
npm run build
```

Review the changed files and preview the result. Stage specific files, for example:

```bash
git add src/pages/about.astro src/pages/cv.astro
git diff --cached
git commit -m 'Update biography and CV'
git push
```

The GitHub Pages workflow builds pushes to `main` with Node 24, installs exact dependencies without lifecycle scripts, and uploads only `dist/`. Its official actions are pinned to full commit hashes. Enable the repository’s Pages source as GitHub Actions once.

`GITHUB_PAGES=true` selects the Pages URL and the repository path automatically. Because the repository is named `YonaNeg.github.io`, the site is served from the root domain. Under any other repository name, the path helper would keep navigation, figures, and the CV under `/<repository>/`. Local builds use root paths.

The site first launched at `/academic-website/`. When built for the root domain, `astro.config.mjs` adds small forwarding pages so those old addresses lead to the matching pages. New pages appear in the sitemap automatically.

The deployment must complete before the live website changes. Check the workflow logs in the GitHub Actions tab if a build fails.

## Security maintenance

The website generates static HTML and CSS. It has no application database, sign-in, forms, or server adapter.

- Keep `.gitignore` in place. It excludes dependency folders, generated output, environment files, and local Vercel state.
- Run `npm audit` when updating dependencies and before releases.
- Dependabot is configured to open weekly npm update pull requests after its configuration is pushed to GitHub.
- Install from the lockfile with `npm ci --ignore-scripts`. The current static build does not require dependency lifecycle scripts.
- Keep credentials out of source files and public assets.
- Production HTML includes a content security policy and referrer policy in metadata. Scripts load only from the site's own files (currently just `public/theme.js`); inline and third-party scripts, child frames, forms, and page network connections are blocked; styles and images load from the same origin.
- GitHub Pages does not apply `vercel.json`. Its HTTP response headers are controlled by GitHub; the Vercel-specific anti-framing and permissions headers are not configured by this Pages workflow.
- If adding interactive JavaScript, forms, analytics, external images, or fonts, review and test the policy as part of that change.

GitHub account access, authentication, collaborator permissions, branch protection, and deployment logs require a separate review in those accounts.

## Recover from a problem

Inspect first:

```bash
git status
git diff
git log --oneline -5
```

Save uncommitted work before any rollback. For a published regression, use `git revert COMMIT_SHA` to create a new commit that reverses the specific change, then push.

Avoid rewriting shared history or discarding local work as a routine recovery step.

## Troubleshooting

**The live site has not changed:** Check that the commit reached `main`, the Pages source is GitHub Actions, and the deployment workflow succeeded. Local edits and builds alone are not published.

**The build reports an unsupported Node version:** The workflow uses Node 24; use the `.nvmrc` locally if you manage versions with nvm.

**Styles or new features are blocked in production:** Inspect the browser console and the production CSP in `src/layouts/BaseLayout.astro`. Check the build output before adjusting the policy.

**A publication figure is missing:** Check that its path in `src/data/publications.ts` matches a file under `public/images/publications/`. The path starts with `/images/publications/` in the website.

**The build stalls before compiling:** Reinstall local dependencies with `npm ci --ignore-scripts`. This resolved the dependency-folder startup issue found during the November 2026 review; the same runtime successfully built both a clean temporary checkout and the repaired original.

**Dependencies seem inconsistent:** Run `npm ci --ignore-scripts` to install the exact versions in `package-lock.json`.

Last updated: November 17, 2026.
