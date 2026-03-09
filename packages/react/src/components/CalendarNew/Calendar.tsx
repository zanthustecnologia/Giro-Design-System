import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import * as React from 'react';

import './Calendar.modules.scss';
import { CalendarProps } from './Calendar.types';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('pt-br');

const Calendar: React.FC<CalendarProps> = ({ 
  selectedDate, 
  currentDate, 
  timezone ="America/Sao_Paulo",
  locale = "pt-br",
  
}) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(selectedDate));

  return (
    <div className="myCalendar">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
        <DateCalendar 
          views={['year', 'month', 'day']}
          dayOfWeekFormatter={(day) => day.format('ddd')} 
          value={value} 
          onChange={(newValue) => setValue(newValue)} 
          timezone={timezone}
        />
      </LocalizationProvider>
    </div>
  );
}


export default Calendar