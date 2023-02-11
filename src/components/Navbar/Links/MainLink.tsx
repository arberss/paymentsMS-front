import React from 'react';
import NavLink from '@/shared-components/NavLink/NavLink';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  to: string;
  onClick?: (e: React.MouseEvent) => void;
}

function MainLink({ icon, color, label, to, onClick }: MainLinkProps) {
  return (
    <NavLink to={to}>
      <UnstyledButton
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[1],
          },
        })}
        onClick={onClick}
      >
        <Group>
          <ThemeIcon color={color} variant='light'>
            {icon}
          </ThemeIcon>

          <Text sx={{fontSize: 15, letterSpacing: 0.2}}>{label}</Text>
        </Group>
      </UnstyledButton>
    </NavLink>
  );
}

export default MainLink;
