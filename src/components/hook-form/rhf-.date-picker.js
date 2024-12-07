import React from 'react';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import enGB from 'date-fns/locale/en-GB'; // for UK style date formatting

const RHFDatePicker = ({ name, control, label, req, InputLabelShrink, ...props }) => {
  const customStyle = req ? { borderLeft: `2px solid ${req}`} : {};

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={enGB}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            format="dd/MM/yyyy"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:focus-within': {
                  borderRadius: 0,
                },
              },
              '&:not(:focus-within) label ~ .MuiOutlinedInput-root': {
                borderRadius: 0,
                ...customStyle,
              },
              '& label': {
                marginTop: -0.8,
                fontSize: '14px',
              },
              '& .MuiInputLabel-shrink': {
                marginTop: 0,
              },
              '& input': {
                height: '7px',
              },
            }}
            label={label || 'Date'}
            value={field.value}
            onChange={(newValue) => field.onChange(newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                InputLabelProps: { shrink: InputLabelShrink },
                helperText: error?.message,
              },
            }}
            {...props}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default RHFDatePicker;
