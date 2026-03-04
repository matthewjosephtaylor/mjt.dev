---
name: mjt.dev
repo: matthewjosephtaylor/mjt.dev
branch: master
type: code
status: "Live — shipped 2026-03-04"
hosting: GitHub Pages from docs/
domain: mjt.dev

constraints:
  - "All published content lives in docs/ — GitHub Pages serves this directory"
  - "Build scripts use process.cwd() for paths — always run from repo root"
  - "Do NOT modify art page images — only HTML wrappers"
  - "style.css is the single design system — no inline styles, no additional CSS files"
  - "No frameworks, no bundlers, no client-side JavaScript"
  - "Every page must work in both dark and light mode"
  - "Images use loading='lazy' except above-the-fold hero"
---

# mjt.dev

Personal website for Matthew Joseph Taylor — a digital business card. Static HTML + CSS served via GitHub Pages from `docs/`. No build toolchain, no frameworks, no client-side JavaScript.

The site is a **selection filter**: it attracts people who resonate with art, writing, code, and philosophy, and naturally repels misaligned attention through its aesthetic and tone.

## Design Principles

These principles govern every decision on this site. They were derived from a design interview and grounded in the [UI Design Foundations deep-dive](https://github.com/mjt-memexes/think/blob/main/deep-dives/2026-02-21-ui-design-foundations-and-standards.md) and the [Desk design system](https://github.com/mjt-memexes/think/blob/main/infrastructure/desk/DESIGN.md).

### 1. Show, Don't Tell

The highest-priority principle. Let the work speak. Art is displayed, not described. Projects are linked, not pitched. The book is a cover image and a link, not a paragraph about the writing process. If the visitor can see a thing directly, never describe it.

### 2. Respect Attention

No hype, no selling, no noise. Every element earns its place. Whitespace is generous — the Japanese concept of *ma* (間), the meaningful emptiness that gives other elements room to breathe. Nothing decorative for its own sake.

### 3. Simple and Refined

Minimal but not minimalist. There's warmth and depth. Like a well-made tool — nothing extraneous, but nothing cold. The site itself should feel crafted: every element intentional, no rough edges.

### 4. Honest Multiplicity

Art, writing, code, philosophy — all present, none dominant. The multi-domain nature IS the identity. Don't apologize for it, don't explain it. Just show each one.

### 5. Dark and Respectful

Dark by default (art reads better, aligns with Desk visual language). Light mode via `prefers-color-scheme: light` because *respectful*. WCAG-compliant.

## Structure

```
docs/                         # GitHub Pages root (CNAME → mjt.dev)
├── index.html                # Landing page — hero + three domain cards
├── style.css                 # Single design system (CSS custom properties)
├── favicon.ico
├── CNAME                     # GitHub Pages custom domain
├── fonts/                    # Inter font files
├── assets/                   # Profile image, book covers, icons
│   ├── mjt_profile_art.png   # Hero profile image
│   ├── legacy-codebase-cover.jpg
│   ├── desk-ui.png           # Code card image
│   └── icon/                 # Social media SVG icons
├── about/index.html          # Gödel → Hope philosophical story
├── art/index.html            # Gallery — 113 lazy-loaded thumbnails
├── art-*/index.html          # Individual art pages (generated)
├── writing/index.html        # Writing wayfinder — Books, Substack, Medium
├── blog/                     # Legacy posts (unlinked, URLs preserved)
├── process/index.html        # Seven-step creative process
└── thanks/index.html         # Acknowledgments
scripts/
├── build-art-pages.js        # Generates art-*/index.html + gallery (zero deps)
└── build-writing-page.js     # Generates writing/index.html from RSS (planned)
```

## Visual Language

### Color Tokens

| Token | Dark (default) | Light | Use |
|-------|---------------|-------|-----|
| `--bg` | `#0d1117` | `#ffffff` | Page background |
| `--surface` | `#161b22` | `#f6f8fa` | Cards, elevated elements |
| `--border` | `#30363d` | `#d0d7de` | Subtle separators |
| `--text` | `#d4d4d4` | `#1f2328` | Primary text |
| `--text-muted` | `#8b949e` | `#656d76` | Secondary text, dates |
| `--accent` | `#79b8ff` | `#0969da` | Links, interactive |

### Typography

- **Font**: Inter, system-ui fallback
- **Body**: weight 400, `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)`, line-height 1.5
- **Headings**: weight 600, line-height 1.2
- **Max measure**: `65ch` (optimal reading width)
- **Rendering**: `font-optical-sizing: auto`, `-webkit-font-smoothing: auto` (not antialiased — Inter looks better with subpixel rendering)

### Spacing

8px grid (`0.5rem` increments). Tokens: `--space-xs` (0.5rem), `--space-sm` (1rem), `--space-md` (2rem), `--space-lg` (4rem), `--space-xl` (6rem).

### Transitions

Hover states only, 150ms. No scroll effects, no parallax, no fade-ins. If a thing is there, it's there.

## CSS Components

| Class | Use |
|-------|-----|
| `.content` | Max-width `65ch` centered container |
| `.hero` | Landing page hero (centered, generous padding) |
| `.domains` | Three-column card grid (`auto-fit, minmax(240px, 1fr)`) |
| `.domain-card` | Image + label card with hover border |
| `.gallery-grid` | Art thumbnail grid (`auto-fill, minmax(200px, 1fr)`) |
| `.venue-block` | Surface card with padding (writing page) |
| `.button` | Inline action button (border background, hover invert) |
| `.nav` | Back-navigation padding |
| `.footer` | Border-top, centered, muted text + social icons |

## Build Scripts

### Art Gallery

```bash
node scripts/build-art-pages.js    # From repo root
```

Reads `marketing.json` from each `art-*/` directory. Generates:
- Individual art pages (`art-*/index.html`) with per-piece colors
- Gallery index (`docs/art/index.html`) with lazy-loaded thumbnail grid
- Sorts by year descending, then title alphabetically

### Writing Page (planned)

```bash
node scripts/build-writing-page.js    # From repo root
```

Fetches Substack + Medium RSS feeds. Generates `docs/writing/index.html` with recent article titles, subtitles, and dates. Books section is static (updated by hand). Run after publishing new articles.

## Local Preview

```bash
python3 -m http.server 8080 -d docs/
```

## Adding New Content

### New art piece
1. Add `art-{id}/` directory with `image-art-{id}.png` and `marketing.json`
2. Run `node scripts/build-art-pages.js`
3. Commit and push

### New book
1. Add cover image to `docs/assets/`
2. Update the books section in `scripts/build-writing-page.js` (or `docs/writing/index.html` directly)
3. Commit and push

### New blog/article
1. Run `node scripts/build-writing-page.js` to pull latest RSS
2. Commit and push

## History

Full design direction and interview notes: [revisions/2026-03-03-mjt-dev-design-direction.md](https://github.com/mjt-memexes/think/blob/main/revisions/2026-03-03-mjt-dev-design-direction.md) in the think memex.

| Phase | What | Commit |
|-------|------|--------|
| 1 | Design interview + direction document | — |
| 2 | CSS design system + core page rewrite | `04d5019` |
| 3 | Art gallery build script + 113 pages | `87a28c6` |
| 4 | Dead file cleanup + blog polish (-11K lines) | `8e87d0d` |
| 5 | Writing & Code sections, book cover, Desk UI | `2003d90`, `43befe3` |
| Ship | Merged PR #23 to master, live on GitHub Pages | `0af17af` |