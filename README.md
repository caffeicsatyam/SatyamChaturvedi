# Satyam Chaturvedi | Technical Portfolio

A technical portfolio for Satyam Chaturvedi (@caffeicsatyam), AI/ML Systems Engineer specializing in Multi-Agent Systems and RAG Architectures.

Built to the Technical Brutalism / Swiss Engineering Datasheet specification (see DESIGN.md): monochrome contrast, exposed 1px structural grid lines, tabular layouts, and raw engineering terminology. No decorative gradients, blurs, glassmorphism, or artificial UI chrome.

## Sections

1. Overview - role, location, blunt summary, link to Selected Work.
2. Tenets - three engineering tenets: deterministic agent orchestration, mathematical design precision, verifiable evidence over hype.
3. Selected Work - CFOBuddy flagship ledger row plus curated AssessQ and ColCommute project cards with real tech stacks.
4. Contact - GitHub, copy email, portfolio source link.

## Design tokens

Dark theme (default) and light theme. All text pairings exceed 4.5:1 WCAG AA contrast. 0px border radius, no box-shadow, no backdrop-filter, no decorative glow.

## Local Development

Serve locally using any static web server:

python -m http.server 8000

Open http://localhost:8000 in your browser.

## Verification

Run the automated audit test suite:

python tests/test-audit.py

Checks verified:
- Zero em dashes across HTML, JS, and CSS source (R-02).
- WCAG AA color contrast (>= 4.5:1 normal text) across both themes (R-25).
- Semantic HTML landmarks, required metadata, image alt text and dimensions, and modal keyboard/focus handling checks (R-26, R-32, R-39).
- Responsive mobile rules, 44px minimum tap targets, fluid clamp typography, prefers-reduced-motion (R-03, R-32, R-39).
- Internal anchor integrity: every navigation link resolves to a valid ID (R-24).
- Zero fabricated marketing buzzwords or statistics (R-16, R-17).

## License

MIT (c) 2026 Satyam Chaturvedi (@caffeicsatyam)
