# MUSA Website

Status: Ready
Created time: May 21, 2026 1:53 PM
Last edited time: May 21, 2026 3:41 PM
Last edited by: Paksi Yudha Sasmita

> **Version:** 1.0 | **Date:** 2026-05-21 | **Author:** Paksi | **Status:** Draft
> 

---

# PRD: MUSA Green Website Rebuild (V3.0)

## 1. Summary

Rebuild [musagreen.com](http://musagreen.com) from a WordPress site into a clean, static multi-page HTML site (15 pages). The new site presents MUSA Green's Industrial Digital Twin platform and IoT/ESG solutions to two target audiences: industrial estate managers (kawasan) and HSE/environment teams inside factories. 

## 2. Problem Statement

**User problem:** The current WordPress site is slow, hard to maintain, and blends products and solutions without clear separation. To improve the website performance to be more interactive and easily updated with AI Tools, a new website is needed, bypassing WordPress to go to direct HTML and JavaScript. 

**Evidence:** The existing site frequently broke due to Elementor-WordPress issues. Plus, visually, no structured product/solution hierarchy for B2B buyers doing procurement research.

---

## 3. Target Users

- **Primary:** Industrial estate managers (kawasan) - evaluating the platform for deployment across multiple tenant factories
- **Secondary:** HSE / Environment managers inside individual factories - assessing regulatory compliance tooling
- **Environment:** Desktop-first B2B browsing; buyers at mid-to-large industrial companies in Indonesia; English-language procurement research

---

## 4. Goals

- Consolidate all MUSA products and solutions into one unified, fast-loading static site
- Position MUSA as a complete Industrial Digital Twin platform which provides multi-environmental compliance and parameter solutions, both software and hardware.
- Automate the content changes and post updates on the website via AI Agent.

---

## 5. Success Metrics / KPIs

| Metric | Target | Timeframe | Result | Status |
| --- | --- | --- | --- | --- |
| All 15 pages live, no broken links | 100% pass | Before Launch |  | [Success/Failed] |
| Mobile-responsive across all pages | 100% pass | Before launch |  | [Success/Failed] |
| Web Traffice Increase | 50% MoM | After Launch |  | [Success/Failed] |
| Page load time (p95) | Under 2s | After Launch |  | [Success/Failed] |
| Top Searchable Item on Website | Top 3 On List | After Launch |  | [Success/Failed] |

---

## 6. Non-Goals

- **Out of scope:** Indonesian-language content (English only for V3.0)
- **Out of scope:** Pricing or e-commerce on any page
- **Excluded:** Lead capture forms beyond simple contact links (email / WhatsApp)
- **Excluded:** Live data feeds or embedded platform demos

---

## 7. User Journeys

1. User lands on homepage via search or referral.
2. User reads hero headline, tagline and portfolio, confirms relevance and convinced. 
3. User scans the solution cards - recognises SISPEK, SPARING, ISPU compliance needs.
4. User clicks the compliance related to their interest to read the solution detail page.
5. User returns and browses Products — clicks MUSA Integrator, then MUSA View
6. User clicks "Get Started →" and initiates contact via email or WhatsApp.

---

## 8. Functional Requirements

| Item | Requirement |
| --- | --- |
| Home Page Hero | Hero must render an interactive **Three.js 3D scene** depicting an industrial site Digital Twin. |
| CSS Styling | All pages must share a single `style.css` design system with CSS custom properties. |
| Navigations | Navigation must include CSS-only dropdown menus for Solutions, Products, and Article |
| Styling | All pages must load Open Sans from Google Fonts and Font Awesome 5.15.4 icons from CDN. |
| Icon | All icon elements must use Font Awesome `<i>` tags — no emoji characters. |
| Template Home | The homepage must include: hero, Trust Bars, Stats row,  Solutions, Why us, How it works, Industries, CTA |
| Template Solution | Each solution page must include: page hero with breadcrumb, overview section, benefits, feature grid, process steps, related products, CTA. |
| Template Product | Each product page must include: page hero, feature list, technical specs, related solutions, CTA. |
| Web Rendering | The site must be fully static — no server-side rendering, no build tools required. |
| Responsive | All pages must be mobile-responsive using CSS Grid / Flexbox. |
| Footer | Footer must include 4 columns: brand, solutions, products, contact. |

*Home Page Hero:  Scene requirements: (1) 3D factory/industrial estate model with animated emission stacks, water discharge points, and ambient air quality zones rendered as particle systems or volumetric fog in pollution colours (red/orange/yellow gradients based on severity); (2) real-time-style sensor pulse animations on monitoring nodes; (3) slow auto-rotation with mouse-parallax interaction on hover; (4) overlay HUD elements (mini stat badges) showing live-style environmental parameter labels (e.g. PM2.5, COD, CO₂); (5) scene must be self-contained in a single `hero3d.js` file using Three.js r128 from CDN. No WebGL fallback required — desktop-first audience.

---

## 9. Non-Functional Requirements

| Category | Requirement |
| --- | --- |
| Performance | p95 page load under 2s on a standard connection; no render-blocking resources |
| Reliability | Pure static HTML/CSS — no runtime dependencies beyond CDN fonts and icons |
| Security | No forms that submit data; contact links use `mailto:` and WhatsApp `wa.me/` |
| Usability | Zero onboarding required; navigation accessible without JavaScript |
| Accessibility | All images must have `alt` attributes; color contrast meets WCAG AA |
| Maintainability | All shared styles in one `style.css`; no inline styles in HTML files |

---

## 10. Site Structure

15 core static pages. Article posts are additional pages published incrementally by the team.

| # | Page | URL | Template |
| --- | --- | --- | --- |
| 1 | Home | `/index.html` | Home |
| 2 | Solutions Hub | `/solutions/index.html` | Solutions Hub |
| 3 | Air Emission Monitoring | `/solutions/air-emission-monitoring.html` | Solution Detail |
| 4 | Wastewater Monitoring | `/solutions/wastewater-monitoring.html` | Solution Detail |
| 5 | Air Quality Monitoring | `/solutions/air-quality-monitoring.html` | Solution Detail |
| 6 | Carbon Accounting | `/solutions/carbon-accounting.html` | Solution Detail |
| 7 | Sustainability Report | `/solutions/sustainability-report.html` | Solution Detail |
| 8 | Water Assessment | `/solutions/water-assessment.html` | Solution Detail |
| 9 | Products Hub | `/products/index.html` | Products Hub |
| 10 | MUSA Integrator | `/products/musa-integrator.html` | Product Detail |
| 11 | MUSA Data Management | `/products/musa-data-management.html` | Product Detail |
| 12 | MUSA View | `/products/musa-view.html` | Product Detail |
| 13 | MUSA Assistant | `/products/musa-assistant.html` | Product Detail |
| 14 | Articles | `/articles/index.html` | Articles Index |
| 15 | About Us | `/about.html` | About |

**Article posts** (beyond 15 core): `/articles/{slug}.html` — individual project write-ups and general information posts, created incrementally by the team.

**Navigation dropdowns:** Solutions menu → pages 3–8 | Products menu → pages 10–13 | Articles → page 14

## 10b. Product–Solution Architecture

All MUSA products work together as an end-to-end pipeline. Every solution (Section 12) is delivered through this same stack:

```
Onsite Sensor (custom hardware, spec'd per client requirement)
    ↓
MUSA Integrator  —  On-site Data Logger in Mini PC
                     Protocols: Modbus, REST API, MQTT, LoRa, Satellite
    ↓
MUSA Data Management  —  Cloud or On-Premise Server (per client requirement)
                          Centralised environmental, energy & operations warehouse
    ↓
MUSA View  —  All-in-One Platform
              Monitor · Model · Analyse · Environmental & Energy Digital Twin
    ↓
MUSA Assistant  —  Chat / Email interface
                   Notifications + Personalised AI Agent
```

Every solution page must reference this pipeline and indicate which layer(s) are most prominent for that solution.

---

## 11. Products

| Product | Key Capability |
| --- | --- |
| MUSA Integrator | On Site Data Logger: Connects all sensors/instruments; device health monitoring; predictive maintenance. Protocols: Modbus, REST API, MQTT, LoRa, satellite |
| MUSA Data Management | Centralised data warehouse: Connect all the environmental, energy, and operations data in single data warehouse.  |
| MUSA View | BI dashboards for environmental performance; compliance monitoring; embeddable Environmental Performance Reports (EPR) |
| MUSA Assisstant | Personalized AI Agent: Assisst your day to day needs with chatbot where you can ask and analyze anything.  |

---

## 12. Solutions

| Solution | Regulation | Description |
| --- | --- | --- |
| Air Emission Monitoring | SISPEK | Stack emission CEMS; automated KLHK reporting |
| Wastewater Monitoring | SPARING | Continuous water quality monitoring at discharge points |
| Air Quality Monitoring | ISPU | 3-stage: Dispersion Study + AQMS Installation + Air Digital Twin platform |
| Carbon Accounting | CDP | Scope 1/2/3 GHG tracking and CDP reporting |
| Sustainability Report | GRI, PROPER | Automated GRI-aligned report generation |
| Water Assessment | WRA | Water risk, efficiency assessment, management blueprint |

---

## 13. Design System

| Token | Value |
| --- | --- |
| Primary color | `#3FB1A4` (teal) |
| Dark background | `#062F41` |
| Light background | `#DEEBE7` |
| Font | Open Sans (300–800) |
| Icons | Font Awesome 5.15.4 Free |
| Border radius | 12px |
| Base font size | 16px |

---

## 14. Key Stats (Homepage Strip)

- +90 monitoring sites
- +20 sustainability platforms
- +30 environmental reports
- +50 companies served

---

## 15. SEO Strategy

### 15a. AI-Optimised Search (Google AIO Guide)

All pages must follow Google's AI Optimisation guidance to be surfaced in AI Overviews and Search Generative Experience:

| Requirement | Implementation |
| --- | --- |
| Clear, structured content hierarchy | Semantic HTML5 (`<article>`, `<section>`, `<main>`); one `<h1>` per page, logical `<h2>`/`<h3>` nesting |
| Authoritative entity signals | Every page includes structured data (`JSON-LD`): `Organization`, `WebPage`, `Product`, or `Article` schema as appropriate |
| Factual, citation-ready copy | Each solution page cites the specific Indonesian regulation (SISPEK, SPARING, ISPU, CDP, GRI, WRA) by full name and regulation number where available |
| E-E-A-T signals | About page includes company founding year, team credentials, client count stats; case study articles demonstrate real-world experience |
| Crawlability | `sitemap.xml` generated for all 15 core pages + article posts; `robots.txt` permits all crawlers; no JS-gated content on core pages |
| Page speed | Images compressed to WebP; CSS/JS minified; CDN-only for fonts and icons; target p95 load < 2s |
| Mobile-friendly | All pages pass Google Mobile-Friendly Test before launch |
| Internal linking | Each solution page links to ≥ 2 related product pages; each product page links to ≥ 2 relevant solutions; articles link to relevant solution/product pages |

### 15b. Target Keywords

Focus: Indonesia and Southeast Asia industrial/environmental compliance market.

| Cluster | Primary Keywords | Secondary / Long-tail |
| --- | --- | --- |
| Digital Twin | `digital twin industri Indonesia`, `industrial digital twin platform` | `digital twin pabrik`, `digital twin kawasan industri` |
| Air Emission | `SISPEK monitoring`, `CEMS Indonesia`, `pemantauan emisi cerobong` | `sistem pemantauan emisi udara otomatis`, `laporan KLHK otomatis` |
| Wastewater | `SPARING monitoring`, `pemantauan air limbah`, `continuous water quality monitoring Indonesia` | `monitoring kualitas air real-time pabrik` |
| Air Quality | `ISPU monitoring`, `air quality monitoring station Indonesia`, `AQMS Indonesia` | `pemantauan kualitas udara ambien`, `air digital twin` |
| Carbon | `carbon accounting Indonesia`, `Scope 1 2 3 GHG Indonesia`, `CDP reporting Indonesia` | `perhitungan emisi karbon industri` |
| Sustainability | `laporan keberlanjutan GRI`, `PROPER reporting Indonesia`, `ESG platform Indonesia` | `sustainability report otomatis`, `GRI reporting software` |
| Water | `water risk assessment Indonesia`, `water efficiency industrial` | `manajemen air kawasan industri` |
| Platform | `environmental monitoring platform Indonesia`, `IoT environmental sensor Indonesia` | `platform ESG industri`, `monitoring lingkungan industri IoT` |

**Meta title pattern:** `[Page Topic] | MUSA Green — Industrial Digital Twin Indonesia`

**Meta description pattern:** max 155 chars, includes primary keyword + regulation name + clear value prop.

---

## 16. Articles

### Purpose

Project write-ups and general environmental/regulatory information. Functions as both an SEO content channel and a trust signal (proof of real deployments).

### Content Types

- **Project Stories:** Documenting completed MUSA deployments — client industry, solution applied, outcomes. Published per project completion.
- **Regulatory Guides:** Plain-language explainers on SISPEK, SPARING, ISPU, GRI, etc. for Indonesian industrial managers.
- **Platform Updates:** New features in MUSA View, MUSA Assistant, MUSA Integrator.

### Workflow

1. MUSA team drafts key facts, project details, or update notes.
2. Content is refined via **MUSA Agent on OpenClaw (Telegram)**.
3. Final HTML article file is created from the Article template and placed in `/articles/`.

### Article Template Requirements

Each article page must include: page title (`<h1>`), publication date, author, article body with semantic headings, related solution/product links, CTA strip, and `Article` JSON-LD structured data for SEO.

### *Web References:

1. Current MUSA Website: [https://www.musagreen.com/](https://www.musagreen.com/)
2. Carbon Accounting: https://greenly.earth/en-gb
3. Router: https://www.meter.com/?ref=uiuxshowcase.com
4. GIS : [https://braga.co.id/](https://braga.co.id/)