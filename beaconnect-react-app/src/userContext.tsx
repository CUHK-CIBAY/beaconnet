import React, { createContext, useContext, useCallback, useMemo } from 'react';

import AUTH from './config/constants';

type Props = {
  children: React.ReactNode;
};

type Context = {
  signIn: (_token: string) => void;
  signOut: () => void;
};

const UserContext = createContext<Context>({
  signIn: () => {},
  signOut: () => {},
});

function UserContextProvider({ children }: Props) {
  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH.token);
  }, []);

  const signIn = useCallback((token: string) => {
    const now = new Date();
    const authTOKEN = {
      value: token,
      // expire in 1 day
      expiry: now.getTime() + 86400000,
    };
    localStorage.setItem(AUTH.token, JSON.stringify(authTOKEN));
  }, []);

  const contextValue = useMemo(
    () => ({
      signIn,
      signOut,
    }),
    [signIn, signOut],
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUserContext was used outside of its Provider');
  }

  return context;
};

export default UserContextProvider;
