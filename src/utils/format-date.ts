import { format, isToday, isYesterday, isThisWeek, isThisYear } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const formatDate = (date: Date) => {
  if (isToday(date)) return format(date, 'HH:mm', { locale: enUS });
  if (isYesterday(date)) return 'Yesterday';

  if (isThisWeek(date, { weekStartsOn: 1 })) {
    return format(date, 'EEE', { locale: enUS });
  }

  if (isThisYear(date)) return format(date, 'd MMM', { locale: enUS });

  return format(date, 'dd.MM.yyyy', { locale: enUS });
};
