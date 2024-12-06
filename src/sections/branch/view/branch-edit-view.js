'use client';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { _userList } from 'src/_mock';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import BranchNewEditForm from '../branch-new-edit-form';

// ----------------------------------------------------------------------

export default function BranchEditView({ id }) {
  const settings = useSettingsContext();

  const currentBranch = _userList.find((user) => user.id === id);

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
            name: 'Branch',
            href: paths.dashboard.branch.list,
          },
          { name: currentBranch?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <BranchNewEditForm currentBranch={currentBranch} />
    </Container>
  );
}

BranchEditView.propTypes = {
  id: PropTypes.string,
};
