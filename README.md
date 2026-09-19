# Rajit Dakhane — Personal Portfolio

> A fast, accessible, and secure personal portfolio site built to prove engineering skills through real project case studies — not just resume claims.
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🎯 Purpose

This portfolio exists to solve a specific problem: **recruiters and hiring managers can't verify technical depth from a resume alone**. Every project here includes:

- **Problem statement** — what was the hard constraint?
- **My role** — what did I actually own?
- **Measurable outcome** — numbers, not adjectives
- **Live GitHub link** — verify the code yourself
- **Tech stack tags** — filter by what matters to you

Target: a recruiter decides "worth interviewing" in < 90 seconds.

---

## 🛠 Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | Next.js 16.3 (App Router) | Static generation, zero server runtime, React 19 |
| **Language** | TypeScript 5.7 (strict) | Compile-time safety, self-documenting contracts |
| **Styling** | Tailwind CSS v4 (CSS-first `@theme`) | Design tokens in CSS, no config file, minimal bundle |
| **Content** | JSON + Zod schemas | Version-controlled, validated at build time |
| **Fonts** | Inter + JetBrains Mono (self-hosted, `font-display: swap`) | No third-party font requests, fast LCP |
| **Testing** | Vitest + Playwright + axe-core | Unit, E2E, accessibility in CI |
| **CI/CD** | GitHub Actions → Vercel | Lint, typecheck, build, test, a11y gates |
| **Hosting** | Vercel Edge Network | Global CDN, automatic HTTPS, atomic deploys |

**Dependencies**: Zero runtime secrets. No database. No auth. No server-side rendering on request path.

---

## ✨ Features

- **Homepage** — Hero (name, role, bio, CTAs), About (experience timeline + publications), Featured Projects (3 cards)
- **Projects List** (`/projects`) — All projects in responsive grid
- **Project Detail** (`/projects/[slug]`) — Full case study: problem, role, outcome, tech stack, GitHub link
- **Resume Download** — Direct PDF link with cache-busting filename
- **Contact Links** — Email (mailto), LinkedIn, GitHub with `rel="noopener noreferrer"`
- **Accessibility** — WCAG 2.2 AA: skip link, focus rings, semantic HTML, color contrast, reduced motion
- **Security** — CSP header, DOMPurify XSS escaping, no client-exposed secrets, dependency scanning
- **Performance** — Static export, self-hosted fonts, minimal JS (~80 KB gzipped), LCP < 2s target

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 11+ (`corepack enable && corepack prepare pnpm@latest --activate`)

### Install & Run
```bash
# Clone
git clone https://github.com/rd-007/portfolio.git
cd portfolio

# Install (frozen lockfile for reproducibility)
pnpm install --frozen-lockfile

# Development server
pnpm dev
# → http://localhost:3000
```

### Build & Validate
```bash
# Type-check
pnpm typecheck

# Lint
pnpm lint

# Content schema validation
pnpm validate:content

# Production build (static export)
pnpm build

# Run all checks (CI-equivalent)
pnpm validate:content && pnpm typecheck && pnpm lint && pnpm build
```

### Test
```bash
# Unit tests + coverage
pnpm test:unit

# E2E tests (requires dev server running)
pnpm dev & pnpm test:e2e

# Accessibility tests
pnpm test:a11y
```

---

## 📁 Project Structure

