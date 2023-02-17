import { currencyEnums } from '@/types/enums/typeEnum';
import moment from 'moment';

export const getYears = () =>
  Array(2100 - 1900)
    .fill('')
    .map((v, idx) => {
      return {
        value: `${1900 + idx}`,
        label: `${1900 + idx}`,
      };
    });

export const getMonths = () =>
  Array.from({ length: 12 }).map((_, idx) => {
    return {
      value: `${idx + 1}`,
      label: moment().month(idx).format('MMMM'),
    };
  });

export const getCurrencies = () => {
  return Object.entries(currencyEnums).map(([key, label]) => {
    return {
      value: key,
      label: firstLetterUppercase(label),
    };
  });
};

export const firstLetterUppercase = (word: string) => {
  return word.substring(0, 1).toUpperCase() + word.slice(1);
};
