# Sayama Shabbir — Editorial Personal Portfolio

An atmospheric, print-inspired personal portfolio website presenting Sayama Shabbir's Cloud Computing & Technology CV across three full-viewport cinematic chapters. Built exclusively with semantic HTML, custom CSS, and vanilla JavaScript, it recreates the warm archival paper aesthetic, Didone typography, staggered letter choreography, and scroll-linked transitions of the Tana Camps editorial monograph.

## User Review & Critical Decisions

> [!IMPORTANT]
> Your preferences from our initial design alignment are locked into this blueprint and govern image framing, custom iconography, and interactive navigation behavior.

- **Confirmed Photo Curation**: Your golden-hour sunset waterfront photograph serves as the full-bleed Hero backdrop (without an artificial cut-out, framing the title cleanly in the warm sky above your silhouette), your vertical café window portrait anchors the right-column 2:3 frame in Quick Facts, and tailored focal crops of both photographs populate the two circular inline pills in Section 2.
- **Confirmed Section 2 Emblem**: The 66px double-ring rust seal beneath the personal statement features a custom fine-line geometric cloud-node constellation honoring your Cloud Computing specialization.
- **Confirmed Interactive Controls**: Clicking **MENU** opens an archival chapter-jump and contact drawer; clicking **SEARCH** opens a live CV keyword spotlight that filters skills, coursework, and qualifications with smooth jump-and-highlight; clicking the **7 MINUTES** rotating badge initiates a smooth, pausable guided reading scroll across the portfolio.

---

## 1. Overview & Core Concept

- **What It Does**: Transforms a traditional academic and technical resume into a three-chapter digital monograph—opening with a golden-hour cinematic hero that melts into warm textured paper, moving into an expressive typographic manifesto with inline circular portraits, and culminating in a structured three-column editorial dossier with complete academic, technical, and Deloitte virtual experience records.
- **Target Audience / Persona**: Technical recruiters, hiring managers, engineering mentors, and collaborators reviewing Sayama Shabbir's profile who value both technical rigor (Cloud Computing, Python, C++, Data Analytics, Frontend) and memorable visual craft.
- **Key Value**: Preserves 100% of CV credentials with zero omissions or fabrications while elevating presentation from a standard template into a refined, responsive, accessible editorial experience at both 1440×960 desktop scale and mobile viewports.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Cinematic Arrival & Hero Melt**: Visitors land on the full-bleed sunset waterfront stage as the photograph settles from scale `1.06` to `1.0`, navigation and the `CLOUD COMPUTING • TECHNOLOGY` eyebrow fade down, each letter of `SAYAMA SHABBIR` rises sequentially out of blur, and the cream `EXPLORE MY JOURNEY` pill invites exploration. Scrolling (or clicking the pill) blurs the hero backdrop up to `6px` while a warm cream paper gradient rises from `34%` to `100%` height, dissolving the photograph seamlessly into archival paper.
2. **Editorial Manifesto Discovery**: Scrolling into Section 2 (`ABOUT ME`) triggers a staggered letter-by-letter rise-and-tilt across `A PASSION FOR ● / TECHNOLOGY AND ● / INNOVATION`, popping open two circular portrait pills with spring overshoot alongside the rotating rust cloud-node emblem and centered personal introduction.
3. **Structured Dossier & Connect**: Entering Section 3 (`MY PROFILE`) reveals a crisp three-column monograph layout (`1180px` max-width) pairing personal details and technical proficiencies on the left, skills, education tables, and Deloitte virtual experience in the middle, and a clip-path-unveiled `2:3` café portrait with scroll parallax on the right—closing with the formal CV declaration and understated `LET'S CONNECT` links.
4. **Interactive Exploration & Guided Tour**: At any scroll depth, visitors can open the `MENU` drawer to jump directly to sections, open `SEARCH` to query terms like `"Python"`, `"CodeChef"`, `"8.5 CGPA"`, or `"Deloitte"`, or toggle the `7 MINUTES` rotating tick badge for a hands-free paced walkthrough. Appending `?rec=1` runs a deterministic `6.5s` timeline for frame-accurate capture.

