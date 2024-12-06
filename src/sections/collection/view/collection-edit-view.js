'use client';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { _userList } from 'src/_mock';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import CollectionNewEditForm from '../collection-new-edit-form';

// ----------------------------------------------------------------------

export default function CollectionEditView({ id }) {
  const settings = useSettingsContext();

  const currentCollection = _userList.find((user) => user.id === id);

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
            name: 'Collection',
            href: paths.dashboard.collection.list,
          },
          { name: currentCollection?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CollectionNewEditForm currentCollection={currentCollection} />
    </Container>
  );
}

CollectionEditView.propTypes = {
  id: PropTypes.string,
};
