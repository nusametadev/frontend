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

// Nagara's hero is a warm band with dark text, not Blockscout's purple-to-cyan
// gradient with white text. The brand artwork is a separate layer below rather
// than part of this value, which keeps it out of the way of the content.
export const BACKGROUND_DEFAULT = 'surface.heroBand';
const TEXT_COLOR_DEFAULT = 'text.primary';
const BORDER_DEFAULT = 'none';

// The artwork is 491x345 and scaled to the band height, so at the lg band
// height (240px) it is ~342px wide. Content is kept clear of that strip so the
// heading and the search field never sit on top of the splash.
//
// Its own background is a measured #F6F1EC against the band's #F8F4F0 — a
// 2-4/255 difference, invisible in place, and the same mismatch the Nagara site
// itself has, so the two layers read as one surface.
const ARTWORK_WIDTH = '342px';
// Below lg the band is short, which would scale the artwork down to roughly
// half the width of a phone screen and leave no room for the search field.
// It is a decoration, so it simply does not appear there.
const ARTWORK_RESERVE = { base: 4, lg: ARTWORK_WIDTH };

const HeroBanner = () => {

  const isMobile = useIsMobile();

  const background = {
    _light:
      config.slices.home.heroBanner?.background?.[0] ||
      BACKGROUND_DEFAULT,
    _dark:
      config.slices.home.heroBanner?.background?.[1] ||
      config.slices.home.heroBanner?.background?.[0] ||
      BACKGROUND_DEFAULT,
  };

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
      // contents need more room. It also drives the size of the brand artwork,
      // which is scaled to the band's height.
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
    >
      <Box
        // Decorative only, so it is hidden from assistive tech and cannot
        // swallow clicks meant for the search field behind it.
        aria-hidden
        pointerEvents="none"
        display={{ base: 'none', lg: 'block' }}
        position="absolute"
        top={ 0 }
        right={ 0 }
        bottom={ 0 }
        w={ ARTWORK_WIDTH }
        backgroundImage="url('/art-home.png')"
        backgroundPosition="right center"
        backgroundSize="auto 100%"
        backgroundRepeat="no-repeat"
      />
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
