'use client';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { _userList } from 'src/_mock';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import BankAccountNewEditForm from '../bankAccount-new-edit-form';

// ----------------------------------------------------------------------

export default function BankAccountEditView({ id }) {
  const settings = useSettingsContext();

  const currentBankAccount = _userList.find((user) => user.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading='Edit'
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Bank Account',
            href: paths.dashboard.bankaccount.list,
          },
          { name: currentBankAccount?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <BankAccountNewEditForm currentBankAccount={currentBankAccount} />
    </Container>
  );
}

BankAccountEditView.propTypes = {
  id: PropTypes.string,
};
