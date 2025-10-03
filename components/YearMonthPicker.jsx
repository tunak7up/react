import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function YearMonthPicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <DatePicker label="Tháng" views={['month']} />
        <DatePicker label="Năm" views={['year']} />        
      </div>
    </LocalizationProvider>
  );
}
