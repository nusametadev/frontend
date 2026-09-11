// SPDX-License-Identifier: LicenseRef-Blockscout

import { defaultsDeep } from 'es-toolkit/compat';

import config from 'src/config';

import { gray, primaryRed, surface, tertiary } from './brandColors';

/**
 * Nagara's theme layer.
 *
 * Values are taken from the Nagara Explorer design (Figma) and expressed with
 * the brand scales in ./brandColors, so there are almost no literals here.
 *
 * Keep this object structurally identical to upstream — same keys, same
 * nesting, only the values differ. A new theme role added upstream then shows
 * up as an ordinary merge conflict instead of being silently dropped.
 *
 * `_dark` is changed only where the value carried Blockscout's blue brand.
 * Nagara is a light-only design with no opinion on dark surfaces, but a blue
 * brand would be plainly wrong if a reader switches to a dark theme.
 */
const DEFAULT_THEME_COLORS = {
  bg: {
    primary: {
      // for some reason links to colors.white and colors.black variables are not working here
      // so we use hex values instead
      // but it is not the case for other colors
      _light: { value: '#F7F7F8' }, // Nagara page tint, = gray.100
      _dark: { value: '#101112' }, // colors.black
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
    // Nagara turns interactive elements brand-red on hover. A step darker than
    // the brand, so links — already red — still change visibly.
    _light: { value: '{colors.primaryRed.600}' },
    _dark: { value: '{colors.primaryRed.400}' },
  },
  selected: {
    control: {
      text: {
        _light: { value: '{colors.primaryRed.500}' },
        _dark: { value: '{colors.gray.50}' },
      },
      bg: {
        _light: { value: '{colors.primaryRed.200}' },
        _dark: { value: '{colors.whiteAlpha.50}' },
      },
    },
    option: {
      // Filled selected option — Nagara's segmented control is solid brand red.
      bg: {
        _light: { value: '{colors.primaryRed.500}' },
        _dark: { value: '{colors.primaryRed.500}' },
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
      _light: { value: '{colors.primaryRed.500}' },
      _dark: { value: '{colors.primaryRed.400}' },
      text: {
        _light: { value: '{colors.white}' },
        _dark: { value: '{colors.white}' },
      },
    },
  },
  link: {
    // Block numbers, hashes and addresses throughout the design.
    primary: {
      _light: { value: '{colors.primaryRed.500}' },
      _dark: { value: '{colors.primaryRed.300}' },
    },
  },
  graph: {
    line: {
      _light: { value: '{colors.primaryRed.500}' },
      _dark: { value: '{colors.primaryRed.300}' },
    },
    // Nagara's chart is a bare line: no area fill. Both stops are fully
    // transparent rather than removed, because the <linearGradient> is still
    // rendered and needs two valid colour stops.
    gradient: {
      start: {
        _light: { value: 'rgba(227, 30, 38, 0)' }, // primaryRed.500, no fill
        _dark: { value: 'rgba(227, 30, 38, 0)' }, // primaryRed.500, no fill
      },
      stop: {
        _light: { value: 'rgba(227, 30, 38, 0)' }, // primaryRed.500, no fill
        _dark: { value: 'rgba(227, 30, 38, 0)' }, // primaryRed.500, no fill
      },
    },
  },
  navigation: {
    bg: {
      // The active item carries no fill in Nagara's design — it is marked by
      // red text and a red underline. The underline itself is a shape rather
      // than a colour, so it is not set here.
      selected: {
        _light: { value: 'transparent' },
        _dark: { value: '{colors.gray.800}' },
      },
    },
    text: {
      selected: {
        _light: { value: '{colors.primaryRed.500}' },
        _dark: { value: '{colors.gray.50}' },
      },
    },
  },
  stats: {
    // Cards sit white on the tinted page; that separation is how Nagara's
    // surfaces read. Deliberately a literal and not `{colors.white}`: the
    // colour theme switcher rewrites --chakra-colors-white from bg.primary, so
    // a token reference would collapse cards into the page background the
    // moment anyone sets NEXT_PUBLIC_COLOR_THEME_OVERRIDES.
    bg: {
      _light: { value: '#FFFFFF' },
      _dark: { value: '{colors.whiteAlpha.100}' },
    },
  },
  topbar: {
    // White strip above the tinted page. Literal for the same reason as
    // stats.bg above.
    bg: {
      _light: { value: '#FFFFFF' },
      _dark: { value: '{colors.whiteAlpha.100}' },
    },
  },
  tabs: {
    text: {
      primary: {
        _light: { value: '{colors.primaryRed.500}' },
        _dark: { value: '{colors.primaryRed.200}' },
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
  // Nagara's brand red. Separate from `red` on purpose: `red` keeps its
  // error/danger meaning. See ./brandColors
  primaryRed,
  // Nagara's tertiary accents, see ./brandColors
  tertiary,
  // Nagara's warm surfaces (hero band, notice bar), see ./brandColors
  surface,
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
