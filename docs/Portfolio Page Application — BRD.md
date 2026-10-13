# Portfolio Page Application — BRD

Oct 13, 2026 · @Aman

A single-page, content-driven portfolio application where all personal data lives in typed content files and every page section is an independent, reusable module. Editing a profile means editing data, not code.

## 1. Executive summary and objectives

The original reference page is a dark one-pager (its look is superseded by section 11) with hero, status, workflow, skills, education, projects, certifications, experience and contact sections. Its content is hardcoded inside one HTML file, which makes it hard to reuse, test or extend. This BRD defines a modular rebuild that keeps the same section set but separates content, presentation and behaviour.

| ID | Business objective | Success measure |
| --- | --- | --- |
| BO-1 | Present professional identity, skills and work credibly in under 60 seconds of scanning | Visitor reaches Experience and Contact sections in a single scroll session |
| BO-2 | Turn visits into contact (recruiter, client, collaborator) | Contact clicks, resume downloads, email copies tracked |
| BO-3 | Update content without touching components | New project or job added by editing one data file only |
| BO-4 | Rank for the owner's name and role on search | Lighthouse SEO score of 95 or higher; correct structured data |
| BO-5 | Fast and accessible on low-end mobile | Lighthouse Performance 90+ and Accessibility 100 on mobile |

## 2. Scope

The application is a public, read-only single-page site with no backend, API or database. No user accounts in v1.

**In scope**

- Sections: Hero, Stats, Current Status, Workflow, Skills, Education, Projects, Certifications, Experience, Contact
- Content from typed data files, theme tokens, responsive layout, SEO, analytics, mailto and social contact links, resume download
- Light and dark theme, reduced-motion support, print-friendly resume view

**Out of scope (v1)**

- Backend, API, database, admin dashboard or CMS login
- Multi-user or multi-tenant hosting
- Blog engine (listed as a Phase 3 option)

**Assumptions**

- Stack follows the owner's usual choice: React, TypeScript, Vite, fully static, with no backend
- One owner, one language (English) in v1; i18n-ready structure
- Assets such as photo, logos and resume PDF are supplied by the owner

**Constraints**

- Static hosting only (Vercel, Netlify or Cloudflare Pages); no backend or database
- Total JS bundle under 200 KB gzipped for the first load
- Third-party company logos and trademarks need permission or neutral text marks, as the reference page uses plain-text logo tiles

## 3. Stakeholders and personas

| Persona | Goal on the site | What they need within 30 seconds |
| --- | --- | --- |
| Recruiter / hiring manager | Judge fit for a role | Current role, years of experience, skills, certifications, resume download |
| Client / collaborator | Judge ability to deliver | Selected projects with outcome, tech used, contact route |
| Peer / engineer | Understand depth | Project write-ups, code links, tooling |
| Site owner | Keep it current cheaply | Edit one data file, deploy, see analytics |

## 4. Functional requirements

Priority: M = must have, S = should have, C = could have. Each section is one module, so a requirement maps to one folder.

| ID | Module | Requirement | Priority |
| --- | --- | --- | --- |
| FR-1 | Layout | Transparent navbar over the hero: brand left, centered section links, hamburger right opening a full-screen menu, hairline divider below, active-section highlight on scroll | M |
| FR-2 | Hero | Headline and one-line pitch at left, portrait at right, oversized full-width name wordmark across the bottom, red-to-dark gradient background (section 11) | M |
| FR-3 | Stats | Four configurable counters (years, companies, platforms, certifications); values derived from data where possible | S |
| FR-4 | Status | Current role card with a live indicator, company logo tile, tags, and an about-the-company panel | M |
| FR-5 | Workflow | Ordered steps with icon, title and caption; responsive from six columns down to two | S |
| FR-6 | Skills | Grouped skills (core, languages, tools, platforms) rendered as tags, with optional filtering | M |
| FR-7 | Education | Degree card with expandable coursework | M |
| FR-8 | Projects | Cards with company, date, summary, expandable detail, and external links; detail page route is optional | M |
| FR-9 | Certifications | Credential list with issuer, date and verification link; featured credential highlighted | M |
| FR-10 | Experience | Vertical timeline, current job marked, duration calculated from start and end dates | M |
| FR-11 | Contact | Social icon links, email with copy-to-clipboard, mailto link, optional booking link | M |
| FR-12 | Resume | Download button in the navbar and contact section; file path set in config | M |
| FR-13 | Reveal motion | Sections fade in on scroll; disabled when the user prefers reduced motion | S |
| FR-14 | Theme | Design tokens in one theme file; dark default, light option, choice remembered | S |
| FR-15 | SEO | Page title, description, Open Graph and Twitter tags, JSON-LD Person schema generated from profile data | M |
| FR-16 | Not found | Friendly 404 and error boundary so one broken section cannot blank the page | S |
| FR-17 | Config switches | Each section can be enabled, disabled or reordered from a single config array | M |

