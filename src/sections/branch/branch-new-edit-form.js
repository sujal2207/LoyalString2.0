import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
} from 'src/components/hook-form';
import countrystatecity from '../../_mock/map/csc.json';

export default function BranchNewEditForm({ currentCompany }) {
  const { enqueueSnackbar } = useSnackbar();

  const NewBranchSchema = Yup.object().shape({
    branchCode: Yup.string().required('Branch Code is required'),
    companyId: Yup.string().required('Company ID is required'),
    branchName: Yup.string().required('Branch Name is required'),
    branchType: Yup.string().required('Branch Type is required'),
    branchHead: Yup.string().required('Branch Head is required'),
    branchAddress: Yup.string().required('Branch Address is required'),
    mobileNumber: Yup.string().required('Mobile Number is required'),
    faxNumber: Yup.string(),
    branchEmailId: Yup.string()
      .required('Branch Email ID is required')
      .email('Invalid email address'),
    financialYear: Yup.string().required('Financial Year is required'),
    gstin: Yup.string().required('GSTIN is required'),
    websiteUrl: Yup.string(),
    street: Yup.string().required('Street is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    postalCode: Yup.string().required('Postal Code is required'),
  });

  // Default values
  const defaultValues = useMemo(
    () => ({
      branchCode: '',
      companyId: '',
      branchName: '',
      branchType: '',
      branchHead: '',
      branchAddress: '',
      mobileNumber: '',
      faxNumber: '',
      branchEmailId: '',
      financialYear: '',
      gstin: '',
      websiteUrl: '',
      street: '',
      country: '',
      state: '',
      city: '',
      postalCode: '',
    }),
    [],
  );

  const methods = useForm({
    resolver: yupResolver(NewBranchSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.info('Form Data:', data);
      enqueueSnackbar('Branch saved successfully!');
      reset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {/* Form Fields */}
        <Grid xs={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display='grid'
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)', // Three fields per row
              }}
            >
              {/* Branch Details */}
              <RHFTextField name='branchCode' label='Branch Code' />
              <RHFAutocomplete
                name='companyId'
                label='Company ID'
                placeholder='Choose a company'
                options={['Company A', 'Company B']} // Example options
              />
              <RHFTextField name='branchName' label='Branch Name' />
              <RHFAutocomplete
                name='branchType'
                label='Branch Type'
                placeholder='Select branch type'
                options={['Type A', 'Type B']} // Example options
              />
              <RHFTextField name='branchHead' label='Branch Head' />
              <RHFTextField name='branchAddress' label='Branch Address' />
              <RHFTextField name='mobileNumber' label='Mobile Number' />
              <RHFTextField name='faxNumber' label='Fax Number' />
              <RHFTextField name='branchEmailId' label='Branch Email ID' />
              <RHFTextField name='financialYear' label='Financial Year' />
              <RHFTextField name='gstin' label='GSTIN' />

              {/* Address Details */}
              <RHFTextField name='websiteUrl' label='Website URL' />
              <RHFTextField name='street' label='Street' />
              <RHFAutocomplete
                name='country'
                req={'red'}
                label='Country'
                placeholder='Choose a country'
                options={countrystatecity.map((country) => country.name)}
                isOptionEqualToValue={(option, value) => option === value}
                defaultValue='India'
              />
              <RHFAutocomplete
                name='state'
                req={'red'}
                label='State'
                placeholder='Choose a State'
                options={
                  watch('country')
                    ? countrystatecity
                    .find((country) => country.name === watch('country'))
                    ?.states.map((state) => state.name) || []
                    : []
                }
                defaultValue='Gujarat'
                isOptionEqualToValue={(option, value) => option === value}
              />
              <RHFAutocomplete
                name='city'
                label='City'
                req={'red'}
                placeholder='Choose a City'
                options={
                  watch('state')
                    ? countrystatecity
                    .find((country) => country.name === watch('country'))
                    ?.states.find((state) => state.name === watch('state'))
                    ?.cities.map((city) => city.name) || []
                    : []
                }
                defaultValue='Surat'
                isOptionEqualToValue={(option, value) => option === value}
              />
              <RHFTextField name='postalCode' label='Postal Code' />
            </Box>

            <Stack alignItems='flex-end' sx={{ mt: 3 }}>
              <LoadingButton
                type='submit'
                variant='contained'
                loading={isSubmitting}
              >
                Save Branch
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

BranchNewEditForm.propTypes = {
  currentCompany: PropTypes.object,
};
