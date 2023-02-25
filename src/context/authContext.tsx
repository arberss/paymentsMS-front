import { createContext, useState } from 'react';

const AuthContext = createContext({
  isAuth: false,
  token: null,
  handleLogin: (value: string) => {},
  handleLogout: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState<any>(null);

  const handleLogin = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
    setIsAuth(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        token,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
