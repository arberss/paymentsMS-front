import React from 'react';
import { IconActivity, IconCash, IconHierarchy2 } from '@tabler/icons-react';

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
    to: '/payments',
  },
  {
    icon: <IconHierarchy2 size={20} />,
    color: 'blue',
    label: 'Statuset',
    to: '/statuses',
  },
  {
    icon: <IconActivity size={20} />,
    color: 'blue',
    label: 'Veprimet',
    to: '/actions',
  },
];