### Visual Identity & Theme

- **Aesthetic Direction**: Quiet-luxury archival monograph meets documentary portraiture—warm tactile paper, high-contrast Didone capitals, disciplined rust micro-typography, and whisper-thin hairline rules.
- **Color Palette & Mood**:
  - `--background` (`#ECE3D1`): Warm cream archival paper canvas (60% dominant field).
  - `--surface-secondary` (`#E6DCC8`): Subtle secondary paper tone for drawers, search spotlight, and interactive states (30% structural layer).
  - `--foreground` (`#43282A`): Deep brown-plum primary ink; body copy rendered at `72%` opacity (`rgba(67, 40, 42, 0.72)`), structural hairlines at `16%` opacity (`rgba(67, 40, 42, 0.16)`).
  - `--accent` (`#A86438`): Warm terracotta-rust reserved for uppercase section kickers, right-aligned table values, circular seal, and active focus/hover states (10% focal budget).
  - **Paper Grain Overlay**: Fixed viewport-wide inline SVG `<feTurbulence type="fractalNoise">` layer set to `mix-blend-mode: multiply` at `38%` opacity (`pointer-events: none`) for authentic print warmth.
- **Typography & Hierarchy**:
  - **Display Serif**: `Bodoni Moda` variable font (`font-weight: 500`, `font-optical-sizing: none`, `font-variation-settings: "opsz" 11`), all uppercase with refined Didone hairline-to-stem contrast.
    - Hero Headline: `9.6cqw` desktop / `15.6vw` mobile (`line-height: 0.8`, `letter-spacing: 0.01em`).
    - Personal Statement: `clamp(40px, 7.2vw, 132px)` desktop / `8.6vw` mobile (`line-height: 1.06`).
    - Quick Facts Heading: `clamp(34px, 4.25vw, 66px)` desktop / `12vw` mobile, stacked one word per line (`QUICK / FACTS / ABOUT / ME`).
  - **Labels & Body Sans**: `Inter` (`600` weight, `10.5px`, `0.2em` tracking, uppercase for kickers and nav labels; `400`–`500` weight, `13.4px` with relaxed `1.68` leading and constrained `65ch` measure for editorial readability; `tabular-nums` for dates, grades, and percentages).
- **Component Styling & Spatial Math**:
  - **Hero Stage**: `100svh` minimum height, centered title block anchored at `19.2%` from top (`17%` on `≤760px`), subtle warm color grade and contrast scrim ensuring clear legibility over the sunset sky, centered cream bottom pill (`#ECE3D1`) with circular arrow affordance.
  - **Three-Column Dossier Grid**: `max-width: 1180px` centered container with top hairline rule and `1.12fr / 1.12fr / 0.96fr` column proportions on desktop, generous column gutters, and clean vertical stacking on `≤760px` mobile with zero horizontal overflow.
  - **Editorial Tables**: Unboxed rows separated by `1px` hairlines (`16%` ink), deep brown-plum labels on the left, right-aligned rust values on the right, and quiet subject listings beneath each academic milestone.

### Interactive Feedback & Motion

- **Compositor-First Choreography**: Animations strictly target `transform`, `opacity`, `filter`, and `clip-path` using custom editorial easing curves (`cubic-bezier(0.22, 1, 0.36, 1)` and subtle spring overshoot `cubic-bezier(0.34, 1.56, 0.64, 1)` for inline circular pills).
- **Section Reveal Thresholds**: `IntersectionObserver` triggers Section 2 and Section 3 reveals at `~35%` visibility—animating individual split-character spans (`26ms` stagger with `0.55em` lift and `4°` tilt in Section 2; crisp sequential letter and table-row fades in Section 3) alongside the `1.2s` bottom-to-top `clip-path` portrait reveal (`scale 1.25 → 1`).
- **Reduced Motion Accessibility**: When `prefers-reduced-motion: reduce` is active, character blurs, tilts, continuous badge rotation, and scroll-linked parallax gracefully simplify to calm, immediate opacity transitions while keeping all navigation, search, and section links fully operational.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Pure Vanilla HTML, CSS, and JavaScript Without Frameworks**
  - *Chosen Approach*: Author the entire experience in semantic HTML5, modern CSS custom properties/grid/container queries, and modular vanilla JavaScript with zero React runtime or third-party animation libraries.
  - *Why*: Matches your explicit technical specification, eliminates bundle overhead, gives sub-millisecond control over character-splitting DOM nodes, `requestAnimationFrame` scroll math, and the Web Animations API `?rec=1` timeline.
  - *Alternatives Considered*: Framework-based component trees or external GSAP/Lenis scripts were rejected to honor the zero-framework, zero-external-library constraint.

