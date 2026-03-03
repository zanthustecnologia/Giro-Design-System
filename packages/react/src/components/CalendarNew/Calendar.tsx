import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";

import styles from "./Calendar.module.scss";

const Calendar = () => {
  const [selected, setSelected] = useState<Date>();

  return (
    <DayPicker
      captionLayout="dropdown"
      classNames={styles}
      animate
      mode="single"
      selected={selected}
      onSelect={setSelected}
      showOutsideDays 
      timeZone="America/Sao_Paulo" 
      locale={ptBR}
    />
  );
}

export default Calendar;