import React from 'react';
import { IconCash } from '@tabler/icons-react';

export interface LinkDataProps {
  icon: JSX.Element;
  color: string;
  label: string;
  to: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const linkData: LinkDataProps[] = [
  {
    icon: <IconCash size={20} />,
    color: 'blue',
    label: 'Pagesat',
    to: '/dashboard/payments',
  },
];
