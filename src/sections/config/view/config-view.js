'use client';
import { useState, useEffect, useCallback } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import CompanyConfig from '../company-config';
import { useAuthContext } from '../../../auth/hooks';
import axios from 'axios';
import { ASSETS_API } from '../../../config-global';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'company',
    label: 'Company',
    icon: <Iconify icon='mdi:company' width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function ConfigView() {
  const settings = useSettingsContext();
  const [currentTab, setCurrentTab] = useState('company');
  const { user } = useAuthContext();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    if (user?.company && user?._id) {
      axios
        .get(`${ASSETS_API}/api/company/${user?.company}/user/${user?._id}`)
        .then((response) => {
          setCompany(response?.data?.data?.company);
        })
        .catch((error) => {
          console.error('Error fetching company details:', error);
        });
    }
  }, [user]);

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading='Account'
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Config' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {(currentTab === 'company' && company && user) && (
        <CompanyConfig company={company} setCompany={setCompany} user={user} />
      )}
    </Container>
  );
}
