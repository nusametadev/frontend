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
// The colours are what shows before the image loads, and below lg where the
// image is not drawn. Each matches its image's own base (#F7F3EE / ~#0E0F11)
// closely enough that the swap does not flash.
export const BACKGROUND_DEFAULT = { _light: 'surface.heroBand', _dark: 'gray.900' };
const BACKGROUND_IMAGE = { _light: 'url(\'/bgsection1.png\')', _dark: 'url(\'/bgsection1-dark.png\')' };
const TEXT_COLOR_DEFAULT = 'text.primary';
const BORDER_DEFAULT = 'none';

// The images are ~2.46:1 and drawn with `cover`, so on a wide band they span
// its full width and the splash lands in the right ~28%. Content is kept clear
// of that strip so the heading and the search field never sit on the splash.
// The band is wider than the image's aspect, so `cover` crops it vertically;
// 30% keeps the splash (centred ~38% down the image) inside the crop.
//
// Below lg the band is short and the search field fills it, so the splash
// would sit underneath it. It is a decoration, so it simply does not appear.
const ARTWORK_RESERVE = { base: 4, lg: '30%' };

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
      minH={{ base: 'auto', lg: '240px' }}
      background={ background }
      border={ border }
      borderRadius="md"
      // Padding is split out rather than a single `p` so the right side can
      // reserve the artwork strip without the shorthand fighting it.
      py={{ base: 4, lg: 8 }}
      pl={{ base: 4, lg: 8 }}
      pr={ ARTWORK_RESERVE }
      columnGap={ 8 }
      alignItems="center"
      position="relative"
      overflow="hidden"
      // Own stacking context, so the artwork's negative z-index keeps it above
      // this band's background colour rather than slipping behind it.
      isolation="isolate"
    >
      { !hasCustomBackground && (
        <Box
          // Decorative only, so it is hidden from assistive tech and cannot
          // swallow clicks meant for the search field behind it.
          aria-hidden
          pointerEvents="none"
          display={{ base: 'none', lg: 'block' }}
          position="absolute"
          inset={ 0 }
          // An absolute layer paints over in-flow siblings by default, and
          // this one spans the whole band, so it is pushed below the content.
          zIndex={ -1 }
          backgroundImage={ BACKGROUND_IMAGE }
          backgroundPosition="right 30%"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
        />
      ) }
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
