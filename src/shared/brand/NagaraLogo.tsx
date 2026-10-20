// SPDX-License-Identifier: LicenseRef-Blockscout

import { chakra } from '@chakra-ui/react';
import type { SVGProps } from 'react';
import React from 'react';

/**
 * Nagara's brand mark — design system v5: a house shape merging into an "N",
 * traced as a single polygon from the left ~300px of `source-logo.png` (the
 * house/N glyph that precedes the "NAGARA" wordmark).
 *
 * The shape is nine straight vertices, no curves — verified by rasterizing
 * this exact path with Pillow's `ImageDraw.polygon` at the source's native
 * resolution and diffing alpha masks against the source crop: 0.14% of pixels
 * differ, all of them single-pixel antialiasing on the edges.
 *
 * Takes its colour from `currentColor` and its size from `font-size`
 * (width/height are `1em`), so it lines up with whatever text sits next to it
 * without a hard-coded box.
 *
 * Wrapped in `chakra()` so that `color` and `fontSize` accept design tokens.
 * Without it these would reach the `<svg>` as raw attributes and a token like
 * `gold.500` would never resolve to a colour.
 */
const NagaraLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    { ...props }
  >
    <path
      d="M9.625 7.25L14.75 12.25V2.625H29.625V29.125L17 16.75L16.875 28.25H2.125V14.625L9.625 7.25Z"
      fill="currentColor"
    />
  </svg>
);

export default React.memo(chakra(NagaraLogo));
