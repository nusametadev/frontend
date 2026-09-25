// SPDX-License-Identifier: LicenseRef-Blockscout

// we use custom heading size for hero banner
// eslint-disable-next-line no-restricted-imports
import { Box, chakra, Flex, Heading } from '@chakra-ui/react';
import React from 'react';

import SearchBar from 'src/slices/search/components/search-bar/SearchBarDesktop';
import SearchBarMobile from 'src/slices/search/components/search-bar/SearchBarMobile';

import UserProfileDesktop from 'src/features/account/components/user-profile/UserProfileDesktop';
import AdBanner from 'src/features/ads/banner/components/AdBanner';
import RewardsButton from 'src/features/rewards/components/RewardsButton';

import config from 'src/config';
import useIsMobile from 'src/shared/hooks/useIsMobile';

// Nagara's hero is its section artwork, not Blockscout's purple-to-cyan
// gradient: a grained cream band in light mode and a grained near-black one in
// the dark themes, each with the brand splash on the right. The text turns
// white in the dark themes, so the band has to turn dark with it.
//
// The colours are what shows before the image loads. Each matches its image's
// own base (#F7F3EE / ~#0E0F11) closely enough that the swap does not flash.
export const BACKGROUND_DEFAULT = { _light: 'surface.heroBand', _dark: 'gray.900' };
const TEXT_COLOR_DEFAULT = 'text.primary';
const BORDER_DEFAULT = 'none';

// Two versions of the artwork, each drawn with `cover`:
//
// - Wide (sm and up): ~2.46:1 with the splash in the right ~28%. Content
//   reserves the right 30% so the heading and search field never sit on it.
//   The band is wider than the image, so `cover` crops it vertically; 30%
//   keeps the splash (centred ~38% down the image) inside the crop.
// - Phone (below sm): 390x844 portrait with the splash top-right. The band is
//   made taller there with the content pushed to the bottom, so the splash
//   shows above the heading. 10% lifts it ~40px, which is what keeps its
//   lower arm clear of the heading on a 340-370px band.
//
// Below lg is still the mobile layout, but the portrait image is not stretched
// across it: at tablet widths it would be upscaled ~2.5x, so sm and up gets the
// wide one.
const ARTWORK_LAYERS = [
  {
    display: { base: 'block', sm: 'none' },
    image: { _light: 'url(\'/bgsection1-mobile.png\')', _dark: 'url(\'/bgsection1-mobile-dark.png\')' },
    position: 'center 10%',
  },
  {
    display: { base: 'none', sm: 'block' },
    image: { _light: 'url(\'/bgsection1.png\')', _dark: 'url(\'/bgsection1-dark.png\')' },
    position: 'right 30%',
  },
];
const ARTWORK_RESERVE = { base: 4, sm: '30%' };

const HeroBanner = () => {

  const isMobile = useIsMobile();

  const background = {
    _light:
      config.slices.home.heroBanner?.background?.[0] ||
      BACKGROUND_DEFAULT._light,
    _dark:
      config.slices.home.heroBanner?.background?.[1] ||
      config.slices.home.heroBanner?.background?.[0] ||
      BACKGROUND_DEFAULT._dark,
  };
  // A background set through config replaces the artwork as well as the colour.
  const hasCustomBackground = Boolean(config.slices.home.heroBanner?.background?.length);

  const textColor = {
    _light:
      // light mode
      config.slices.home.heroBanner?.text_color?.[0] ||
      TEXT_COLOR_DEFAULT,
    // dark mode
    _dark:
      config.slices.home.heroBanner?.text_color?.[1] ||
      config.slices.home.heroBanner?.text_color?.[0] ||
      TEXT_COLOR_DEFAULT,
  };

  const border = {
    _light:
      config.slices.home.heroBanner?.border?.[0] || BORDER_DEFAULT,
    _dark:
      config.slices.home.heroBanner?.border?.[1] || config.slices.home.heroBanner?.border?.[0] || BORDER_DEFAULT,
  };

  const text = (() => {
    if (config.slices.home.heroBanner?.text) {
      return config.slices.home.heroBanner.text;
    }

    return `${ config.chain.name } explorer`;
  })();

  // The brand word is picked out in red, the rest stays body-coloured — the
  // heading reads "Nagara Testnet explorer" with only "Nagara" in the brand
  // colour. Done by splitting the string rather than hard-coding it, so a
  // renamed network or a custom heroBanner.text still highlights correctly, and
  // falls back to plain text when the word is not present at all.
  const title = (() => {
    const brand = config.chain.shortName;
    const at = brand ? text.indexOf(brand) : -1;

    if (at === -1 || !brand) {
      return text;
    }

    return (
      <>
        { text.slice(0, at) }
        <chakra.span color="primaryRed.500">{ brand }</chakra.span>
        { text.slice(at + brand.length) }
      </>
    );
  })();

  return (
    <Flex
      w="100%"
      // `minH` rather than a fixed height so the band still grows if its
      // contents need more room.
      // The tall phone band only exists to make room for the splash.
      minH={{ base: hasCustomBackground ? 'auto' : '360px', sm: '240px' }}
      background={ background }
      border={ border }
      borderRadius="md"
      // Padding is split out rather than a single `p` so the right side can
      // reserve the artwork strip without the shorthand fighting it.
      py={{ base: 4, lg: 8 }}
      pl={{ base: 4, lg: 8 }}
      pr={ ARTWORK_RESERVE }
      columnGap={ 8 }
      // On phones the content sits at the bottom, under the splash.
      alignItems={{ base: 'flex-end', sm: 'center' }}
      position="relative"
      overflow="hidden"
      // Own stacking context, so the artwork's negative z-index keeps it above
      // this band's background colour rather than slipping behind it.
      isolation="isolate"
    >
      { !hasCustomBackground && ARTWORK_LAYERS.map((layer) => (
        <Box
          key={ layer.position }
          // Decorative only, so it is hidden from assistive tech and cannot
          // swallow clicks meant for the search field behind it.
          aria-hidden
          pointerEvents="none"
          display={ layer.display }
          position="absolute"
          inset={ 0 }
          // An absolute layer paints over in-flow siblings by default, and
          // this one spans the whole band, so it is pushed below the content.
          zIndex={ -1 }
          backgroundImage={ layer.image }
          backgroundPosition={ layer.position }
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
        />
      )) }
      <Box flexGrow={ 1 }>
        <Flex mb={{ base: 2, lg: 3 }} justifyContent="space-between" alignItems="center" columnGap={ 2 }>
          <Heading
            as="h1"
            fontSize={{ base: '18px', lg: '30px' }}
            lineHeight={{ base: '24px', lg: '36px' }}
            fontWeight={{ base: 500, lg: 700 }}
            color={ textColor }
          >
            { title }
          </Heading>
          { config.shell.navigation.layout === 'vertical' && (
            <Box display={{ base: 'none', lg: 'flex' }} gap={ 2 }>
              { config.features.rewards.isEnabled && <RewardsButton variant="hero"/> }
              <UserProfileDesktop buttonVariant="hero"/>
            </Box>
          ) }
        </Flex>
        <Box display={{ base: 'flex', lg: 'none' }}>
          <SearchBarMobile isHeroBanner/>
        </Box>
        <Box display={{ base: 'none', lg: 'flex' }}>
          <SearchBar isHeroBanner/>
        </Box>
      </Box>
      { !isMobile && <AdBanner format="mobile" w="fit-content" flexShrink={ 0 } borderRadius="md" overflow="hidden"/> }
    </Flex>
  );
};

export default React.memo(HeroBanner);
