// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import type appConfig from 'src/config';

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from 'vitest/lib';

import { NAGARA_PRICE } from '../stubs';
import useNagaraPrice, { NAGARA_PRICE_API_URL } from './useNagaraPrice';

const { mockFetch } = vi.hoisted(() => ({
  mockFetch: vi.fn(),
}));

vi.mock('src/api/hooks/useFetch', () => ({
  'default': () => mockFetch,
}));

vi.mock('src/config', async(importOriginal) => {
  const original = await importOriginal<{ 'default': typeof appConfig }>();

  return {
    'default': {
      ...original.default,
      features: {
        ...original.default.features,
        nagaraPrice: { isEnabled: true, apiUrl: 'https://indexer.example.com/price', network: 'testnet' },
      },
    },
  };
});

const RESPONSE = {
  ...NAGARA_PRICE,
  priceIdr: 512.34,
  asOf: '2026-10-21T07:41:49.420Z',
};

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });
  return <QueryClientProvider client={ queryClient }>{ children }</QueryClientProvider>;
}

describe('useNagaraPrice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches the price through the node-api proxy route', async() => {
    mockFetch.mockResolvedValue(RESPONSE);

    const { result } = renderHook(() => useNagaraPrice(), { wrapper });

    await waitFor(() => expect(result.current.isPlaceholderData).toBe(false));

    expect(mockFetch).toHaveBeenCalledWith(NAGARA_PRICE_API_URL);
    expect(result.current.data).toEqual(RESPONSE);
  });

  it('shows placeholder data while loading', () => {
    mockFetch.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useNagaraPrice(), { wrapper });

    expect(result.current.isPlaceholderData).toBe(true);
    expect(result.current.data).toEqual(NAGARA_PRICE);
  });

  it('reports an error when the request fails', async() => {
    mockFetch.mockRejectedValue({ status: 502 });

    const { result } = renderHook(() => useNagaraPrice(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
