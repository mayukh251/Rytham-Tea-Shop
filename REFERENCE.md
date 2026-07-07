# Technical Reference Manual — Rhythm Tea Co.

This document serves as the developer reference for maintaining, updating, and optimizing the **Rhythm Tea Co.** prebiotic wellness web application.

---

## 📂 Architecture & File Structure

The project is structured as a standard single-page application (SPA) built using **React 19**, **TypeScript 6**, **Vite 8**, and **Tailwind CSS v4**.

* `/public`
  * `/images` — Contains the 6 product cards JPEGs (Darjeeling, Assam, Nilgiri, Masala, Kahwa, Kangra).
  * `/seq` — 192 image sequence files (`00001.jpg` through `00192.jpg`) utilized for the scroll-controlled animation background.
  * `/videos` — Contains the scenic looping science panel video `tea_cup_shot.mp4`.
* `/src`
  * `main.tsx` — Application entry point mounting `App.tsx`.
  * `index.css` — Global stylesheets containing Tailwind v4 imports, Google Fonts, theme variables, and custom backdrop filter styles.
  * `App.tsx` — Core container managing global state (Cart drawer toggle, Quiz overlay toggle, Cart items list) and structural layout sections.
  * `/components`
    * `PromoBanner.tsx` — Automated announcement slider.
    * `Navbar.tsx` — Sticky header displaying navigation links and live cart item count.
    * `Hero.tsx` — Split landing page setting the scroll track height (`220vh`) and overlaying typography panels.
    * `ScrollSequence.tsx` — Controls background image sequence preloading, scroll listeners, and canvas rendering.
    * `TeaJarGraphic.tsx` — Card visualizer displaying full-bleed JPEGs or rendering vector jar SVGs as fallback.
    * `SciencePanel.tsx` — Gut-brain axis signal columns paired with the looping video visualizer.
    * `Quiz.tsx` — Profiler questionnaire calculating personalized tea matches.
    * `IngredientDeepDive.tsx` — Botanical directory displaying third-party verified laboratory specifications.
    * `CartDrawer.tsx` — Slide-out drawer managing checkout quantities, subscription pricing, and promo codes.

---

## 🌀 Pinned Scroll Sequence Mechanics

The hero scroll sequence is optimized for zero lag and fluid framerate control:

```
+---------------------------------------------------------+
|                  Hero Section (220vh)                   |
|                                                         |
|  +---------------------------------------------------+  |
|  |             Sticky Container (100vh)              |  |
|  |                                                   |  |
|  |   [Canvas Background: Preloaded Sequence Frames]   |  |
|  |                                                   |  |
|  |   +-------------------+   +-------------------+   |  |
|  |   | Apothecary Panel  |   | Spec Record Tag   |   |  |
|  |   | (Shifted Left)    |   | (Shifted Right)   |   |  |
|  |   +-------------------+   +-------------------+   |  |
|  |                                                   |  |
|  +---------------------------------------------------+  |
|                                                         |
+---------------------------------------------------------+
```

1. **Pinning Wrapper**: A parent section `h-[220vh]` acts as the scroll track. Inside it, a sticky container (`sticky top-0 w-full h-screen`) locks the viewport.
2. **Preloading**: `ScrollSequence.tsx` preloads all 192 JPEGs into an in-memory cache upon component mount. This prevents flickering or flashing.
3. **Canvas Drawing**: Instead of heavy DOM nodes, the sequence is drawn to a single full-bleed `<canvas>` element.
4. **Scroll Interpolation**: A `scroll` listener tracks `window.scrollY` relative to the scroll track height. It maps the scroll percentage to frame index `0` to `191` and triggers `ctx.drawImage` to paint the active frame:
   ```typescript
   const frameIndex = Math.min(
     numFrames - 1,
     Math.floor((scrollTop / (maxScrollVal)) * numFrames)
   );
   ```

---

## 🎨 Design System & CSS Tokens

