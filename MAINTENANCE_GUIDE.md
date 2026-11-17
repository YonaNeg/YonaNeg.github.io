# Academic website maintenance guide

**Live website:** https://ydegefu-research.vercel.app
**Repository:** https://github.com/YonaNeg/academic-website
**Hosting:** https://vercel.com/dashboard

## Access the website

The live address is public. To manage deployments, sign in to Vercel with the account connected to the repository, select the project associated with `ydegefu-research.vercel.app`, and open Deployments or Settings.

The repository contains source files; there is no separate website editor or admin login. Edit the files locally or through GitHub, then deploy through the connected Vercel project.

## Local development

Open a terminal in your checkout of `academic-website`. On this computer the checkout is:

```bash
cd '/Users/njr7jk/Library/CloudStorage/Box-Box/academic-website'
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
    index.astro              Homepage and featured work
    about.astro              Biography, education, experience
    research.astro           Research areas and projects
    publications.astro       Papers, preprints, methods
    cv.astro                 Education only
  components/PublicationEntry.astro  Shared publication layout
  data/publications.ts       Publication records and homepage selections
  assets/yonatan-degefu.jpeg  Homepage portrait, optimized at build time
  styles/site.css            Shared design, mobile and print styles
public/
  favicon.svg                Academic profile favicon
  images/publications/       Original publication figures
  files/cv.pdf               Updated downloadable CV
astro.config.mjs              Site URL and static build configuration
vercel.json                   Deployment configuration and security headers
```

Content and styles are separated so that the shared theme stays consistent across pages.

## Make content changes

Edit text in the relevant `.astro` page. The section between the initial `---` markers contains imports and build-time code. The remaining markup contains page content.

Keep academic facts consistent across the homepage, About page, and education section. Edit publication status, author lists, years, summaries, and DOI links in `src/data/publications.ts`. Both the homepage and full publication list use these records. Set `selected: true` to feature an entry on the homepage.

The publication counts are calculated from these records. When a preprint is published, update its existing record to the journal version and preserve the preprint as an additional link.

External links that open new tabs should include `rel="noopener noreferrer"`.

### Update education

The CV webpage at `/cv` contains education only. Edit the degree, institution, dates, and existing education details in `src/pages/cv.astro`. Replace `public/files/cv.pdf` to update the downloadable CV; the homepage and education page link to this file.

### Add a publication figure

Store the original figure in `public/images/publications/`, using a descriptive filename. Add its `src`, `alt`, `width`, and `height` to the corresponding record in `src/data/publications.ts`. The shared component displays the figure without cropping and links to the original full-size file. Keep alternative text descriptive of the scientific content.

Everything in `public/` is published. Store only intended public assets there.

### Add a photo

Replace `src/assets/yonatan-degefu.jpeg` to update the homepage portrait. Astro generates an optimized image at build time. The desktop layout places the portrait beside the introduction; the phone layout places it above the text. Adjust its display dimensions and framing in `src/styles/site.css`.

### Change the design

Edit `src/styles/site.css`. The variables at the top control the light academic palette. The file also contains responsive layouts, keyboard focus indicators, and print styles.

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

The documented Vercel integration deploys changes pushed to its configured production branch. Verify that integration, branch, Node version, and the deployment result in the Vercel dashboard. Use Node 24.x there; the upgraded framework requires at least Node 22.23.4.

The deployment must complete before the live website changes. Check logs in Vercel if a build fails.

## Security maintenance

The website generates static HTML and CSS. It has no application database, sign-in, forms, or server adapter.

- Keep `.gitignore` in place. It excludes dependency folders, generated output, environment files, and local Vercel state.
- Run `npm audit` when updating dependencies and before releases.
- Dependabot is configured to open weekly npm update pull requests after its configuration is pushed to GitHub.
- Install from the lockfile with `npm ci --ignore-scripts`. The current static build does not require dependency lifecycle scripts.
- Keep credentials out of source files and public assets.
- `vercel.json` applies the production browser security headers. The content security policy blocks scripts, embedded frames, and network connections from the page. Styles and images load from the site’s own origin.
- If adding interactive JavaScript, forms, analytics, external images, or fonts, review and test the policy as part of that change.

GitHub and Vercel account access, authentication, collaborator permissions, branch protection, and deployment logs require a separate review in those accounts.

## Recover from a problem

Inspect first:

```bash
git status
git diff
git log --oneline -5
```

Save uncommitted work before any rollback. For a published regression, redeploy a known working deployment in Vercel, or use `git revert COMMIT_SHA` to create a new commit that reverses the specific change, then push.

Avoid rewriting shared history or discarding local work as a routine recovery step.

## Troubleshooting

**The live site has not changed:** Check that the commit reached the production branch and that Vercel finished deploying it. Local edits and builds alone are not published.

**The build reports an unsupported Node version:** Select Node 24.x in Vercel and use the `.nvmrc` locally.

**Styles or new features are blocked in production:** Inspect the browser console and the CSP in `vercel.json`. Check the build output before adjusting the policy.

**A publication figure is missing:** Check that its path in `src/data/publications.ts` matches a file under `public/images/publications/`. The path starts with `/images/publications/` in the website.

**The build stalls before compiling:** Reinstall local dependencies with `npm ci --ignore-scripts`. This resolved the dependency-folder startup issue found during the November 2026 review; the same runtime successfully built both a clean temporary checkout and the repaired original.

**Dependencies seem inconsistent:** Run `npm ci --ignore-scripts` to install the exact versions in `package-lock.json`.

Last updated: November 17, 2026.
