# Website security review — November 17, 2026

## Result and scope

Reviewed the local tracked source, configuration, lockfile, available Git history, current remote main reference, and the public website’s HTTP response. No malicious code or secret-pattern matches were found in the reviewed files. This is a bounded source and dependency review, not a guarantee that the repository or hosting accounts have never been compromised.

The GitHub main reference matched the original checkout at `5ae24c9876806222e65667bc827df5bc2cf193e0`. There were four available commits, all from December 28, 2025. The only tracked local change before this work was deletion of `.gitignore`; `.astro/` and `node_modules/` were consequently unignored. Git does not identify who or what deleted an uncommitted file.

## Findings and fixes prepared locally

| Finding | Evidence | Change |
| --- | --- | --- |
| Outdated dependencies | npm reported 17 affected packages: 1 critical, 15 high, 1 low | Upgraded Astro from 5.16.6 to 7.4.12 and regenerated the lockfile; the initial follow-up audit reported zero; see the release audit below for a subsequently reviewed upstream advisory |
| Missing ignore rules | `.gitignore` was deleted locally | Restored exclusions for generated output and dependencies; expanded secret-file exclusions and ignored local Vercel state |
| Missing browser defense headers | The live response had HSTS, but no CSP, nosniff, anti-framing, referrer policy, or permissions policy headers | Added these headers in `vercel.json` for the next deployment |
| Unsafe recovery instructions | The maintenance guides recommended destructive reset and force-push commands | Replaced with inspection, Vercel deployment rollback, and targeted commit reversion |
| Missing CV asset | The CV linked to `/files/cv.pdf`, absent from the repository | Removed the invalid download; the CV section now contains education only |

The site generates static pages without a server adapter, request handlers, user input, or a database. Many framework advisories concern server rendering, image optimization, or other unused features. A dependency advisory alone does not establish that the live static site was exploitable. Updating the build dependencies still reduces exposure during development and future changes.

The production CSP blocks JavaScript, frames, forms, and page network connections. Styles and images load from the same origin. Stylesheets are emitted as external files so the policy does not require unsafe inline styles. Update and test this policy if adding interactive features.

Weekly npm update pull requests are configured in `.github/dependabot.yml`; they take effect after the file is pushed and Dependabot runs. Development and preview scripts explicitly bind to loopback.

## Secret and source checks

Scanned the 17 unique tracked paths across the four available commits for common private key, GitHub token, AWS access key, and assigned API key/password patterns, plus sensitive filenames. Found no matches. This pattern scan cannot detect every secret format, and it does not inspect deleted or unreachable Git objects, GitHub Actions secrets, hosting environment variables, or unrelated files on this computer.

Reviewed application markup, imports, package scripts, and configuration. Found no third-party page scripts, runtime network calls, raw HTML injection, or active local Git hooks. Lockfile download URLs use the npm registry.

## Live site and account limits

The public website returned HTTP 200 over HTTPS and identified Vercel as its host. HSTS was already enabled. These observations describe the site before the local changes are published.

This review does not verify GitHub or Vercel account security, two-factor authentication, collaborators, branch protection, installed integrations, audit logs, deployment history, production environment variables, or domain ownership. Those require authenticated access to the corresponding accounts.

Local changes do not alter the deployed website. After publication, verify the Vercel build, production routes, and response headers. Use a supported Node version, preferably current Node 24 LTS.

## Local verification

The original dependency installation stalled before compilation. A clean install of the same lockfile in a temporary directory built successfully using the existing Node 26.5.0 runtime. Reinstalling the checkout’s dependencies with `npm ci --offline --ignore-scripts` resolved its build as well. The exact underlying filesystem or installation fault was not established. No alternate Node runtime was installed.

The production build generated all five pages successfully. Generated-page checks passed for internal links and assets, page titles and descriptions, one main heading per page, active navigation, skip-link targets, safe new-tab links, and the absence of scripts or inline styles that would conflict with CSP. The production preview returned HTTP 200 locally. Account-level security and deployed headers remain unverified for the unpublished update.

Desktop (1440px) and mobile (390px) homepage screenshots were inspected in the installed Chrome browser using an isolated temporary profile. Production response headers still need verification after deployment.