Theme variables are defined in [index.css](file:///c:/Users/mayuk/Desktop/DEX/Dev/ridom%20web%202/src/index.css) using Tailwind v4 custom properties:

```css
:root {
  --surface-page-canvas: #fcfcf7;    /* Cream background (Snow White) */
  --color-forest-depths: #1c3a13;    /* Deep green core */
  --color-snow-white: #fcfcf7;       /* Off-white */
  --color-lime-pulse: #d3fa99;       /* Active green */
  --color-sage-moss: #757c5d;        /* Sage accent */
  --color-olive-gold: #9f995b;       /* Gold accent */
  --color-eucalyptus: #698e79;       /* Teal/Eucalyptus */
  --color-warm-stone: #eeeee9;       /* Light gray border/background */
  --color-frosted-glass: #c4c7c4;    /* Translucent gray */
  --color-pewter: #666666;           /* Text gray */
}
```

* **No Shadows Policy**: Visual depth is generated exclusively via high contrast borders (`border-[var(--color-warm-stone)]`) or background opacities (e.g. `bg-[rgba(28,58,19,0.75)]`).
* **Interactivity Roundedness**: All interactive buttons, badges, and inputs utilize `rounded-[1000px]` (capsule style).
* **Backdrop Filters**: Apothecary panels use `apothecary-glass` utility adding `backdrop-blur-md bg-[rgba(252,252,247,0.85)]` for a premium glassmorphic overlay.

---

## 📦 Indian Tea Product Catalog Specifications

| Code | Name | Variant | Base Price | Clinical Axis | Active Constituents |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `DJ-01®` | Darjeeling Tea | `darjeeling` | $46.00 | Microvascular | Epicatechins, Terpenoids |
| `AS-02™` | Assam Tea | `assam` | $38.00 | Metabolic Motility | Theaflavins, Tannins |
| `NL-03™` | Nilgiri Tea | `nilgiri` | $36.00 | Cardiovascular Ease | Brisk Catechins, Minerals |
| `MS-04®` | Masala Tea Blend | `masala` | $40.00 | Thermogenic Gut | Gingerol, Cardamom Terpenes |
| `KW-05™` | Kashmiri Kahwa | `kahwa` | $44.00 | Serotonergic Brain | Crocin, Safranal, L-Theanine |
| `KN-06™` | Kangra Tea | `kangra` | $42.00 | Cytokine Defense | Immune Catechins, Chlorophyll |

---

## 🔬 Monograph Directory Details

Clicking any tea in the botanical directory renders its clinical profile:
* **Extraction Ratio**: Specifies orthodox grade vs. concentrated water/vacuum extraction.
* **Lab Specs**: Displayed in monospace, detail-oriented tables:
  * EGCG and Catechin density in milligrams.
  * Antioxidant indexes measured in ORAC units.
  * Volatile oil core weights and solubility values.

---

## 🛒 Checkout & Cart Calculation Logic

Cart pricing applies strict business rule orders:

$$\text{Subtotal} = \sum \left( \text{Item Price} \times \text{Quantity} \right)$$
* If an item is marked as a `Subscription`, its unit price receives a **15% discount** automatically.
* **Promo Code**: Entering `BOTANICAL` deducts an additional **10% discount** off the active subtotal.
* **Complimentary Item**: Adding any subscription triggers a automatic zero-dollar complimentary item: `Complimentary Embossed Shaker Cup`.
* **Shipping**: Environmental shipping is free for subtotals over `$75.00` (otherwise `$4.99`).

---

## ⚙️ Build and Production Deployment

To ensure the project builds correctly on Vercel:
* **Pre-Compilation Check**: Always run `npm run build` locally. The build runs `tsc -b` to run type-checking followed by `vite build` to bundle.
* **Output Path**: Bundled files are outputted to `/dist` directory.
* **Vite Config**:
  * Integrates `@tailwindcss/vite` plugin.
  * Sets root path resolution correctly for assets.