- **Decision 2: Art-Directed Multi-Crop Reuse of Your Two Uploaded Photographs**
  - *Chosen Approach*: Use the horizontal golden-hour waterfront portrait as the full-screen Hero stage (without fabricating a foreground cut-out), use the vertical café window portrait in the Quick Facts `2:3` column, and apply distinct close-up `object-position` focal crops of both images inside the two circular inline pills in Section 2.
  - *Why*: Respects your uploaded photography exclusively without introducing stock imagery or jagged synthetic background removal, while taking advantage of the natural golden sky headroom in the sunset photo so `SAYAMA SHABBIR` reads clearly above your silhouette.
  - *Alternatives Considered*: Automatic client-side background masking was avoided because synthetic cut-outs degrade editorial photo realism and violate the prompt rule against inventing a cut-out when none is supplied.

- **Decision 3: Quiet Luxury Overlays for Menu, Search, and Guided Scroll**
  - *Chosen Approach*: Implement lightweight, paper-toned overlays for `MENU` and `SEARCH` plus a smooth `requestAnimationFrame` auto-scroll controller wired to the `7 MINUTES` rotating 48-tick play badge.
  - *Why*: Ensures every visible control is genuinely functional and helpful for recruiters exploring your CV while preserving the serene, uncluttered magazine layout.
  - *Alternatives Considered*: Static decorative icons were rejected so visitors never encounter dead clicks; heavy modal chrome was avoided in favor of hairline-framed archival overlays.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                     Fixed SVG Fractal-Noise Paper Layer                      │
│                  (mix-blend-mode: multiply · 38% opacity)                    │
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                     Page Stage Wrapper (Native or ?rec=1)                    │
├────────────────────────┬─────────────────────────┬───────────────────────────┤
│   1. HERO CHAPTER      │  2. ABOUT ME CHAPTER    │  3. MY PROFILE CHAPTER    │
│                        │                         │                           │
│ • Top Editorial Nav    │ • "ABOUT ME" Kicker     │ • 3-Col Grid (1180px max) │
│   (Menu · Brand · Srch)│ • Split-Char Statement  │   ├─ Left: Title, 48-Tick │
│ • Sunset Stage Photo   │   + 2 Circular Photo    │   │  Badge, Personal &    │
│   (Scale 1.06 → 1.0)   │   Pills (Spring + Zoom) │   │  Tech Proficiency     │
│ • Eyebrow & 95ms       │ • 66px Double-Ring Rust │   ├─ Mid: Skills,         │
│   Blur-Rise Letters    │   Cloud-Node Emblem     │   │  Education Tables,    │
│ • "Explore My Journey" │ • CV Editorial Intro    │   │  Deloitte Experience  │
│   Scroll Pill          │   Prose                 │   └─ Right: 2:3 Café      │
│ • Paper Melt Gradient  │                         │      Portrait (Clip+Parlx)│
│                        │                         │ • Declaration & Connect   │
└───────────┬────────────┴────────────┬────────────┴─────────────┬─────────────┘
            │                         │                          │
            ▼                         ▼                          ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                   Vanilla JS Choreography & UI Engine                        │