## 5. Non-functional requirements

| ID | Area | Requirement |
| --- | --- | --- |
| NFR-1 | Performance | Largest Contentful Paint under 2.5 s on 4G mobile; images in WebP/AVIF with width and height set; fonts self-hosted; icons as inline SVG instead of a full icon font |
| NFR-2 | Accessibility | WCAG 2.2 AA; semantic landmarks, skip link, visible focus, keyboard-operable menu and expanders, contrast 4.5:1 or better, alt text on images |
| NFR-3 | Responsive | Works from 320 px to 2560 px wide; safe-area insets respected on phones |
| NFR-4 | SEO | One H1, unique title and description, sitemap.xml, robots.txt, canonical URL, JSON-LD |
| NFR-5 | Security | Content Security Policy, no inline scripts in production, no secrets in the client bundle, `rel="noopener"` on external links |
| NFR-6 | Privacy | Cookie-free, privacy-friendly analytics; no personal data stored |
| NFR-7 | Maintainability | TypeScript strict mode, ESLint, Prettier, one component per file, no section imports another section |
| NFR-8 | Testability | Unit tests on utilities, component tests per section, one end-to-end smoke test, 80% coverage on `lib/` |
| NFR-9 | Browser support | Last two versions of Chrome, Edge, Safari, Firefox; graceful fallback where `backdrop-filter` is missing |
| NFR-10 | Deployability | One command builds; CI runs lint, type check, tests and Lighthouse; preview URL per pull request |

## 6. Tech stack and architecture

The stack is React with TypeScript on Vite, with content in typed data files. The rule that keeps it modular: data flows down one way, from `content` through `config` to `sections`, and sections never import each other.

| Layer | Choice | Reason |
| --- | --- | --- |
| UI | React 18, TypeScript (strict) | Matches the owner's existing stack |
| Build | Vite | Fast dev server, small production bundles |
| Styling | CSS Modules plus a global tokens file (or Tailwind if preferred) | Scoped styles per component, theme from variables |
| Content | Typed `.ts` data files validated with Zod | Compile-time and runtime safety, no CMS needed |
| Icons | `lucide-react` or inline SVG | Replaces the 4.7 Font Awesome CDN download |
| Motion | Small `useReveal` hook on IntersectionObserver | Same effect as the reference, no animation library |
| Contact | mailto link and copy-email button | No backend needed |
| Testing | Vitest, React Testing Library, Playwright | Unit, component, end to end |
| Quality | ESLint, Prettier, Husky, GitHub Actions | Enforced on every commit and pull request |

**Layers, top to bottom**

1. `content/` holds the owner's data only, no JSX.
2. `config/` decides which sections show, in what order, with which theme and SEO values.
3. `sections/` are self-contained feature modules that receive typed data as props.
4. `components/` are generic building blocks (Card, Tag, Timeline, Button) with no personal data.
5. `hooks/` and `lib/` hold behaviour and pure helpers, free of UI.

## 7. Folder structure

Each section folder owns its component, styles, test and index file, so deleting a folder removes a feature cleanly.

