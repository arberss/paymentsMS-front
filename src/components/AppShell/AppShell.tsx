import {
  AppShell,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';

interface AppShellLayoutProps {
  children: JSX.Element;
}

const AppShellLayout = ({ children }: AppShellLayoutProps) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint='sm'
      navbar={<Navbar isOpen={opened} />}
      header={
        <MediaQuery largerThan='md' styles={{ display: 'none' }}>
          <Header height={{ base: 50, md: 0 }} p='md'>
            <div
              style={{ display: 'flex', alignItems: 'center', height: '100%' }}
            >
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size='sm'
                color={theme.colors.gray[6]}
                mr='xl'
              />
            </div>
          </Header>
        </MediaQuery>
      }
    >
      {children}
    </AppShell>
  );
};

export default AppShellLayout;
