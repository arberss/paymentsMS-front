import React from 'react';
import { IconCash, IconHierarchy2 } from '@tabler/icons-react';

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
  {
    icon: <IconHierarchy2 size={20} />,
    color: 'blue',
    label: 'Statuset',
    to: '/dashboard/statuses',
  },
];