```text
portfolio/
├── public/
│   ├── favicon.svg
│   ├── resume.pdf
│   ├── og-image.png              # social share preview
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.tsx                  # entry point
│   ├── App.tsx                   # renders sections from config
│   ├── config/
│   │   ├── site.config.ts        # section order, enabled flags, nav links
│   │   ├── seo.config.ts         # title, description, OG, JSON-LD inputs
│   │   └── theme.config.ts       # default theme, token overrides
│   ├── content/                  # ONLY personal data, no JSX
│   │   ├── profile.ts            # name, role, pitch, photo, contact
│   │   ├── stats.ts
│   │   ├── status.ts             # current role + company panel
│   │   ├── workflow.ts
│   │   ├── skills.ts
│   │   ├── education.ts
│   │   ├── projects.ts
│   │   ├── certifications.ts
│   │   ├── experience.ts
│   │   ├── socials.ts
│   │   └── index.ts              # re-exports + validates with schemas
│   ├── schemas/                  # Zod schemas + inferred types
│   │   ├── profile.schema.ts
│   │   ├── project.schema.ts
│   │   ├── experience.schema.ts
│   │   └── index.ts
│   ├── sections/                 # one folder per page section
│   │   ├── registry.ts           # id -> component map
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   ├── Hero.module.css
│   │   │   ├── Hero.test.tsx
│   │   │   └── index.ts
│   │   ├── Stats/
│   │   ├── Status/
│   │   ├── Workflow/
│   │   ├── Skills/
│   │   ├── Education/
│   │   ├── Projects/
│   │   ├── Certifications/
│   │   ├── Experience/
│   │   └── Contact/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   └── SectionShell/     # shared heading, eyebrow, spacing
│   │   ├── ui/
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Tag/
│   │   │   ├── Timeline/
│   │   │   ├── Accordion/        # replaces <details>
│   │   │   ├── LogoTile/
│   │   │   └── Wordmark/         # giant fluid name text in the hero
│   │   └── feedback/
│   │       ├── ErrorBoundary/
│   │       └── NotFound/
│   ├── hooks/
│   │   ├── useReveal.ts          # scroll reveal
│   │   ├── useActiveSection.ts   # navbar highlight
│   │   ├── useTheme.ts
│   │   └── useCopyToClipboard.ts
│   ├── lib/
│   │   ├── dates.ts              # duration math ("4 years 4 months")
│   │   ├── seo.ts                # builds JSON-LD from profile
│   │   ├── analytics.ts          # thin wrapper over provider
│   │   └── cn.ts                 # class name helper
│   ├── styles/
│   │   ├── tokens.css            # colors, spacing, radii, fonts
│   │   ├── reset.css
│   │   └── global.css
│   ├── assets/
│   │   ├── images/
│   │   └── logos/
│   └── types/
│       └── global.d.ts
├── tests/
│   └── e2e/smoke.spec.ts
├── docs/
│   ├── BRD.md
│   └── CONTENT-GUIDE.md          # how to edit content files
├── .github/workflows/ci.yml
├── index.html
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
└── package.json
```

Three rules enforce the structure: sections import only from `components`, `hooks`, `lib` and `schemas`; `content` imports nothing except its own types; and every folder exposes a single `index.ts` so imports stay short.

## 8. Modular code design

Five patterns make the code modular: schema-first content, a section registry, config-driven composition, shared UI primitives and behaviour in hooks. The snippets below are the pattern, not the full build.

**1. Schema-first content** (`schemas/experience.schema.ts`)

```ts
import { z } from 'zod';

export const experienceSchema = z.object({
  id: z.string(),
  role: z.string(),
  company: z.string(),
  logoKey: z.string().optional(),
  start: z.string(),            // 'YYYY-MM'
  end: z.string().nullable(),   // null = present
  summary: z.string(),
  highlights: z.array(z.string()).default([]),
});

export type Experience = z.infer<typeof experienceSchema>;
```

**2. Content file with validation** (`content/experience.ts`)

```ts
import { experienceSchema, type Experience } from '@/schemas';

const data: Experience[] = [
  {
    id: 'current',
    role: 'Associate Workspace ONE Administrator',
    company: 'Boeing',
    start: '2023-12',
    end: null,
    summary: 'Manage and support the Workspace ONE platform.',
    highlights: [],
  },
];

export const experience = experienceSchema.array().parse(data);
```

**3. Section registry** (`sections/registry.ts`)

```ts
import type { ComponentType } from 'react';
import { Hero } from './Hero';
import { Experience } from './Experience';
// ...other sections

export type SectionId =
  | 'hero' | 'stats' | 'status' | 'workflow' | 'skills'
  | 'education' | 'projects' | 'certifications' | 'experience' | 'contact';

export const registry: Record<SectionId, ComponentType> = {
  hero: Hero,
  experience: Experience,
  // ...
};
```

**4. Config-driven page** (`config/site.config.ts` and `App.tsx`)

```ts
export const siteConfig = {
  sections: [
    { id: 'hero', enabled: true, nav: 'Home' },
    { id: 'status', enabled: true, nav: 'Status' },
    { id: 'skills', enabled: true, nav: 'Skills' },
    { id: 'projects', enabled: true, nav: 'Projects' },
    { id: 'experience', enabled: true, nav: 'Experience' },
    { id: 'contact', enabled: true, nav: 'Contact' },
  ],
} as const;
```

```tsx
import { siteConfig } from '@/config/site.config';
import { registry } from '@/sections/registry';
import { Navbar, Footer, ErrorBoundary } from '@/components';

export default function App() {
  const active = siteConfig.sections.filter((s) => s.enabled);
  return (
    <>
      <Navbar items={active.filter((s) => s.nav)} />
      <main>
        {active.map(({ id }) => {
          const Section = registry[id];
          return (
            <ErrorBoundary key={id}>
              <Section />
            </ErrorBoundary>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
```

