import { describe, it, expect } from 'vitest';

import { formatCompact, formatPrice } from './format';

describe('formatPrice', () => {
  it('keeps at least two fraction digits', () => {
    expect(formatPrice(500)).toBe((500).toLocaleString(undefined, { minimumFractionDigits: 2 }));
  });

  it('keeps up to six fraction digits', () => {
    expect(formatPrice(500.00001)).toBe((500.00001).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }));
  });
});

describe('formatCompact', () => {
  it('abbreviates large numbers', () => {
    expect(formatCompact(500_000_000_000)).toBe((500_000_000_000).toLocaleString(undefined, { maximumFractionDigits: 2, notation: 'compact' }));
  });
});
