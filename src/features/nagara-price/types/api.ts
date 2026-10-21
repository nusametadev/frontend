// SPDX-License-Identifier: LicenseRef-Blockscout

export type NagaraPriceNetwork = 'mainnet' | 'testnet';

// Response of the Nagara indexer `GET /price?network=<mainnet|testnet>` endpoint.
export interface NagaraPrice {
  network: NagaraPriceNetwork;
  symbol: string;
  decimals: number;
  priceIdr: number;
  marketCapIdr: number;
  totalIssuanceRaw: string;
  totalIssuance: number;
  asOf: string;
}
