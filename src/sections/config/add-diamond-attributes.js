import * as Yup from 'yup';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import axios from 'axios';
import { ASSETS_API } from '../../config-global';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../auth/hooks';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Iconify from '../../components/iconify';
import { useGetDiamondAttributes } from '../../api/diamond-attributes';

// ----------------------------------------------------------------------

export default function AddDiamondAttributes() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  const { diamondAttributes, mutate } = useGetDiamondAttributes();

  const validationSchema = useMemo(() => Yup.object().shape({
    diamondValue: Yup.string().required('Diamond Value is required'),
    diamondAttribute: Yup.string().required('Diamond Attribute is required'),
  }), []);

  const defaultValues = useMemo(() => ({
    diamondValue: '',
    diamondAttribute: '',
  }), []);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { setValue, handleSubmit, formState: { isSubmitting, errors } } = methods;

  const onSubmit = useCallback(async (data) => {
    try {
      const payload = {
        diamondValue: data.diamondValue,
        diamondAttribute: data.diamondAttribute,
      };

      const response = await axios.post(
        `${ASSETS_API}/api/company/${user?.company}/diamond-attributes`,
        payload,
        { headers: { 'Content-Type': 'application/json' } },
      );
      mutate();
      enqueueSnackbar('Diamond attributes updated successfully!', { variant: 'success' });
    } catch (error) {
      console.error('Error updating diamond attributes:', error);
      enqueueSnackbar('Failed to update diamond attributes.', { variant: 'error' });
    }
  }, [user?.company, enqueueSnackbar]);

  const handleDelete = useCallback(async (attributeId) => {
    try {
      await axios.delete(
        `${ASSETS_API}/api/company/${user?.company}/diamond-attributes`,
        {
          headers: { 'Content-Type': 'application/json' },
          data: { ids: [attributeId] },
        },
      );
      mutate();
      enqueueSnackbar('Diamond attribute deleted successfully!', { variant: 'success' });
    } catch (error) {
      console.error('Error deleting diamond attribute:', error);
      enqueueSnackbar('Failed to delete diamond attribute.', { variant: 'error' });
    }
  }, [user?.company, enqueueSnackbar]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              Add Diamond Attribute
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <RHFAutocomplete
                  name='diamondAttribute'
                  label='Select Diamond Attribute'
                  options={['color', 'cut', 'clarity', 'carat', 'shape']}
                  required
                  error={!!errors.diamondAttribute}
                  helperText={errors.diamondAttribute?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField
                  name='diamondValue'
                  label='Diamond Value'
                  required
                  error={!!errors.diamondValue}
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                  }}
                  helperText={errors.diamondValue?.message}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box display='flex' justifyContent='flex-end' sx={{ mt: 3 }}>
            <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
              Submit
            </LoadingButton>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              Existing Diamond Attributes
            </Typography>
            <List>
              {diamondAttributes?.map((attribute) => (
                <ListItem
                  key={attribute._id}
                  secondaryAction={
                    <IconButton edge='end' onClick={() => handleDelete(attribute._id)}>
                      <Iconify icon='material-symbols:delete' width={24} />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={<Typography variant='body1'
                                         fontWeight='bold'>{`${attribute.diamondAttribute}: ${attribute.diamondValue}`}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
