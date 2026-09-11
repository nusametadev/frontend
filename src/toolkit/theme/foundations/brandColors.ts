// SPDX-License-Identifier: LicenseRef-Blockscout

/**
 * Nagara brand palette.
 *
 * Source of truth for every colour that comes from the Nagara design system
 * rather than from Blockscout. Values are extracted in `docs/nagara-theme-export.md`,
 * which traces each one back to a literal hex in the Nagara web app.
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
 * Two steps are load-bearing in light mode and worth knowing before touching
 * them: `300` is the OFF state of every switch, and `600` backs Chakra's
 * inherited `fg.muted`, hence every form field's helper text (#3D3F44 gives
 * 10.5:1 on white).
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
 * Nagara's brand red. `500` is THE brand colour — links, active navigation,
 * primary buttons, chart lines.
 *
 * Deliberately separate from `red`, which stays on Blockscout's values and
 * keeps its error/danger meaning. Two red scales is the point: without the
 * split, an error message and a link would be the same colour.
 *
 * The design system defines 100–500 only, and note that its `100` is plain
 * WHITE rather than a pale red — the ramp starts at the page, not at a tint.
 * There is deliberately no `50`: nothing is lighter than white.
 *
 * 600–900 are extensions, not canon. Steps 200–500 sit on one disciplined HSL
 * ramp (hue fixed at ~358 deg, saturation fixed at ~78%, only lightness
 * moving), verified by reconstructing 200 from H358/S78%/L90% — that lands on
 * #F9D2D3 against the real #F9D2D4, one step off on blue — so the dark end
 * continues that same ramp instead of being guessed. Canonical values below are
 * the originals, never the reconstructions, so `500` stays exactly #E31E26.
 */
export const primaryRed = {
  '100': { value: '#FFFFFF' }, // Nagara primaryRed-100 — white, by design
  '200': { value: '#F9D2D4' }, // Nagara primaryRed-200
  '300': { value: '#F28F93' }, // Nagara primaryRed-300
  '400': { value: '#EC6267' }, // Nagara primaryRed-400
  '500': { value: '#E31E26' }, // Nagara primaryRed-500 — brand colour
  '600': { value: '#BF181D' }, // extension, L 42%
  '700': { value: '#9A1318' }, // extension, L 34%
  '800': { value: '#760F12' }, // extension, L 26%
  '900': { value: '#520A0C' }, // extension, L 18%
};

/**
 * Nagara's tertiary accents. Flat named colours, not scales — the design system
 * gives exactly one value each, so there are no steps to reference.
 *
 * `orange` is the one with a real job in Nagara's own UI: the announcement
 * banner's label and border. `pink` and `burgundy` are defined by the palette
 * but unused there, carried here so the design system is complete.
 */
export const tertiary = {
  orange: { value: '#E63E00' },
  pink: { value: '#F8BBCA' },
  burgundy: { value: '#9B2710' },
};

/**
 * Nagara's warm surfaces. These sit outside the neutral scale — they are warm
 * (a touch of yellow/red) where `gray` is cool, so they cannot be expressed as
 * a step of it.
 *
 * Not from the brand book's colour sheet: both are traced to literals in
 * Nagara's own components in `docs/nagara-theme-export.md`, and corroborated by
 * the Explorer design. Named rather than inlined so the design-system rule
 * against raw hex still holds at the point of use.
 */
export const surface = {
  // The homepage hero band sitting behind the title and search field.
  heroBand: { value: '#F8F4F0' },
  // Announcement / alert bar, paired with `tertiary.orange` for its text.
  notice: { value: '#FBEEE4' },
};
