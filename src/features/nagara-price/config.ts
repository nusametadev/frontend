// SPDX-License-Identifier: LicenseRef-Blockscout

import type { NagaraPriceNetwork } from './types/api';

import chainConfig from 'src/slices/chain/config';

import { getEnvValue } from 'src/config/utils/envs';
import type { Feature } from 'src/config/utils/features';

function getApiUrl(): string | undefined {
  try {
    const envValue = getEnvValue('NEXT_PUBLIC_NAGARA_PRICE_API_HOST');
    return new URL('/price', envValue).toString();
  } catch (error) {
    return;
  }
}

const title = 'Nagara price';

const config: Feature<{ apiUrl: string; network: NagaraPriceNetwork }> = (() => {
  const apiUrl = getApiUrl();

  if (apiUrl) {
    return Object.freeze({
      title,
      isEnabled: true,
      apiUrl,
      network: chainConfig.isTestnet ? 'testnet' : 'mainnet',
    });
  }

  return Object.freeze({
    title,
    isEnabled: false,
  });
})();

export default config;
