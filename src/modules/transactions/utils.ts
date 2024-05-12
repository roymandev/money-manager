import { TTransaction, TTransactionGroup } from './types';

export const groupTransByDate = (items: TTransaction[]) =>
  items.reduce((acc: TTransactionGroup[], item) => {
    const index = acc.findIndex((i) => i.date === item.date);

    if (index === -1) {
      acc.push({
        date: item.date,
        items: [item],
        total: item.amount,
      });
    } else {
      acc[index].items.push(item);
      acc[index].total += item.amount;
    }

    return acc;
  }, []);
