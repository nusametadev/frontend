// SPDX-License-Identifier: LicenseRef-Blockscout

import { chakra } from '@chakra-ui/react';
import { route } from 'nextjs-routes';
import React from 'react';

import config from 'src/config';
import NagaraLogo from 'src/shared/brand/NagaraLogo';

import { useColorModeValue } from 'src/toolkit/chakra/color-mode';
import { Image } from 'src/toolkit/chakra/image';

import { INVERT_FILTER } from './consts';

// Nagara's mark in place of Blockscout's placeholder, for the collapsed sidebar.
// As with NetworkLogo, NEXT_PUBLIC_NETWORK_ICON is deliberately unset, so this
// fallback is what the app actually renders. Gold rather than navy: the mark
// needs to read against both the light and dark sidebar background, and gold
// is the one brand colour the spec uses the same way in both modes.
const IconFallback = () => {
  return (
    <NagaraLogo
      fontSize="30px"
      color={{ _light: 'gold.500', _dark: 'gold.400' }}
      aria-label={ `${ config.chain.name } network icon` }
    />
  );
};

type Props = {
  className?: string;
};

const NetworkIcon = ({ className }: Props) => {

  const iconSrc = useColorModeValue(config.chain.icon['default'], config.chain.icon.dark || config.chain.icon['default']);

  return (
    <chakra.a
      className={ className }
      href={ route({ pathname: '/' }) }
      aria-label="Link to main page"
    >
      <Image
        w="30px"
        h="30px"
        src={ iconSrc }
        alt={ `${ config.chain.name } network icon` }
        fallback={ <IconFallback/> }
        // Only meaningful for a *configured* icon with no explicit dark
        // variant — see the matching comment in NetworkLogo. Without this
        // guard the `<Image>` wrapper would clone this filter onto
        // IconFallback too and invert its already mode-aware gold colour.
        filter={ iconSrc ? { _dark: !config.chain.icon.dark ? INVERT_FILTER : undefined } : undefined }
        objectFit="contain"
        objectPosition="left"
      />
    </chakra.a>
  );
};

export default React.memo(chakra(NetworkIcon));
