# DESIGN.md — Cupertino Daylight Editorial
**Design Paradigm:** Apple Human Interface / Editorial Light Mode  
**Anti-Goals (Zero AI Slop):** No dark-mode neon purple/cyan glows, no muddy mesh gradients, no floating 3D blobs, no unreadable low-contrast gray text.

## 00. Three Dials (antislop R-568)
| Dial | Value | Reason |
|------|-------|--------|
| **ENERGY** | 2 (Balanced) | Confident editorial voice; clean Apple-inspired clarity without being sterile or overwhelming. |
| **RHYTHM** | 2 (Balanced) | Consistent grid structure with deliberate breaks: flagship card leads, portrait badge sits asymmetrically. |
| **MOTION** | 2 (Balanced) | Hover transitions and subtle card lifts only; no parallax, pinning, or choreography. |

---


## 01. Narrative Architecture (Strict 3-Act Flow)
1. **Act I — Me (`#me`):** Personal identity first. Features a clean floating pill navbar (`1120px` max-width), an editorial headline introducing Satyam Chaturvedi, a live availability badge, and a **Navbar-Wide Panoramic Portrait Frame** (`100%` of the `1120px` container width) with `28px` vivid-bordered rounded corners.
2. **Act II — What I Do (`#what-i-do`):** A 3-column Apple Bento grid breaking down core engineering capabilities: Multi-Agent Systems, Hybrid RAG Pipelines, and Systems & Inference Engineering.
3. **Act III — Projects (`#projects`):** Product-grade showcase starting with the full-width Flagship card (**CFOBuddy**) followed by a 2-column symmetric showcase (**AssessQ** and **ColCommute**).

---

## 02. Color Tokens (Vivid Daylight Palette)
Designed primarily for daylight clarity, with an optional high-craft dark mode toggle.

| Token | Value (Light — Default) | Role |
| :--- | :--- | :--- |
| `--bg-canvas` | `#F5F5F7` | Warm Apple Alabaster page background |
| `--bg-card` | `#FFFFFF` | Pure crisp white elevated card surface |
| `--bg-subtle` | `#EFEFF4` | Secondary pill & tag background |
| `--text-primary` | `#1D1D1F` | Deep Cupertino Obsidian for headlines & body lead |
| `--text-secondary` | `#515154` | Balanced Graphite for readable descriptions |
| `--text-muted` | `#86868B` | Precision metadata and index labels |
| `--accent-vivid` | `#0071E3` | Apple Cobalt Blue for primary CTAs & active borders |
| `--accent-vivid-hover` | `#0077ED` | Brightened interactive blue state |
| `--accent-warm` | `#F56300` | Keynote Ultra Orange for Flagship badges & corner accents |
| `--accent-emerald` | `#1D9E34` | Live status indicator green |
| `--border-hairline` | `rgba(29, 29, 31, 0.08)` | Subtle structural card keyline |
| `--border-vivid` | `rgba(0, 113, 227, 0.28)` | Vivid optical ring on featured cards & portrait |

---

## 03. Corner Geometry & Elevation
* **Continuous-Feel Rounded Corners:**
  * `--radius-xl: 28px` — Navbar-wide portrait frame, Flagship project showcase, and modal dialog.
  * `--radius-lg: 22px` — "What I Do" Bento cards and secondary project cards.
  * `--radius-md: 14px` — Inner media frames and highlight callouts.
  * `--radius-pill: 980px` — Top navigation bar, buttons, and tech badges.
* **Vivid Corner Framing:** Featured containers use a crisp `1px` outer border paired with a `4px` subtle optical halo (`box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.06), 0 12px 32px rgba(29, 29, 31, 0.06)`) so rounded corners pop cleanly against `#F5F5F7`.

---

## 04. Typography & Scale
* **Primary Sans (`--font-sans`):** `'Inter'`, `-apple-system`, `BlinkMacSystemFont`, `'SF Pro Display'`, sans-serif. Tight optical tracking (`-0.03em` on headings) with generous line-height on body copy (`1.6`).
* **Technical Mono (`--font-mono`):** `'JetBrains Mono'`, `'SF Mono'`, monospace. Used sparingly for stack pills, index numbers, and architecture tags.

---

## 05. Navbar-Wide Hero Portrait Spec
* **Alignment:** Must match `.container` (`max-width: 1120px`) edge-to-edge so its left and right rounded corners align vertically with the navbar above it.
* **Aspect Ratio:** `21 / 9` on desktop (`16 / 10` on mobile) with `object-fit: cover` and customizable `object-position` so the subject stays framed like an Apple executive/designer profile banner.
* **Caption Overlay:** Floating bottom-left pill badge inside the portrait frame displaying location and live status.