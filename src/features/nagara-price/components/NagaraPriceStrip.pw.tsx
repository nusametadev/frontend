import React from 'react';

import type { NagaraPrice } from '../types/api';

import { test, expect } from 'playwright/lib';
import * as pwConfig from 'playwright/utils/config';

import { NAGARA_PRICE_API_URL } from '../hooks/useNagaraPrice';
import NagaraPriceStrip from './NagaraPriceStrip';

const DATA: NagaraPrice = {
  network: 'testnet',
  symbol: 'tNGRX',
  decimals: 18,
  priceIdr: 500.00001,
  marketCapIdr: 500_000_000_000,
  totalIssuanceRaw: '999999978918803809527182531',
  totalIssuance: 999_999_978.9188038,
  // playwright/index.ts pins the clock to 2022-11-11T12:00:00Z
  asOf: '2022-11-11T11:59:30.000Z',
};

test.beforeEach(async({ mockEnvs }) => {
  await mockEnvs([
    [ 'NEXT_PUBLIC_NAGARA_PRICE_API_HOST', 'https://indexer.example.com' ],
  ]);
});

test('base view +@dark-mode', async({ render, page }) => {
  await page.route(`**${ NAGARA_PRICE_API_URL }`, (route) => route.fulfill({ status: 200, json: DATA }));

  const component = await render(<NagaraPriceStrip/>);

  await expect(component.getByText('Rp 500.00001')).toBeVisible();
  await expect(component).toHaveScreenshot();
});

test('loading state', async({ render, page }) => {
  // never resolves, so the placeholder skeleton stays on screen
  await page.route(`**${ NAGARA_PRICE_API_URL }`, () => {});

  const component = await render(<NagaraPriceStrip/>);

  await expect(component).toHaveScreenshot();
});

test('renders nothing on error', async({ render, page }) => {
  await page.route(`**${ NAGARA_PRICE_API_URL }`, (route) => route.fulfill({ status: 502, json: { error: 'Failed to fetch Nagara price' } }));

  await render(<NagaraPriceStrip/>);

  await expect(page.getByRole('region', { name: 'tNGRX price' })).toHaveCount(0);
});

test.describe('mobile', () => {
  test.use({ viewport: pwConfig.viewport.mobile });

  test('base view', async({ render, page }) => {
    await page.route(`**${ NAGARA_PRICE_API_URL }`, (route) => route.fulfill({ status: 200, json: DATA }));

    const component = await render(<NagaraPriceStrip/>);

    await expect(component.getByText('Rp 500.00001')).toBeVisible();
    await expect(component).toHaveScreenshot();
  });
});
