import './authLayout.scss';

interface AuthLayoutProps {
  title?: string;
  children: JSX.Element;
}

const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return (
    <div className='authLayout'>
      <div className='authLayout__wrapper'>
        <div className='authLayout__title'>{title}</div>
        <div className='authLayout__content'>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