```
portfolio/
├── .github/workflows/ci.yml      # CI pipeline
├── public/
│   ├── fonts/                    # Self-hosted Inter + JetBrains Mono
│   └── resume/resume.pdf         # Resume PDF (versioned filename)
├── src/
│   ├── app/
│   │   ├── globals.css           # Tailwind v4 @theme + design tokens
│   │   ├── layout.tsx            # Root layout, metadata, CSP
│   │   ├── page.tsx              # Homepage
│   │   ├── projects/page.tsx     # Projects list
│   │   ├── projects/[slug]/      # Project detail (SSG)
│   │   └── not-found.tsx         # Custom 404
│   ├── components/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── TechTag.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── NavLink.tsx
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── content/                  # Content source (validated at build)
│   │   ├── schema.ts             # Zod schemas (TRD Section 6)
│   │   ├── profile.json
│   │   ├── experience.json
│   │   ├── projects.json
│   │   └── publications.json
│   └── lib/
│       ├── content.ts            # Async fetchers for all content
│       └── profile.ts            # Static profile export
├── scripts/
│   └── validate-content.ts       # Build-time Zod validation
├── tests/
│   ├── setup.tsx                 # Vitest mocks
│   ├── a11y.spec.ts              # axe-core accessibility tests
│   ├── e2e.spec.ts               # Playwright E2E (US-1..US-10)
│   └── components.test.tsx       # Unit tests
├── playwright.config.ts
├── vitest.config.ts
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 📝 Content Management

All content lives in `src/content/*.json` — **no CMS, no database**. To add/update a project:

1. Edit `src/content/projects.json` (or add new entry)
2. Ensure it matches `Project` schema in `src/content/schema.ts`:
   ```ts
   {
     id: string,           // unique
     title: string,
     slug: string,         // kebab-case, unique, used in URL
     problem: string,      // ≤ 280 chars
     techStack: string[],  // 1–8 items
     role: string,
     outcome: string,      // measurable impact
     githubUrl: string,    // must be https://
     demoUrl?: string,     // optional, https://
     order: number         // display order
   }
   ```
3. Run `pnpm validate:content` — fails build on any violation
4. Commit → CI validates → Vercel deploys

**Same pattern** for Profile, Experience, Publications.

---

## 🧪 Testing Strategy

| Layer | Tool | Coverage Target |
|-------|------|-----------------|
| Unit | Vitest + RTL | ≥ 80% on `lib/` & `components/` |
| Component | RTL | Button, TechTag, NavLink — 100% |
| Contract | Zod | 100% of content files on every push |
| E2E | Playwright | US-1 through US-10 (all core flows) |
| Accessibility | axe-core | 0 critical/serious violations |
| Performance | Lighthouse CI | Perf ≥ 90, A11y ≥ 95, SEO ≥ 90 |

Run locally:
```bash
pnpm test:unit        # vitest run --coverage
pnpm test:e2e         # playwright test (needs pnpm dev in background)
pnpm test:a11y        # playwright test tests/a11y.spec.ts
```

---

## 🔒 Security

- **Dependency scanning**: `pnpm audit` in CI, GitHub secret scanning on every PR
- **Content Security Policy**: Restricts scripts/styles/fonts to self + known domains
- **XSS protection**: DOMPurify escapes all user-facing content (server + client)
- **External links**: `rel="noopener noreferrer"` + `target="_blank"`
- **No secrets**: Zero API keys, tokens, or credentials in repo or client bundle
- **HTTPS enforced**: Vercel automatic TLS + HSTS

---

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import repo in [Vercel Dashboard](https://vercel.com/new)
3. Vercel auto-detects Next.js, builds, deploys
4. Every push to `main` → production deploy
5. Every PR → preview deploy with unique URL

### Manual Vercel CLI
```bash
pnpm add -g vercel
vercel --prod
```

### Environment Variables
None required for core functionality. Optional:
- `NEXT_PUBLIC_ANALYTICS_ID` — Plausible/Umami site ID
- `NEXT_PUBLIC_GA_ID` — Google Analytics (not recommended for perf)

---

## 📊 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP (p75) | < 2.0s | Vercel Analytics / CrUX |
| TTI | < 3.5s (4G) | Lighthouse CI |
| CLS | < 0.1 | Lighthouse CI |
| JS Bundle (gz) | < 150 KB | `next build` output |
| Lighthouse Perf | ≥ 90 | CI gate |
| Lighthouse A11y | ≥ 95 | CI gate |

---

## 🗺 Roadmap (Post-V1.0)

- [ ] Dark/light mode toggle (deferred from V1.0)
- [ ] Interactive project filtering by tech tag
- [ ] Automated weekly external link checker (GitHub Action)
- [ ] Pre-commit content validation hook (husky)
- [ ] Custom domain + email forwarding

---

## 🤝 Contributing

This is a personal portfolio — not accepting external contributions. However, if you spot a bug or accessibility issue:

1. Open an issue with reproduction steps
2. I'll evaluate and fix

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

Feel free to use this as a reference for your own portfolio. **Please don't copy the content** (projects, bio, resume) — write your own story.

---

## 🙏 Acknowledgments

Design inspired by the restraint and clarity of:
- [Lee Robinson](https://leerob.io)
- [Brittany Chiang](https://brittanychiang.com)
- [Josh Comeau](https://www.joshwcomeau.com)
- [Emil Kowalski](https://emilkowal.ski)

Built with Next.js, Tailwind CSS, and a lot of `pnpm build` iterations.

---

**Live at**: [https://rajitdakhane.vercel.app](https://rajitdakhane.vercel.app) (or your custom domain)

**Contact**: [rajitdakhane007@zohomail.in](mailto:rajitdakhane007@zohomail.in) · [LinkedIn](https://linkedin.com/in/rajit0311) · [GitHub](https://github.com/rd-007)