**5. A section module** (`sections/Experience/Experience.tsx`)

```tsx
import { experience } from '@/content';
import { SectionShell, Timeline, Card } from '@/components';
import { formatDuration } from '@/lib/dates';

export function Experience() {
  return (
    <SectionShell id="experience" eyebrow="Experience" title="The journey.">
      <Timeline>
        {experience.map((job) => (
          <Card key={job.id} current={job.end === null}>
            <h3>{job.role}</h3>
            <p>{job.company} · {formatDuration(job.start, job.end)}</p>
            <p>{job.summary}</p>
          </Card>
        ))}
      </Timeline>
    </SectionShell>
  );
}
```

**6. Behaviour in a hook** (`hooks/useReveal.ts`)

```ts
import { useEffect, useRef, useState } from 'react';

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !ref.current) return setShown(true);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}
```

**Adding a new section** takes four steps: create the schema, add the content file, create the section folder, then register it and add one line to `site.config.ts`. No existing section changes.

## 9. Suggested improvements over the reference page

The reference page looks strong; these changes fix gaps in content strength, performance and maintainability.

| # | Improvement | Why it matters | Phase |
| --- | --- | --- | --- |
| 1 | Outcome-based project write-ups (problem, role, tools, measurable result, link) | The reference lists one project and describes an activity, not a result; recruiters scan for impact | 1 |
| 2 | Quantified experience bullets (devices managed, tickets cut, uptime) | Numbers prove claims better than duty lists | 1 |
| 3 | Replace the Font Awesome 4.7 CDN with inline SVG icons | Removes an old external dependency and about 70 KB of unused icons | 1 |
| 4 | Self-host fonts and use a system stack fallback | Faster first paint, no third-party request | 1 |
| 5 | Skills grouped by proficiency or category, not one flat tag cloud of 17 items | Easier to scan and more honest about depth | 1 |
| 6 | Derived stats and durations from dates | The reference hardcodes "8+ years" and "4 years 4 months"; they go stale | 1 |
| 7 | Open Graph image, JSON-LD Person schema, sitemap, canonical URL | Rich link previews when shared on LinkedIn or WhatsApp, better search results | 1 |
| 8 | Copy-email button with a confirmation toast | Works for visitors who have no mail app configured | 2 |
| 9 | Optional "book a call" link (Calendly or Cal.com) | Lowers friction to first contact | 2 |
| 10 | Light theme plus system-preference detection | Accessibility and user comfort | 2 |
| 11 | Testimonials or recommendations section | Social proof from managers and colleagues | 2 |
| 12 | Privacy-friendly analytics with custom events (resume download, contact click) | Measures BO-2 without cookies | 2 |
| 13 | Print stylesheet or auto-generated PDF resume from the same data | One source of truth for site and resume | 2 |
| 14 | Self-hosted images only; remove broken fallback paths such as the missing `wasim.jpeg` and `ConsoleLogo.png` | Avoids console errors and layout shift | 1 |
| 15 | Blog or notes section using Markdown or MDX | Demonstrates depth and builds search traffic | 3 |
| 16 | Case-study detail pages with routing | Room for long project stories | 3 |
| 17 | i18n structure (`content/en`, `content/hi`) | Reach more audiences | 3 |
| 18 | Optional headless CMS or JSON editor for non-code edits | Lets the owner update from a browser | 3 |
| 19 | Lighthouse CI gate and visual regression tests | Stops regressions from reaching production | 2 |
| 20 | Contact details protected from scrapers (email address assembled at runtime) | Plain-text emails in source attract spam | 2 |

One content note: the reference states current employer details and a cert date range ("VCP – Digital Workspace 2023") that should be checked against the owner's records before launch, because the page is the public source of truth.

## 10. Delivery, acceptance and risks

Durations are rough estimates for one developer and should be adjusted once content is ready.

| Phase | Scope | Estimate | Exit gate |
| --- | --- | --- | --- |
| 1. Foundation and MVP | Project setup, tokens, schemas, content files, all ten sections, SEO basics, deploy | 1.5 to 2 weeks | All M requirements pass; Lighthouse targets met on mobile |
| 2. Engagement | Copy-email and booking link, theme switch, analytics events, testimonials, resume PDF, CI gates | 1 week | Contact links work; events appear in analytics; CI green |
| 3. Growth (optional) | Blog, case-study pages, i18n, CMS | 2 or more weeks | Owner decision after 4 weeks of analytics |

