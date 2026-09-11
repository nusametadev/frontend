// SPDX-License-Identifier: LicenseRef-Blockscout

import { chakra, Flex } from '@chakra-ui/react';
import { route } from 'nextjs-routes';
import React from 'react';

import config from 'src/config';
import NagaraLogo from 'src/shared/brand/NagaraLogo';

import { useColorModeValue } from 'src/toolkit/chakra/color-mode';
import { Image } from 'src/toolkit/chakra/image';

import { INVERT_FILTER } from './consts';

// Nagara's mark plus the network name, in place of Blockscout's wordmark. This
// is the fallback the app actually renders: NEXT_PUBLIC_NETWORK_LOGO is
// deliberately unset, because the logo is part of the design system rather than
// something each deployment supplies.
//
// The name is read from config rather than written here, so it stays correct if
// the network is ever renamed.
const LogoFallback = () => {
  const name = config.chain.shortName || config.chain.name;

  return (
    <Flex alignItems="center" columnGap={ 2 } aria-label={ `${ name } network logo` }>
      <NagaraLogo fontSize="26px" color="primaryRed.500"/>
      <chakra.span textStyle="heading.md" fontWeight="bold" color="primaryRed.500" whiteSpace="nowrap">
        { name }
      </chakra.span>
    </Flex>
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
        filter={{ _dark: !config.chain.logo.dark ? INVERT_FILTER : undefined }}
        objectFit="contain"
        objectPosition="left"
      />
    </chakra.a>
  );
};

export default React.memo(chakra(NetworkLogo));
