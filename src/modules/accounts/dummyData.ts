import { TAccount } from './types';

export const DUMMY_ACCOUNTS: {
  id: number;
  title: string;
  data: TAccount[];
}[] = [
  {
    id: 1,
    title: 'Cash',
    data: [
      {
        id: 1,
        name: 'Cash',
        balance: 465000,
      },
    ],
  },
  {
    id: 2,
    title: 'Banks',
    data: [
      {
        id: 2,
        name: 'BCA',
        balance: 246554,
      },
    ],
  },
  {
    id: 3,
    title: 'Savings',
    data: [
      {
        id: 3,
        name: 'Tabungan',
        balance: 8795520,
      },
    ],
  },
  {
    id: 4,
    title: 'Loans',
    data: [
      {
        id: 4,
        name: 'Kredivo',
        balance: -4997550,
      },
      {
        id: 5,
        name: 'Teman',
        balance: -500000,
      },
    ],
  },
];
