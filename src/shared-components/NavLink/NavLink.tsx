import { NavLink as NavLinkRouter } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: JSX.Element | string;
}

const style = {
  display: 'flex',
  color: 'inherit',
  textDecoration: 'inherit',
  borderRadius: 4,
};

const NavLink = ({ to, children }: NavLinkProps) => {
  return (
    <NavLinkRouter
      to={to}
      style={({ isActive }) =>
        isActive ? { ...style, backgroundColor: '#f1f3f8' } : style
      }
    >
      {children}
    </NavLinkRouter>
  );
};

export default NavLink;
