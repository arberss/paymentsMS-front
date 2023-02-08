import { Navbar as MantineNavbar } from '@mantine/core';
import { linkData, LinkDataProps } from './Links/helper';
import MainLinks from './Links/MainLinks';
import NavbarHeader from './NavbarHeader';
import { IconLogout } from '@tabler/icons-react';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/auth/loginSlice';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  isOpen: boolean;
}

const Navbar = ({ isOpen }: NavbarProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const linkDataFooter: LinkDataProps[] = [
    {
      icon: <IconLogout size={20} />,
      color: 'orange',
      label: 'Dil',
      to: '/auth/login',
      onClick: () => {
        dispatch(logout());
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
