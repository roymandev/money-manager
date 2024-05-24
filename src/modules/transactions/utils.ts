import { isSameDay, startOfDay } from 'date-fns';

import { FlashListSections } from '@/types';

import { TTransaction, TTransactionGroup } from './types';

export const groupTransByDate = (items: TTransaction[]) =>
  items.reduce((acc: TTransactionGroup[], item) => {
    const index = acc.findIndex((i) => isSameDay(i.date, item.date));
    const currentDate = startOfDay(item.date);

    if (index === -1) {
      acc.push({
        date: currentDate.toISOString(),
        items: [item],
        total: item.amount,
      });
    } else {
      acc[index].items.push(item);
      acc[index].total += item.amount;
    }

    return acc;
  }, []);

export const addTransSectionsHeader = <T extends TTransaction>(items: T[]) => {
  const sections: FlashListSections<T> = [];
  let headerIndex = -1;
  let headerAmount = 0;
  let headerDate = '';
  let headersCount = 0;

  const updateHeader = () => {
    sections[headerIndex] = [headerDate, headerAmount];
  };

  items.forEach((item, index) => {
    const date = startOfDay(item.date).toISOString();

    if (date !== headerDate) {
      if (headerIndex !== -1) updateHeader();

      sections.push([item.date, item.amount]);
      headerIndex = index + headersCount;
      headerDate = date;
      headersCount += 1;
      headerAmount = 0;
    }

    headerAmount += item.amount;
    sections.push(item);
  });

  updateHeader();

  return sections;
};
