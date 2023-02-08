import { DefaultMantineColor, Divider, Text } from '@mantine/core';

interface NavbarHeaderProps {
  title?: string;
  color?: DefaultMantineColor;
}

const NavbarHeader = ({
  title = '',
  color = 'gray',
}: NavbarHeaderProps) => {
  return (
    <>
      <Text color={color}>{title}</Text>
      <Divider my='sm' />
    </>
  );
};

export default NavbarHeader;
