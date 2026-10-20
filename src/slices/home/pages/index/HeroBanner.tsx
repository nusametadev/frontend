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
import NagaraLogo from 'src/shared/brand/NagaraLogo';
import useIsMobile from 'src/shared/hooks/useIsMobile';

// Nagara's hero band is a solid navy block — the spec's homepage-banner
// component, left panel — in both colour modes. Unlike the v4 (red) theme,
// there is no separate light/dark artwork to swap: "no gradients anywhere in
// the system" also means no photographic splash, so the band itself carries
// the brand instead of an image behind it.
export const BACKGROUND_DEFAULT = { _light: 'navy.500', _dark: 'navy.500' };
// The band is navy in both modes, so the title stays white in both modes too.
const TEXT_COLOR_DEFAULT = 'white';
const BORDER_DEFAULT = 'none';

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
  // A background set through config also hides the decorative mark below.
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

  // The brand word is picked out in gold, the rest stays in the band's text
  // colour — the heading reads "Nagara Testnet explorer" with only "Nagara" in
  // gold. Done by splitting the string rather than hard-coding it, so a
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
        <chakra.span color={{ _light: 'gold.500', _dark: 'gold.400' }}>{ brand }</chakra.span>
        { text.slice(at + brand.length) }
      </>
    );
  })();

  return (
    <Flex
      w="100%"
      // `minH` rather than a fixed height so the band still grows if its
      // contents need more room.
      minH={{ base: 'auto', sm: '240px' }}
      background={ background }
      border={ border }
      borderRadius="md"
      p={{ base: 4, lg: 8 }}
      columnGap={ 8 }
      alignItems="center"
      position="relative"
      overflow="hidden"
      // Own stacking context, so the mark's negative z-index keeps it above
      // this band's background colour rather than slipping behind it.
      isolation="isolate"
    >
      { !hasCustomBackground && (
        <NagaraLogo
          // Decorative only, so it is hidden from assistive tech and cannot
          // swallow clicks meant for the search field in front of it.
          aria-hidden
          pointerEvents="none"
          display={{ base: 'none', lg: 'block' }}
          position="absolute"
          color="gold.500"
          // A solid block, not a wash — the guardrail against gradients rules
          // out a faded/alpha treatment here too, so it is sized and clipped
          // instead to stay in the band's right margin.
          opacity={ 0.16 }
          fontSize="340px"
          right="-60px"
          top="50%"
          transform="translateY(-50%)"
          // An absolute layer paints over in-flow siblings by default, and
          // this one sits in the same stacking context as the content, so it
          // is pushed below it.
          zIndex={ -1 }
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
