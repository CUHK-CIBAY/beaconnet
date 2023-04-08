import React, { createContext, useContext, useCallback, useMemo } from 'react';

import AUTH from './config/constants';

type Props = {
  children: React.ReactNode;
};

type Context = {
  // eslint-disable-next-line no-unused-vars
  signIn: (token: string) => void;
  signOut: () => void;
};

const UserContext = createContext<Context>({
  signIn: () => {},
  signOut: () => {},
});

// eslint-disable-next-line no-undef
const UserContextProvider = ({ children }: Props) => {
  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH.token);
  }, []);

  const signIn = useCallback((token: string) => {
    localStorage.setItem(AUTH.token, token);
  }, []);

  const contextValue = useMemo(
    () => ({
      signIn,
      signOut,
    }),
    [signIn, signOut],
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUserContext was used outside of its Provider');
  }

  return context;
};

export default UserContextProvider;
