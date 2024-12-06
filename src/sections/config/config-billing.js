import PropTypes from 'prop-types';

import Grid from '@mui/material/Unstable_Grid2';

import ConfigBillingPlan from './config-billing-plan';
import ConfigBillingPayment from './config-billing-payment';
import ConfigBillingHistory from './config-billing-history';
import ConfigBillingAddress from './config-billing-address';

// ----------------------------------------------------------------------

export default function AccountBilling({ cards, plans, invoices, addressBook }) {
  return (
    <Grid container spacing={5} disableEqualOverflow>
      <Grid xs={12} md={8}>
        <ConfigBillingPlan plans={plans} cardList={cards} addressBook={addressBook} />

        <ConfigBillingPayment cards={cards} />

        <ConfigBillingAddress addressBook={addressBook} />
      </Grid>

      <Grid xs={12} md={4}>
        <ConfigBillingHistory invoices={invoices} />
      </Grid>
    </Grid>
  );
}

AccountBilling.propTypes = {
  addressBook: PropTypes.array,
  cards: PropTypes.array,
  invoices: PropTypes.array,
  plans: PropTypes.array,
};