**Acceptance criteria**

- Every Must requirement in section 4 is demonstrated on a deployed preview URL
- Disabling a section in `site.config.ts` removes it from the page and navbar with no other change
- Adding an experience entry requires editing only `content/experience.ts`
- Invalid content (missing field, wrong date format) fails the build with a readable error
- Lighthouse mobile scores: Performance 90+, Accessibility 100, SEO 95+, Best Practices 95+
- Keyboard-only walkthrough reaches every link and expander; no axe violations

**Risks**

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Company logos or trademarks used without permission | Takedown or reputational issue | Use text marks or get permission; keep logos optional in the schema |
| Employer confidentiality (internal tools, project detail) | Policy breach | Write projects at outcome level; owner reviews before launch |
| Heavy visual effects slow low-end phones | Poor mobile score | Limit blur and gradients, test on a throttled device |
| Email address scraped | Inbox noise | Build the address at runtime; offer social links as alternatives |
| Content goes stale | Weak credibility | Derived dates and a quarterly content review reminder |

**Open questions**

- Is this a single-owner personal site, or a reusable template others will fill with their own data?
- Which sections does the Dribbble shot show below the hero? Screenshots of the full shot would let section 11 specify them exactly.
- Tailwind or CSS Modules for styling?
- Which sections are optional for launch (testimonials, blog)?

## 11. Visual design specification

The look follows your hero image: a full-bleed red-to-black gradient, a profile portrait, a headline at left and an oversized white name across the bottom. Colour values below are my estimates read off that image, so confirm them with an eyedropper before build.

**Status of the Dribbble shot:** I could not open it, because the page is rendered with JavaScript and returned no readable content. I have not specified anything from it, so "follow strictly" is not yet possible. Sections below the hero stay open until you share screenshots of the full shot; then this section is extended and the section list in 4 is reordered to match.

**Design tokens (estimated)**

| Token | Value | Use |
| --- | --- | --- |
| `--bg-start` | `#FF7B3A` | Gradient top-left, warm orange glow |
| `--bg-mid` | `#E8210F` | Main saturated red area |
| `--bg-end` | `#1A0504` | Gradient bottom-right, near black |
| `--text` | `#FFFFFF` | Headline, nav, wordmark |
| `--text-muted` | `rgba(255,255,255,.85)` | Supporting paragraph |
| `--hairline` | `rgba(255,255,255,.4)` | 1 px line under the nav |

```css
:root {
  --bg-start: #ff7b3a;
  --bg-mid: #e8210f;
  --bg-end: #1a0504;
  --text: #fff;
  --hairline: rgba(255, 255, 255, 0.4);
}
.hero {
  background:
    radial-gradient(60% 50% at 0% 0%, var(--bg-start), transparent 70%),
    linear-gradient(135deg, var(--bg-mid) 30%, var(--bg-end) 100%);
}
```

**Hero anatomy (desktop, 1440 px)**

| Element | Spec |
| --- | --- |
| Navbar | Brand text left; links centred (Work, About, Resume, Contact, plus Shop only if a store exists); two-line hamburger icon right; 1 px hairline below; no background fill |
| Headline | Three lines, left aligned, white, medium-weight grotesk sans, about 40 to 48 px, tight leading around 1.1 |
| Supporting text | One or two lines, about 14 to 16 px, max width about 380 px |
| Portrait | Transparent-background cut-out placed right of centre, colour-graded to the gradient, glasses tinted orange; fades into the dark bottom-right |
| Wordmark | Owner's name, white, bold grotesk, fills the full content width at the bottom, sits in front of the portrait's shoulders; sized with `clamp()` or SVG text so it never wraps or overflows |
| Layout | Hero is one viewport tall; content padding about 32 px; text column about 35% wide |

**Responsive behaviour**

- Under 820 px: nav keeps brand and hamburger only; headline above, portrait below it, wordmark scaled to full width underneath
- Hamburger opens a full-screen menu on every screen size
- Wordmark and headline use fluid type, no fixed breakpoints for font size

**Rules for using the reference**

- Copy the layout, colour mood and typographic scale only; do not reuse the reference photo, the "Licbar" name or any Dribbble artwork
- The portrait must be the owner's own photo, cut out and colour-graded (a duotone or gradient-map treatment gives the same effect)
- Text on the gradient must keep 4.5:1 contrast; check the lightest orange corner, and add a subtle dark overlay behind the headline if it fails
- Sections below the hero reuse the same palette and type so the page feels continuous, pending the Dribbble screenshots
