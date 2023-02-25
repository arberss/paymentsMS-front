import { Navbar as MantineNavbar } from '@mantine/core';
import { linkData, LinkDataProps } from './links/helper';
import MainLinks from './links/MainLinks';
import NavbarHeader from './NavbarHeader';
import { IconLogout } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '@/context/authContext';
import { useContext } from 'react';

interface NavbarProps {
  isOpen: boolean;
}

const Navbar = ({ isOpen }: NavbarProps) => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  const linkDataFooter: LinkDataProps[] = [
    {
      icon: <IconLogout size={20} />,
      color: 'orange',
      label: 'Dil',
      to: '/auth/login',
      onClick: () => {
        handleLogout();
        navigate('/auth/login');
      },
    },
  ];

  return (
    <MantineNavbar
      p='md'
      hiddenBreakpoint='md'
      hidden={!isOpen}
      width={{ md: 250 }}
    >
      <MantineNavbar.Section>
        <NavbarHeader />
      </MantineNavbar.Section>
      <MantineNavbar.Section grow mt='md'>
        <MainLinks linkData={linkData} />
      </MantineNavbar.Section>
      <MantineNavbar.Section mt='md'>
        <MainLinks linkData={linkDataFooter} />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
