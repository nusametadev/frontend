// SPDX-License-Identifier: LicenseRef-Blockscout

import { defaultsDeep } from 'es-toolkit/compat';

import config from 'src/config';

import { gold, gray, graphicAccent, hairline, mutedText, navy, primaryGreen, surface, web3Purple } from './brandColors';

/**
 * Nagara's theme layer — design system v5.
 *
 * Values are taken from `docs/DESIGN-nagara-v5.md` and expressed with the
 * brand scales in ./brandColors, so there are almost no literals here.
 *
 * Keep this object structurally identical to upstream — same keys, same
 * nesting, only the values differ. A new theme role added upstream then shows
 * up as an ordinary merge conflict instead of being silently dropped.
 *
 * Unlike the v4 (red) theme, v5 has an explicit opinion on dark surfaces —
 * `surface.dark1` / `.dark3` / `.dark4` below come straight from the spec,
 * not from guessing a dark complement of the light values.
 */
const DEFAULT_THEME_COLORS = {
  bg: {
    primary: {
      // Nagara's default page surface in each mode. Spec: "surface-light-1" /
      // "surface-dark-1".
      _light: { value: '{colors.surface.light1}' },
      _dark: { value: '{colors.surface.dark1}' },
    },
  },
  text: {
    primary: {
      // Nagara sets body text to a solid #1D1D1F. blackAlpha.800 would
      // composite to a noticeably lighter grey over the tinted page.
      _light: { value: '{colors.gray.900}' },
      _dark: { value: '{colors.whiteAlpha.800}' },
    },
    secondary: {
      _light: { value: '{colors.gray.500}' },
      _dark: { value: '{colors.gray.400}' },
    },
  },
  hover: {
    // Nagara's hover state for interactive elements is gold, not a shade of
    // the primary green — see "button-hover" in the spec's button table.
    _light: { value: '{colors.gold.500}' },
    _dark: { value: '{colors.gold.400}' },
  },
  selected: {
    control: {
      text: {
        _light: { value: '{colors.primaryGreen.500}' },
        _dark: { value: '{colors.gray.50}' },
      },
      bg: {
        // light-green-100 is the spec's own tint for a "selected"/connected
        // surface (it calls it out for the connected-wallet card).
        _light: { value: '{colors.primaryGreen.100}' },
        _dark: { value: '{colors.whiteAlpha.50}' },
      },
    },
    option: {
      // Filled selected option — solid brand green, light-green in dark mode.
      bg: {
        _light: { value: '{colors.primaryGreen.500}' },
        _dark: { value: '{colors.primaryGreen.400}' },
      },
    },
  },
  icon: {
    primary: {
      _light: { value: '{colors.gray.600}' }, // Nagara #3D3F44
      _dark: { value: '{colors.gray.400}' },
    },
    secondary: {
      _light: { value: '{colors.gray.500}' }, // Nagara #797D86
      _dark: { value: '{colors.gray.500}' },
    },
  },
  button: {
    primary: {
      _light: { value: '{colors.primaryGreen.500}' },
      _dark: { value: '{colors.primaryGreen.400}' },
      text: {
        _light: { value: '{colors.white}' },
        _dark: { value: '{colors.white}' },
      },
    },
  },
  link: {
    // Block numbers, hashes and addresses throughout the design.
    primary: {
      _light: { value: '{colors.primaryGreen.500}' },
      _dark: { value: '{colors.primaryGreen.400}' },
    },
  },
  graph: {
    line: {
      _light: { value: '{colors.primaryGreen.500}' },
      _dark: { value: '{colors.primaryGreen.400}' },
    },
    // Nagara's chart is a bare line: no area fill (the spec's "no gradients
    // anywhere" guardrail). Both stops are fully transparent rather than
    // removed, because the <linearGradient> is still rendered and needs two
    // valid colour stops.
    gradient: {
      start: {
        _light: { value: 'rgba(23, 138, 69, 0)' }, // primaryGreen.500, no fill
        _dark: { value: 'rgba(69, 161, 106, 0)' }, // primaryGreen.400, no fill
      },
      stop: {
        _light: { value: 'rgba(23, 138, 69, 0)' }, // primaryGreen.500, no fill
        _dark: { value: 'rgba(69, 161, 106, 0)' }, // primaryGreen.400, no fill
      },
    },
  },
  navigation: {
    bg: {
      // The active item carries no fill in Nagara's design — it is marked by
      // green text and an underline. The underline itself is a shape rather
      // than a colour, so it is not set here.
      selected: {
        _light: { value: 'transparent' },
        _dark: { value: '{colors.gray.800}' },
      },
    },
    text: {
      selected: {
        _light: { value: '{colors.primaryGreen.500}' },
        _dark: { value: '{colors.gray.50}' },
      },
    },
  },
  stats: {
    // Nagara's highlighted-card surface, light and dark — the spec's own
    // "cream highlight card" / "dark thumbnail card" elevation levels. A
    // literal rather than `{colors.white}`: the colour theme switcher
    // rewrites --chakra-colors-white from bg.primary, so a token reference
    // would collapse cards into the page background the moment anyone sets
    // NEXT_PUBLIC_COLOR_THEME_OVERRIDES.
    bg: {
      _light: { value: '#f1e9dd' }, // surface-light-3
      _dark: { value: '#06163e' }, // surface-dark-3
    },
  },
  topbar: {
    // Strip above the tinted page. Literal for the same reason as stats.bg
    // above.
    bg: {
      _light: { value: '#f1e9dd' }, // surface-light-3
      _dark: { value: '#06163e' }, // surface-dark-3
    },
  },
  tabs: {
    text: {
      primary: {
        _light: { value: '{colors.primaryGreen.500}' },
        _dark: { value: '{colors.primaryGreen.400}' },
      },
    },
  },
};

