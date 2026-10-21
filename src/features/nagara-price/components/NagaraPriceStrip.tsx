// SPDX-License-Identifier: LicenseRef-Blockscout

import type { GridProps } from '@chakra-ui/react';
import { Grid } from '@chakra-ui/react';
import React from 'react';

import TimeWithTooltip from 'src/shared/date-and-time/TimeWithTooltip';
import StatsWidget from 'src/shared/stats/StatsWidget';

import useNagaraPrice from '../hooks/useNagaraPrice';
import { formatCompact, formatPrice, IDR_PREFIX } from '../utils/format';

// Native coin price from the Nagara indexer, shown as a row of stat cells under
// the home page hero. Renders nothing on error so the layout below does not shift.
const NagaraPriceStrip = (props: GridProps) => {
  const { data, isPlaceholderData, isError } = useNagaraPrice();

  if (isError || !data) {
    return null;
  }

  return (
    <Grid
      as="section"
      aria-label={ `${ data.symbol } price` }
      gridTemplateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
      gridGap={{ base: 1, lg: 2 }}
      { ...props }
    >
      <StatsWidget
        label={ `${ data.symbol } price` }
        icon="tokens"
        valuePrefix={ IDR_PREFIX }
        value={ formatPrice(data.priceIdr) }
        isLoading={ isPlaceholderData }
      />
      <StatsWidget
        label="Market cap"
        icon="pie_chart_outline"
        valuePrefix={ IDR_PREFIX }
        value={ formatCompact(data.marketCapIdr) }
        hint={ `${ IDR_PREFIX }${ data.marketCapIdr.toLocaleString() }` }
        isLoading={ isPlaceholderData }
      />
      <StatsWidget
        label="Total supply"
        icon="navigation/tokens"
        value={ formatCompact(data.totalIssuance) }
        valuePostfix={ ` ${ data.symbol }` }
        hint={ `${ data.totalIssuance.toLocaleString() } ${ data.symbol }` }
        isLoading={ isPlaceholderData }
      />
      <StatsWidget
        label="Price updated"
        icon="clock-light"
        value={ <TimeWithTooltip timestamp={ data.asOf } enableIncrement timeFormat="relative"/> }
        isLoading={ isPlaceholderData }
      />
    </Grid>
  );
};

export default React.memo(NagaraPriceStrip);
