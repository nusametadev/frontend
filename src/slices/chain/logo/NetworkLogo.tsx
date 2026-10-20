// SPDX-License-Identifier: LicenseRef-Blockscout

import { chakra } from '@chakra-ui/react';
import { route } from 'nextjs-routes';
import React from 'react';

import config from 'src/config';

import { useColorModeValue } from 'src/toolkit/chakra/color-mode';
import { Image } from 'src/toolkit/chakra/image';

import { INVERT_FILTER } from './consts';

// Nagara's full wordmark, in place of Blockscout's placeholder. This is the
// fallback the app actually renders: NEXT_PUBLIC_NETWORK_LOGO is deliberately
// unset, because the logo is part of the design system rather than something
// each deployment supplies.
//
// Committed as an image (not drawn with NagaraLogo + text, as the v4 red theme
// did) because the wordmark itself — "NAGARA" in navy/white plus "$NGRX" in
// gold — is a fixed brand asset, not something that should re-flow if the
// network is ever renamed. Two PNGs, not one recoloured with CSS filters: the
// navy/gold combination in light mode does not invert cleanly into the
// white/gold one in dark mode.
const LogoFallback = () => {
  const name = config.chain.shortName || config.chain.name;
  const src = useColorModeValue('/static/nagara/logo.png', '/static/nagara/logo-dark.png');

  return (
    <chakra.img src={ src } alt={ `${ name } network logo` } h="24px" objectFit="contain"/>
  );
};

type Props = {
  className?: string;
};

const NetworkLogo = ({ className }: Props) => {

  const logoSrc = useColorModeValue(config.chain.logo.default, config.chain.logo.dark || config.chain.logo.default);

  return (
    <chakra.a
      className={ className }
      href={ route({ pathname: '/' }) }
      aria-label="Link to main page"
    >
      <Image
        h="24px"
        skeletonWidth="120px"
        src={ logoSrc }
        alt={ `${ config.chain.name } network logo` }
        fallback={ <LogoFallback/> }
        // Only meaningful for a *configured* logo that has no explicit dark
        // variant — the `<Image>` wrapper still clones this filter onto
        // `fallback` when `logoSrc` is empty, which would wrongly invert
        // LogoFallback's own already-dark-mode-correct asset.
        filter={ logoSrc ? { _dark: !config.chain.logo.dark ? INVERT_FILTER : undefined } : undefined }
        objectFit="contain"
        objectPosition="left"
      />
    </chakra.a>
  );
};

export default React.memo(chakra(NetworkLogo));
