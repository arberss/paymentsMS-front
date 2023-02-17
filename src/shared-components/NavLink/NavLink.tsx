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
  margin: '5px 0',
};

const NavLink = ({ to, children }: NavLinkProps) => {
  return (
    <NavLinkRouter
      to={to}
      style={({ isActive }) =>
        isActive ? { ...style, backgroundColor: 'rgba(165, 216, 255, 0.2)', borderBottom: 'none' } : style
      }
    >
      {children}
    </NavLinkRouter>
  );
};

export default NavLink;