All five routes were also checked in Chrome at exact viewport widths of 390, 768, and 1440 pixels, with the configured Vercel security headers applied by a temporary local server. All 15 route/viewport combinations had no horizontal overflow, and the browser reported no page errors. The temporary servers and browser were stopped after testing.

The subsequent light academic layout passed the same five-route, three-viewport browser checks with the configured headers, plus a keyboard Tab check confirming a visible skip-to-content link. Text contrast against white measured 14.36:1 for body text, 6.34:1 for secondary text, and 8.65:1 for links. These checks describe the unpublished local revision.

The publication update uses the three user-supplied JPG figures unchanged, with descriptive alternative text and full-size links. A production rebuild and all 15 route/viewport browser checks passed with security headers enabled and all figures decoded successfully. The CV page was checked to contain only its two education entries. Publication records are shared between the homepage and full list.

The portrait and CV update passed a production build, static asset/link checks, and all 15 route/viewport browser checks. The portrait is delivered as an approximately 29 KB WebP generated from the supplied image, and the downloadable PDF matches the supplied CV byte for byte. No public page links to GitHub. The CV webpage retains only the two education entries, plus the PDF download link. The running local development server was checked for the updated homepage and PDF.

## Release audit — November 17, 2026

The final fresh npm audit reports 10 high-severity affected dependency packages, all stemming from one picomatch advisory: [GHSA-fc5q-39xc-vjpf / CVE-2026-112366](https://github.com/advisories/GHSA-fc5q-39xc-vjpf). The advisory was reviewed and updated on November 17. It affects attacker-supplied repeated extglob patterns and lists no patched version. The latest registry release is 4.0.7, which is affected; this lockfile includes 4.0.7 and the nested 2.3.2 dependency.

For this release, picomatch is used by the Astro/Vite build-tool dependency tree. The application accepts no user-supplied glob patterns. The verified deployment output contains five static HTML pages and static assets, with no JavaScript files or application server handlers. The matching library is not part of the served output. Based on that architecture, no visitor-reachable path to the affected function was identified. This is an applicability assessment, not a patched dependency or a claim of a clean audit.

The release retains Astro 7.4.12. The audit’s forced fallback to Astro 5.3.0 was not applied because it would reverse the framework upgrade and reintroduce previously addressed advisories. Dependabot remains configured to report upstream updates.

## GitHub Pages deployment preparation

The GitHub Pages workflow installs the lockfile without dependency lifecycle scripts, builds with Node 24, uploads only the static output, and grants Pages deployment permissions only to the deploy job. Official GitHub actions are pinned to verified full commit hashes and covered by weekly Dependabot updates.

Pages builds use the GitHub domain and repository prefix. Navigation, figures, CV links, canonical metadata, and optimized portrait paths were checked under `/academic-website/`. The built HTML now carries its content security policy and referrer policy in metadata so those protections do not rely on Vercel headers. GitHub Pages does not apply `vercel.json`; anti-framing and permissions response-header rules remain specific to Vercel. No equivalent custom HTTP headers are claimed for Pages.

The upstream picomatch build-tool advisory documented above remains unpatched. The hosting change adds no application server handlers or visitor-supplied glob patterns.

The Pages-path release passed static checks for canonical URLs, current navigation, local asset links, the exact CV PDF, and the metadata CSP. All 15 page/viewport browser checks passed without custom response headers, with every image decoded and no page errors or horizontal overflow. A separate root-path build also passed for local and optional Vercel compatibility. Following explicit user approval, GitHub Pages was configured for GitHub Actions at https://yonaneg.github.io/academic-website/. The live deployment must be verified separately before handoff.

## Theme switch — November 22, 2026

A light/dark switch was added to the header. It needs one script, `public/theme.js`, served as a separate file from the site's own origin. The CSP `script-src` changed from `'none'` to `'self'` in both the page metadata and `vercel.json`; inline scripts, `eval`, and scripts from other origins remain blocked. The script reads and writes one `localStorage` key (`theme`) and makes no network requests. Without the script, the page still follows the system color setting and the switch stays hidden.
