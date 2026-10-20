// SPDX-License-Identifier: LicenseRef-Blockscout

/**
 * Nagara brand palette — design system v5.
 *
 * Source of truth for every colour that comes from the Nagara design system
 * rather than from Blockscout. Values are taken verbatim from
 * `docs/DESIGN-nagara-v5.md`, which is the design team's own spec rather than
 * a reconstruction from screenshots (see `docs/nagara-theme-export.md` for how
 * the superseded v4/red scheme was extracted).
 *
 * Kept in its own file so that upstream changes to `colors.ts` (which tracks
 * blockscout/frontend) conflict on two lines instead of on the whole palette.
 */

/**
 * Replaces Chakra's blue-tinted grays with Nagara's warm-neutral scale.
 *
 * Mapped by NUMBER: Nagara's `neutral-100..900` go straight onto
 * `gray.100..900`. All nine canonical values are used as-is, which is the whole
 * point — the palette is the design system's, so it should not be reshuffled to
 * suit Chakra's slot numbering.
 *
 * Nagara's scale starts at 100 while Chakra's starts at 50, so `gray.50` is the
 * single interpolated value: the midpoint between `neutral-100` and white. That
 * is the safest slot to invent in, because Blockscout only ever uses `gray.50`
 * as a near-white raised surface (stats bar, top bar, icon backgrounds) rather
 * than as a line or a text colour.
 *
 * Unrelated to the v5 rebrand below — the design spec has no opinion on a
 * neutral scale, and this one does not clash with any of its warm surfaces, so
 * it is carried over unchanged from the v4 (red) theme.
 */
export const gray = {
  '50': { value: '#FBFBFC' }, // interpolated: neutral-100 <-> white
  '100': { value: '#F7F7F8' }, // Nagara neutral-100
  '200': { value: '#EBECED' }, // Nagara neutral-200
  '300': { value: '#D9DADD' }, // Nagara neutral-300
  '400': { value: '#AFB2B7' }, // Nagara neutral-400
  '500': { value: '#797D86' }, // Nagara neutral-500
  '600': { value: '#3D3F44' }, // Nagara neutral-600
  '700': { value: '#313236' }, // Nagara neutral-700
  '800': { value: '#262729' }, // Nagara neutral-800
  '900': { value: '#1D1D1F' }, // Nagara neutral-900
};

/**
 * Nagara's navy. Single canonical step — the spec never shades it, it is used
 * flat for headline text, banner surfaces and the dark-mode highlighted card
 * (`surface-dark-2` in the spec is explicitly "reused from Navy").
 */
export const navy = {
  '500': { value: '#071b4d' }, // Nagara navy-500
};

/**
 * Nagara's gold. Secondary brand colour: the hover-state surface for CTAs,
 * the icon-button / profile-chip colour, and the brand word picked out in the
 * hero banner. Two canonical steps only — one per colour mode, not a light/dark
 * ramp of the same step. `500` is the light-mode value, `400` is the dedicated
 * dark-mode value (a touch lighter, for contrast against navy), matching the
 * spec's own naming.
 */
export const gold = {
  '400': { value: '#d1a241' }, // Nagara gold-400 — dark mode
  '500': { value: '#c58b12' }, // Nagara gold-500 — light mode
};

/**
 * Nagara's green family. THE primary brand colour: primary CTAs, text links,
 * active navigation and chart lines. As with gold, `500` and `400` are not a
 * light/dark step of one ramp — they are two distinct canonical tokens the
 * spec calls "Green" and "Light Green", picked for light mode and dark mode
 * respectively. `100` is the one additional canonical tint, used for the
 * connected-wallet surface. No other steps are invented: everything here is a
 * literal value from the spec, nothing interpolated.
 *
 * Named `primaryGreen` rather than `green` because `green` already exists
 * below as Chakra's generic success/badge scale — the two must stay distinct
 * the same way the superseded v4 (red) theme's brand colour never collided
 * with Chakra's generic `red`.
 */
export const primaryGreen = {
  '100': { value: '#d1e6da' }, // Nagara light-green-100 — connected NGRX wallet surface
  '400': { value: '#45a16a' }, // Nagara light-green-400 — dark mode primary/link/chart
  '500': { value: '#178a45' }, // Nagara green-500 — light mode primary/link/chart
};

/**
 * Nagara's purple family, reserved by the spec specifically for Web3/token
 * content (tokens, marketplace, supply) — never used outside that context.
 * Named `web3Purple`, not `purple`, for the same reason as `primaryGreen`:
 * Chakra's generic `purple` scale already exists below for ordinary badges.
 *
 * Only the five steps the spec defines are present (100, 200, 300, 500, 600).
 * There is no 400 in the source — left out rather than guessed.
 */
export const web3Purple = {
  '100': { value: '#dbd3f1' }, // NGRX filling-form surface — light mode
  '200': { value: '#b7a7e3' }, // hairline for Web3 element/data highlight
  '300': { value: '#937ad4' }, // Web3 element & data highlight — dark mode
  '500': { value: '#4b22b8' }, // Web3 elements — light mode (tokens, marketplace, supply)
  '600': { value: '#3c1b93' }, // Web3 element data highlight, NGRX filling-form surface — dark mode
};

/**
 * Flat graphic-element accents — one value each, no steps, same shape as the
 * old (now removed) `tertiary` export. The v4 tertiary accents (`orange`,
 * `pink`, `burgundy`) were paired with the red brand and have no v5
 * equivalent in the spec, so they are dropped rather than carried forward;
 * nothing in this codebase referenced them.
 */
export const graphicAccent = {
  cyanBlue: { value: '#0f84d8' },
  babyBlue: { value: '#eef5ff' },
};

/**
 * Nagara's warm surfaces — page backgrounds and section/card fills, light and
 * dark. These sit outside the neutral scale (`gray` above): they carry a warm
 * cast in light mode, and in dark mode they are navy-tinted rather than
 * neutral, so neither direction can be expressed as a step of `gray`.
 *
 * `surface-dark-2` from the spec is deliberately absent here: the spec defines
 * it as "reused from Navy", i.e. it is `navy.500` above, not a separate value.
 */
export const surface = {
  light1: { value: '#f8f4ee' }, // default page surface, form fill, secondary button — light
  light2: { value: '#e8d1a0' }, // banner / page-section surface — light
  light3: { value: '#f1e9dd' }, // highlighted card/section surface — light
  mutedLight: { value: '#dcc9a9' }, // unavailable-CTA surface — light
  dark1: { value: '#04102e' }, // default page surface, secondary button — dark
  dark3: { value: '#06163e' }, // banner/section surface, form fill inside card — dark
  dark4: { value: '#9ca4b8' }, // banner surface — dark
  mutedDark: { value: '#6a7694' }, // unavailable-CTA surface — dark
};

/**
 * Non-interactive text and hairline tokens. Per the spec's own guardrail,
 * these are for muted/disabled states and card outlines only — never for
 * active text or buttons.
 */
export const mutedText = {
  light: { value: '#aea494' },
  dark: { value: '#45494c' },
};

export const hairline = {
  light: { value: '#b0a187' },
  dark: { value: '#747779' },
};
