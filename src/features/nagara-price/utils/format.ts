// SPDX-License-Identifier: LicenseRef-Blockscout

// The Nagara indexer prices the coin in Indonesian rupiah. The prefix matches the
// top bar price (src/shell/top-bar/TopBarStats.tsx).
export const IDR_PREFIX = 'Rp ';

const PRICE_FORMAT: Intl.NumberFormatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 6 };
const COMPACT_FORMAT: Intl.NumberFormatOptions = { maximumFractionDigits: 2, notation: 'compact' };

export function formatPrice(value: number): string {
  return value.toLocaleString(undefined, PRICE_FORMAT);
}

export function formatCompact(value: number): string {
  return value.toLocaleString(undefined, COMPACT_FORMAT);
}
