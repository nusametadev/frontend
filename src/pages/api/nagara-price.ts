// SPDX-License-Identifier: LicenseRef-Blockscout

import type { NextApiRequest, NextApiResponse } from 'next';
import nodeFetch from 'node-fetch';

import metrics from 'src/server/monitoring/metrics';
import { httpLogger } from 'src/server/utils/logger';

import config from 'src/config';

import { SECOND } from 'src/toolkit/utils/consts';

const feature = config.features.nagaraPrice;

const REQUEST_TIMEOUT = 5 * SECOND;

// The Nagara indexer sends no CORS headers, so the browser cannot call it directly.
// This route fetches it server-side. The target URL is built from config only
// (nothing from the incoming request), so it cannot be used to reach other hosts.
export default async function nagaraPriceHandler(req: NextApiRequest, res: NextApiResponse) {
  if (!feature.isEnabled) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  const url = new URL(feature.apiUrl);
  url.searchParams.set('network', feature.network);

  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort('Request to Nagara price API timed out');
  }, REQUEST_TIMEOUT);

  try {
    const requestEndTime = metrics?.apiRequestDuration.startTimer();
    const response = await nodeFetch(url.toString(), { signal: controller.signal });
    const duration = requestEndTime?.({ route: '/nagara-price', code: response.status });

    if (response.status !== 200) {
      httpLogger.logger.error({ message: 'API fetch', url: url.toString(), code: response.status, duration });
      throw new Error(`Nagara price API responded with ${ response.status }`);
    }

    httpLogger.logger.info({ message: 'API fetch', url: url.toString(), code: response.status, duration });

    const data = await response.json();

    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
    res.status(200).json(data);
  } catch (error) {
    res.status(502).json({ error: 'Failed to fetch Nagara price' });
  } finally {
    clearTimeout(timeout);
  }
}
