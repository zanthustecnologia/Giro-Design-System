// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Types for translations
interface CalendarTranslations {
  today: string;
  selected: string;
  monthChanged: string;
  yearChanged: string;
  calendar: string;
  yearSelection: string;
  previousMonth: string;
  nextMonth: string;
  previousYears: string;
  nextYears: string;
  openYearSelection: string;
  closeYearSelection: string;
  currentYear: string;
  selectYear: string;
  monthNames: {
    january: string;
    february: string;
    march: string;
    april: string;
    may: string;
    june: string;
    july: string;
    august: string;
    september: string;
    october: string;
    november: string;
    december: string;
  };
  weekDays: {
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
  };
  weekDaysShort: {
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
  };
}

// Resources configuration
const resources = {
  'pt-br': {
    translation: {
      today: 'Hoje',
      selected: 'Selecionado',
      monthChanged: 'Mês alterado para {{month}}',
      yearChanged: 'Ano alterado para {{year}}',
      calendar: 'Calendário',
      yearSelection: 'Seleção de ano',
      previousMonth: 'Mês anterior, {{month}}',
      nextMonth: 'Próximo mês, {{month}}',
      previousYears: 'Mostrar anos anteriores',
      nextYears: 'Mostrar próximos anos',
      openYearSelection: 'Abrir seleção de ano',
      closeYearSelection: 'Fechar seleção de ano',
      currentYear: 'Ano atual, {{year}}',
      selectYear: 'Selecionar ano {{year}}',
      monthNames: {
        january: 'Janeiro',
        february: 'Fevereiro',
        march: 'Março',
        april: 'Abril',
        may: 'Maio',
        june: 'Junho',
        july: 'Julho',
        august: 'Agosto',
        september: 'Setembro',
        october: 'Outubro',
        november: 'Novembro',
        december: 'Dezembro'
      },
      weekDays: {
        sunday: 'Domingo',
        monday: 'Segunda-feira',
        tuesday: 'Terça-feira',
        wednesday: 'Quarta-feira',
        thursday: 'Quinta-feira',
        friday: 'Sexta-feira',
        saturday: 'Sábado'
      },
      weekDaysShort: {
        sunday: 'D',
        monday: 'S',
        tuesday: 'T',
        wednesday: 'Q',
        thursday: 'Q',
        friday: 'S',
        saturday: 'S'
      }
    }
  },
  'en-us': {
    translation: {
      today: 'Today',
      selected: 'Selected',
      monthChanged: 'Month changed to {{month}}',
      yearChanged: 'Year changed to {{year}}',
      calendar: 'Calendar',
      yearSelection: 'Year selection',
      previousMonth: 'Previous month, {{month}}',
      nextMonth: 'Next month, {{month}}',
      previousYears: 'Show previous years',
      nextYears: 'Show next years',
      openYearSelection: 'Open year selection',
      closeYearSelection: 'Close year selection',
      currentYear: 'Current year, {{year}}',
      selectYear: 'Select year {{year}}',
      monthNames: {
        january: 'January',
        february: 'February',
        march: 'March',
        april: 'April',
        may: 'May',
        june: 'June',
        july: 'July',
        august: 'August',
        september: 'September',
        october: 'October',
        november: 'November',
        december: 'December'
      },
      weekDays: {
        sunday: 'Sunday',
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday'
      },
      weekDaysShort: {
        sunday: 'S',
        monday: 'M',
        tuesday: 'T',
        wednesday: 'W',
        thursday: 'T',
        friday: 'F',
        saturday: 'S'
      }
    }
  }
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt-br',
    fallbackLng: 'en-us',
    interpolation: {
      escapeValue: false
    },
    returnObjects: false, // Ensure we don't return objects
    returnEmptyString: true,
    returnNull: false
  });

// Helper function to ensure string return
const safeTranslate = (key: string, options?: any): string => {
  try {
    const result = i18n.t(key, { ...options, returnObjects: false });
    return typeof result === 'string' ? result : String(result);
  } catch (error) {
    console.warn(`Translation error for key: ${key}`, error);
    return key; // Fallback to key
  }
};

// Change language function
const changeLanguage = (lng: 'pt-br' | 'en-us') => {
  return i18n.changeLanguage(lng);
};

// Custom hook for calendar translations
export const useCalendarTranslation = () => {
  return {
    t: (key: keyof CalendarTranslations | string, options?: any): string => {
      return safeTranslate(key as string, options);
    },
    i18n,
    changeLanguage,
    currentLanguage: i18n.language as 'pt-br' | 'en-us'
  };
};

export default i18n;