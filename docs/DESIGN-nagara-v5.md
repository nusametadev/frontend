---
version: alpha
name: Nagara-design-system
description: "DESIGN.md for Nagara ($NGRX) — a blockchain-based financial platform. Colors, Typography, Components, and Layout Rules."

colors:
  # Brand & Accent
  navy-500: "#071b4d"
  gold-500: "#c58b12"
  gold-400: "#d1a241"
  purple-500: "#4b22b8"
  purple-600: "#3c1b93"
  purple-300: "#937ad4"
  purple-200: "#b7a7e3"
  purple-100: "#dbd3f1"
  green-500: "#178a45"
  light-green-400: "#45a16a"
  light-green-100: "#d1e6da"
  cyan-blue-500: "#0f84d8"
  baby-blue-500: "#eef5ff"

  # Surface
  surface-light-1: "#f8f4ee"
  surface-light-2: "#e8d1a0"
  surface-light-3: "#f1e9dd"
  surface-muted-light: "#dcc9a9"
  surface-dark-1: "#04102e"
  surface-dark-3: "#06163e"
  surface-dark-4: "#9ca4b8"
  surface-muted-dark: "#6a7694"

  # Text & Hairlines
  ink-black: "#000000"
  ink-white: "#ffffff"
  muted-text-light: "#aea494"
  hairlines-light: "#b0a187"
  muted-text-dark: "#45494c"
  hairlines-dark: "#747779"

typography:
  hero-display: { fontFamily: Aventa, fontSize: 88px, fontWeight: Black, lineHeight: 100%, letterSpacing: -0.37px }
  display-lg:   { fontFamily: Aventa, fontSize: 64px, fontWeight: Black, lineHeight: 72px,  letterSpacing: -0.5px }
  display-md:   { fontFamily: Aventa, fontSize: 56px, fontWeight: Black, lineHeight: 64px,  letterSpacing: 0.37px }
  display-sm:   { fontFamily: Aventa, fontSize: 32px, fontWeight: Black, lineHeight: 40px,  letterSpacing: 0.37px }
  button-lg:    { fontFamily: Aventa, fontSize: 24px, fontWeight: Black, lineHeight: 28px,  letterSpacing: -0.5px }
  button-md:    { fontFamily: Aventa, fontSize: 14px, fontWeight: Black, lineHeight: 20px,  letterSpacing: 0.37px }
  button-sm:    { fontFamily: Aventa, fontSize: 12px, fontWeight: Bold,  lineHeight: 16px,  letterSpacing: 0.37px }
  title-lg:     { fontFamily: Helvetica, fontSize: 32px, fontWeight: Bold, lineHeight: 40px, letterSpacing: 0.37px }
  title-md:     { fontFamily: Helvetica, fontSize: 24px, fontWeight: Bold, lineHeight: 28px, letterSpacing: 0.37px }
  title-sm:     { fontFamily: Helvetica, fontSize: 14px, fontWeight: Bold, lineHeight: 20px, letterSpacing: 0px }
  body-md:      { fontFamily: Helvetica, fontSize: 16px, fontWeight: Regular, lineHeight: 20px, letterSpacing: 0px }
  body-sm:      { fontFamily: Helvetica, fontSize: 14px, fontWeight: Regular, lineHeight: 20px, letterSpacing: 0px }
  caption:      { fontFamily: Helvetica, fontSize: 12px, fontWeight: Regular, lineHeight: 16px, letterSpacing: 0px }
  caption-uppercase: { fontFamily: Helvetica, fontSize: 12px, fontWeight: Regular, lineHeight: 16px, letterSpacing: 0px, textTransform: uppercase }
  nav-link:     { fontFamily: Helvetica, fontSize: 12px, fontWeight: Bold, textDecoration: underline, lineHeight: 16px, letterSpacing: 0px }

spacing:
  xxs: 8px
  xs: 16px
  s: 24px
  ms: 32px
  m: 40px
  ml: 48px
  l: 64px
  xl: 72px
  sections: 140px

radius:
  buttons: 8px
  forms-cta-chips-cards: 16px
  section-cards: 32px
  badges-dropdown-icon: 9999px   # fully rounded / pill
---

## Overview

Nagara ($NGRX) is a blockchain-based financial platform with a bold color scheme. The combination of navy, warm cream, and green as the main CTA color creates a clear visual hierarchy and action-oriented UI. All contrast and elevation are achieved through solid color blocks — there is no gradient anywhere in the system. Purple is reserved specifically for Web3 and token-related content.

## Colors