const colors = {
  // BASE COLORS
  green: {
    '50': { value: '#F0FFF4' },
    '100': { value: '#C6F6D5' },
    '200': { value: '#9AE6B4' },
    '300': { value: '#68D391' },
    '400': { value: '#48BB78' },
    '500': { value: '#38A169' },
    '600': { value: '#25855A' },
    '700': { value: '#276749' },
    '800': { value: '#22543D' },
    '900': { value: '#1C4532' },
  },
  blue: {
    '50': { value: '#EBF8FF' },
    '100': { value: '#BEE3F8' },
    '200': { value: '#90CDF4' },
    '300': { value: '#63B3ED' },
    '400': { value: '#4299E1' },
    '500': { value: '#3182CE' },
    '600': { value: '#2B6CB0' },
    '700': { value: '#2C5282' },
    '800': { value: '#2A4365' },
    '900': { value: '#1A365D' },
  },
  red: {
    '50': { value: '#FFF5F5' },
    '100': { value: '#FED7D7' },
    '200': { value: '#FEB2B2' },
    '300': { value: '#FC8181' },
    '400': { value: '#F56565' },
    '500': { value: '#E53E3E' },
    '600': { value: '#C53030' },
    '700': { value: '#9B2C2C' },
    '800': { value: '#822727' },
    '900': { value: '#63171B' },
  },
  // Nagara's brand navy, gold and primary green. Named `primaryGreen` (not
  // `green`) and the Web3-only purple is named `web3Purple` (not `purple`)
  // because Chakra's generic scales of those names already exist below for
  // ordinary badges/success states — same reason `red` keeps its
  // error/danger meaning separate from the brand. See ./brandColors
  navy,
  gold,
  primaryGreen,
  // Nagara's purple, reserved for Web3/token content only, see ./brandColors
  web3Purple,
  // Nagara's flat graphic-element accents, see ./brandColors
  graphicAccent,
  // Nagara's warm page/card surfaces, see ./brandColors
  surface,
  // Nagara's muted-text and hairline tokens — disabled/non-interactive states
  // and card outlines only, see ./brandColors
  mutedText,
  hairline,
  orange: {
    '50': { value: '#FFFAF0' },
    '100': { value: '#FEEBCB' },
    '200': { value: '#FBD38D' },
    '300': { value: '#F6AD55' },
    '400': { value: '#ED8936' },
    '500': { value: '#DD6B20' },
    '600': { value: '#C05621' },
    '700': { value: '#9C4221' },
    '800': { value: '#7B341E' },
    '900': { value: '#652B19' },
  },
  yellow: {
    '50': { value: '#FFFFF0' },
    '100': { value: '#FEFCBF' },
    '200': { value: '#FAF089' },
    '300': { value: '#F6E05E' },
    '400': { value: '#ECC94B' },
    '500': { value: '#D69E2E' },
    '600': { value: '#B7791F' },
    '700': { value: '#975A16' },
    '800': { value: '#744210' },
    '900': { value: '#5F370E' },
  },
  // Nagara's warm-neutral scale, see ./brandColors
  gray,
  teal: {
    '50': { value: '#E6FFFA' },
    '100': { value: '#B2F5EA' },
    '200': { value: '#81E6D9' },
    '300': { value: '#4FD1C5' },
    '400': { value: '#38B2AC' },
    '500': { value: '#319795' },
    '600': { value: '#2C7A7B' },
    '700': { value: '#285E61' },
    '800': { value: '#234E52' },
    '900': { value: '#1D4044' },
  },
  cyan: {
    '50': { value: '#EDFDFD' },
    '100': { value: '#C4F1F9' },
    '200': { value: '#9DECF9' },
    '300': { value: '#76E4F7' },
    '400': { value: '#0BC5EA' },
    '500': { value: '#00B5D8' },
    '600': { value: '#00A3C4' },
    '700': { value: '#0987A0' },
    '800': { value: '#086F83' },
    '900': { value: '#065666' },
  },
  purple: {
    '50': { value: '#FAF5FF' },
    '100': { value: '#E9D8FD' },
    '200': { value: '#D6BCFA' },
    '300': { value: '#B794F4' },
    '400': { value: '#9F7AEA' },
    '500': { value: '#805AD5' },
    '600': { value: '#6B46C1' },
    '700': { value: '#553C9A' },
    '800': { value: '#44337A' },
    '900': { value: '#322659' },
  },
  pink: {
    '50': { value: '#FFF5F7' },
    '100': { value: '#FED7E2' },
    '200': { value: '#FBB6CE' },
    '300': { value: '#F687B3' },
    '400': { value: '#ED64A6' },
    '500': { value: '#D53F8C' },
    '600': { value: '#B83280' },
    '700': { value: '#97266D' },
    '800': { value: '#702459' },
    '900': { value: '#521B41' },
  },
  black: { value: '#101112' },
  white: { value: '#ffffff' },
  whiteAlpha: {
    '50': { value: 'RGBA(255, 255, 255, 0.04)' },
    '100': { value: 'RGBA(255, 255, 255, 0.06)' },
    '200': { value: 'RGBA(255, 255, 255, 0.08)' },
    '300': { value: 'RGBA(255, 255, 255, 0.16)' },
    '400': { value: 'RGBA(255, 255, 255, 0.24)' },
    '500': { value: 'RGBA(255, 255, 255, 0.36)' },
    '600': { value: 'RGBA(255, 255, 255, 0.48)' },
    '700': { value: 'RGBA(255, 255, 255, 0.64)' },
    '800': { value: 'RGBA(255, 255, 255, 0.80)' },
    '900': { value: 'RGBA(255, 255, 255, 0.92)' },
  },
  blackAlpha: {
    '50': { value: 'RGBA(16, 17, 18, 0.04)' },
    '100': { value: 'RGBA(16, 17, 18, 0.06)' },
    '200': { value: 'RGBA(16, 17, 18, 0.08)' },
    '300': { value: 'RGBA(16, 17, 18, 0.16)' },
    '400': { value: 'RGBA(16, 17, 18, 0.24)' },
    '500': { value: 'RGBA(16, 17, 18, 0.36)' },
    '600': { value: 'RGBA(16, 17, 18, 0.48)' },
    '700': { value: 'RGBA(16, 17, 18, 0.64)' },
    '800': { value: 'RGBA(16, 17, 18, 0.80)' },
    '900': { value: 'RGBA(16, 17, 18, 0.92)' },
  },

  // BRAND COLORS
  github: { value: '#171923' },
  telegram: { value: '#2775CA' },
  linkedin: { value: '#1564BA' },
  discord: { value: '#9747FF' },
  slack: { value: '#1BA27A' },
  twitter: { value: '#000000' },
  opensea: { value: '#2081E2' },
  facebook: { value: '#4460A0' },
  medium: { value: '#231F20' },
  reddit: { value: '#FF4500' },
  celo: { value: '#FCFF52' },
  clusters: { value: '#DE6061' },

  // THEME COLORS
  theme: defaultsDeep(config.shell.topBar.colorTheme.overrides, DEFAULT_THEME_COLORS),
};

export default colors;