├────────────────────────┬─────────────────────────┬───────────────────────────┤
│  Motion & Scroll Loop  │  Interactive Affordances│  Deterministic ?rec=1     │
│ • Grapheme Letter Split│ • Menu Chapter Drawer   │ • 6.5s Web Animation API  │
│ • IntersectionObserver │ • Live CV Search Index  │   keyframe translation    │
│   (35% threshold)      │   & Smooth Highlight    │ • Scheduled reveals at    │
│ • RAF Hero Drift/Blur  │ • 7-Min Guided Scroll   │   0s, 2.65s, and 4.85s    │
│   & Portrait Parallax  │   Tour (Play/Pause)     │ • Matrix Y scroll reader  │
└────────────────────────┴─────────────────────────┴───────────────────────────┘
```

### Data Model & State

- **Semantic CV Content**: All CV records—Personal Statement, Personal Details (DOB, Gender, Nationality, Languages), Technical Proficiency (`Python`, `C++`, `HTML5`, `CSS`), Skills (`Data Analysis`, `Frontend Dev`, `Competitive Programmer`), Academic Qualifications (`B.Tech Sem 1` 8.5 CGPA, `CBSE Class 12th` 71%, `CBSE Class 10th` 81.4% with full subject lists), Work Experience (`Deloitte Forage`), Declaration, and Contact details—live directly in accessible semantic HTML (`<header>`, `<main>`, `<section>`, `<dl>`, `<article>`, `<footer>`) so content is immediately present in the DOM.
- **Client UI State**: Lightweight vanilla JS state object tracking:
  - `activeOverlay`: `'none' | 'menu' | 'search'`
  - `searchQuery`: current filter string matched against an indexed array of DOM-linked CV entries
  - `isGuidedTourPlaying`: boolean controlling the `7 MINUTES` play/pause icon and smooth RAF scroll progression
  - `isRecorderMode`: boolean parsed from `URLSearchParams('?rec=1')`
  - `revealedSections`: set tracking triggered chapter entrances

### Interactive Component & State Mapping

- **Top Navigation `MENU` Button**: Toggles `activeOverlay = 'menu'`, trapping keyboard focus inside an archival slide-down sheet with numbered chapter links (`01 Hero`, `02 About Me`, `03 Quick Facts`, `04 Declaration & Connect`) and direct contact links; closes on link selection, backdrop click, or `Escape`.
- **Top Navigation `SEARCH` Button**: Toggles `activeOverlay = 'search'`, focusing a clean underline input that filters indexed CV records in real time; selecting any match closes the sheet, smoothly scrolls to the target row/block, and pulses a warm rust highlight border for `1.6s`.
- **Hero `EXPLORE MY JOURNEY` Pill**: Smoothly scrolls the viewport to Section 2 (`ABOUT ME`) while respecting `prefers-reduced-motion`.
- **Quick Facts `7 MINUTES` Play Badge**: Toggles `isGuidedTourPlaying`; swaps the center SVG triangle to pause bars, accelerates subtle tick feedback, and glides smoothly through the remaining portfolio height with automatic stop on user wheel/touch/key scroll or completion.
- **Contact Links (`LET'S CONNECT`)**: Semantic `mailto:`, `tel:`, and external LinkedIn anchor (`rel="noopener noreferrer"`) styled with subtle animated hairline underlines.

### Key Sequences & Integrations

- **Unified Scroll & Recorder Calculation (`requestAnimationFrame`)**:
  - In standard mode, the RAF tick reads `window.scrollY` whenever scroll position changes:
    - Hero stage translates downward at `0.32 × scrollY`, background blurs up to `6px` (`min(1, scrollY / (0.6 * vh)) * 6`), and the warm paper gradient expands from `34%` to `100%` height reaching full opacity by `60%` of one viewport scroll.
    - Quick Facts portrait translates along Y within `±7%` proportional to Section 3's viewport intersection progress.
  - In `?rec=1` mode, native scrolling is locked and the document stage animates via `Element.animate()` over `6500ms` with exact keyframe offsets (`0`, `0.30` [1.95s], `0.5154` [3.35s], `0.6538` [4.25s], `0.8538` [5.55s], `1.0` [6.5s]), firing deterministic section reveals at `0ms`, `2650ms`, and `4850ms` while feeding the live computed `DOMMatrix` Y-translation into the exact same hero-melt and portrait-parallax math.