### Brand & Accent
- **Navy** (`{colors.navy-500}` — #071b4d): Main color for headline text, banner surface color, graphic element, and highlighted card surface in dark mode.
- **Gold** (`{colors.gold-500}` — #c58b12): Secondary color for headline text, graphic element, and hover state surface color for CTAs in light mode.
- **Purple** (`{colors.purple-500}` — #4b22b8): For Web3 elements in light mode — tokens, marketplace, supply.
- **Green** (`{colors.green-500}` — #178a45): All primary CTAs, successful status, and approval in light mode.
- **Cyan Blue** (`{colors.cyan-blue-500}` — #0f84d8): Can be used for graphic elements.
- **Baby Blue** (`{colors.baby-blue-500}` — #eef5ff): Can be used for graphic elements.

### Surface
- **Surface Light 1** (`{colors.surface-light-1}` — #f8f4ee): Default page surface, available filling form, secondary button surface — light mode.
- **Surface Light 2** (`{colors.surface-light-2}` — #e8d1a0): Surface color for banners or page sections — light mode.
- **Surface Light 3** (`{colors.surface-light-3}` — #f1e9dd): Highlighted card or section surface — light mode.
- **Surface Muted (light)** (`{colors.surface-muted-light}` — #dcc9a9): All unavailable CTAs — light mode.
- **Surface Dark 1** (`{colors.surface-dark-1}` — #04102e): Default page surface, secondary button surface — dark mode.
- **Surface Dark 2** (`{colors.navy-500}` — #071b4d): Highlighted card or section surface — dark mode. *Reused from Navy.*
- **Surface Dark 3** (`{colors.surface-dark-3}` — #06163e): Surface color for banners or page sections, and available filling form inside card/section — dark mode.
- **Surface Dark 4** (`{colors.surface-dark-4}` — #9ca4b8): Banner surface color — dark mode.
- **Surface Muted (dark)** (`{colors.surface-muted-dark}` — #6a7694): All unavailable CTAs — dark mode.
- **Purple 600** (`{colors.purple-600}` — #3c1b93): Web3 element data highlight, and NGRX filling form surface — dark mode.
- **Purple 300** (`{colors.purple-300}` — #937ad4): Web3 element & data highlight — dark mode.
- **Purple 100** (`{colors.purple-100}` — #dbd3f1): NGRX filling form surface — light mode.
- **Gold 400** (`{colors.gold-400}` — #d1a241): Secondary color for headline text, graphic element, hover state surface color for CTAs — dark mode.
- **Light Green 400** (`{colors.light-green-400}` — #45a16a): All primary CTAs, successful status, and approval — dark mode.
- **Light Green 100** (`{colors.light-green-100}` — #d1e6da): Surface color for connected NGRX wallet information.

### Text & Hairlines
- **Ink Black** (`{colors.ink-black}` — #000000): Main color for body texts — light mode.
- **Ink White** (`{colors.ink-white}` — #ffffff): Main color for body texts — dark mode.
- **Muted Text (light)** (`{colors.muted-text-light}` — #aea494): Unavailable state text color and card outlines — light mode.
- **Hairlines (light)** (`{colors.hairlines-light}` — #b0a187): Card outlines in lines mode — light mode.
- **Muted Text (dark)** (`{colors.muted-text-dark}` — #45494c): Unavailable state text color — dark mode.
- **Hairlines (dark)** (`{colors.hairlines-dark}` — #747779): Card outlines — dark mode.
- **Purple 200** (`{colors.purple-200}` — #b7a7e3): Hairline color for Web3 element & data highlight.
- **Button Hairlines (light)** (`{colors.green-500}` — #178a45): Button outlines — light mode. *Reused from Green.*
- **Button Hairlines (dark)** (`{colors.light-green-400}` — #45a16a): Button outlines — dark mode. *Reused from Light Green 400.*

## Typography

Pairing of **Aventa** (Display & Button scale) + **Helvetica** (Title, Body, Caption, Nav scale).

| Token | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| hero-display | 88px | Black | 100% | -0.37px |
| display-lg | 64px | Black | 72px | -0.5px |
| display-md | 56px | Black | 64px | 0.37px |
| display-sm | 32px | Black | 40px | 0.37px |
| button-lg | 24px | Black | 28px | -0.5px |
| button-md | 14px | Black | 20px | 0.37px |
| button-sm | 12px | Bold | 16px | 0.37px |
| title-lg | 32px | Bold | 40px | 0.37px |
| title-md | 24px | Bold | 28px | 0.37px |
| title-sm | 14px | Bold | 20px | 0px |
| body-md | 16px | Regular | 20px | 0px |
| body-sm | 14px | Regular | 20px | 0px |
| caption | 12px | Regular | 16px | 0px |
| caption-uppercase | 12px | Regular | 16px | 0px |
| nav-link | 12px | Bold, underline | 16px | 0px |

## Components — Buttons

Rounded rectangle for most utility and progression CTAs; pills for drop-down menus, chips, and badges. All buttons use `{radius.buttons}` (8px) radius, 14–16px horizontal padding.

| Token | State/Label | Color | Mode |
|---|---|---|---|
| button-primary-light | Default | `{colors.green-500}` | Light |
| button-secondary-light | Default (outline) | border `{colors.green-500}` | Light |
| button-hover-light | Hover | `{colors.gold-500}` | Light |
| button-inactive-light | Inactive | `{colors.gold-500}` (muted) | Light |
| button-primarypill-light | Default | `{colors.green-500}` | Light |
| button-pill2icon-light | Download Certificate (icon) | `{colors.green-500}` | Light |
| icon-button-light | Icon-only | `{colors.green-500}` | Light |
| button-icon-light | Profile (icon + label) | `{colors.gold-500}` | Light |
| text-link-light | Text link | `{colors.green-500}`, underline | Light |
| button-primary-dark | Default | `{colors.light-green-400}` | Dark |
| button-secondary-dark | Default (outline) | border `{colors.gold-500}` | Dark |
| button-hover-dark | Hover | `{colors.gold-400}` | Dark |
| button-inactive-dark | Inactive | `{colors.gold-400}` (muted) | Dark |
| button-primarypill-dark | Default | `{colors.light-green-400}` | Dark |
| button-pill2icon-dark | Download Certificate (icon) | `{colors.light-green-400}` | Dark |
| icon-button-dark | Icon-only | `{colors.gold-400}` | Dark |
| button-icon-dark | Profile (icon + label) | `{colors.gold-400}` | Dark |
| text-link-dark | Text link | `{colors.light-green-400}`, underline | Dark |


## Components — Navigation Bar

Two context variants (Nagara Website & NagaraCert), each with light/dark mode:
- **Nagara Website**: logo + menu (Documentation, Explorer, Wallet) + primary CTA "Buy $NGRX" (`button-primarypill`) + display mode toggle.
- **NagaraCert**: logo + display mode toggle + profile chip (avatar + username, pill-shaped).
- **Background**: `#000000` at 5% opacity, with a background blur of 8 — consistent across all four variants (Website/NagaraCert × light/dark).

## Components — Banners (Homepage CTA)

- **Light mode**: split layout — left panel solid navy (`{colors.navy-500}`) with headline, right panel `{colors.surface-light-2}` with copy + circular green social icon buttons + toggle.
- **Dark mode**: left panel stays navy, right panel becomes `{colors.surface-dark-4}`.
- Social icon buttons use `{colors.green-400}` in light mode. 

## Components — Form Elements

Four states: Idle, Typing, Token Idle, Token Typing — each with light/dark variants.

| State | Light mode | Dark mode |
|---|---|---|
| Idle form | bg `{colors.surface-light-1}`, border `{colors.hairlines-light}` | bg `{colors.surface-dark-1}` |
| Typing | active border `{colors.gold-500}` | active border `{colors.gold-500}` |
| Token idle form | bg `{colors.purple-100}` | bg `{colors.purple-600}` |
| Token typing | bg `{colors.purple-100}`, active border `{colors.purple-500}` | bg `{colors.purple-600}`, active border `{colors.purple-500}` |

## Spacing Scale

Base unit 8px, applied consistently across the entire layout rhythm:

| Token | Value |
|---|---|
| xxs | 8px |
| xs | 16px |
| s | 24px |
| ms | 32px |
| m | 40px |
| ml | 48px |
| l | 64px |
| xl | 72px |
| sections | 140px |

## Border Radius Scale

| Token | Value | Used for |
|---|---|---|
| buttons | 8px | All buttons |
| forms-cta-chips-cards | 16px | Form inputs, large CTAs, chips, cards |
| section-cards | 32px | Section-level cards |
| badges-dropdown-icon | 9999px (fully rounded) | Badges, drop-down buttons, icon button borders |

## Elevation & Depth

This system uses **no shadows** — visual hierarchy and depth are built entirely through solid color blocks, mapped directly to existing surface tokens:

| Level | Usage | Token |
|---|---|---|
| Light flat | Body sections — light mode | `{colors.surface-light-1}` |
| Cream highlight card | Feature highlight card — light mode | `{colors.surface-light-3}` |
| Dark highlight | Body sections — dark mode | `{colors.navy-500}` (Surface Dark 2) |
| Dark thumbnail card | Highlighted section — dark mode | `{colors.surface-dark-3}` |

## Responsive Behavior

| Breakpoint | Width | Key changes |
|---|---|---|
| Mobile | <768px | Same as tablet, shorter navbar, smaller toggle and profile menu button. |
| Tablet | 768–1024px | Nav bar collapses to a hamburger button; display mode toggle and profile menu stay. |
| Desktop | >1024–1440px | Full navigation bar menu (4-up), display mode toggle, profile menu button. |
| Full HD | >1920px | Same as desktop with more breathing room (wider margins). Max content width 1200px. |

## Touch Targets

- Primary CTA at minimum **40 × 40px**
- Icon button at **36 × 36px**
- Text input height **40px**

## Collapsing Strategy

- Top nav collapses to a hamburger at <768px. Menu opens as full screen.
- Feature grids and homepage cards reduce columns rather than scaling elements down.
- Hero banner becomes a single column on mobile rather than scaling.


## Guardrails

- No gradients anywhere in the system — all color transitions use solid blocks.
- The purple family (`purple-100` through `purple-600`) is reserved specifically for Web3/token-related content — do not use it outside that context.
- Muted/hairline tokens are for non-interactive or disabled states only — do not use them on active text or buttons.
- Aventa is used only for the Display & Button scale; Helvetica is used only for Title/Body/Caption/Nav scale.
- Navigation bar background is always `#000000` at 5% opacity with a background blur of 8, regardless of light/dark mode or context (Website vs. NagaraCert).
