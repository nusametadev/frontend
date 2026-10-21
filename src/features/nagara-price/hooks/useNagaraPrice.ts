// SPDX-License-Identifier: LicenseRef-Blockscout

import { useQuery } from '@tanstack/react-query';

import type { NagaraPrice } from '../types/api';

import useFetch from 'src/api/hooks/useFetch';

import config from 'src/config';

import { MINUTE } from 'src/toolkit/utils/consts';

import { NAGARA_PRICE } from '../stubs';

const feature = config.features.nagaraPrice;

// Same-origin route that proxies the Nagara indexer (see src/pages/api/nagara-price.ts).
export const NAGARA_PRICE_API_URL = '/node-api/nagara-price';

export default function useNagaraPrice() {
  const fetch = useFetch();

  return useQuery<NagaraPrice>({
    queryKey: [ 'external:nagara_price', feature.isEnabled ? feature.network : undefined ],
    queryFn: async() => fetch(NAGARA_PRICE_API_URL) as Promise<NagaraPrice>,
    enabled: feature.isEnabled,
    placeholderData: NAGARA_PRICE,
    refetchInterval: MINUTE,
  });
}
