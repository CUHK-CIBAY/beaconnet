import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';

import Login from './login';
import { useUserContext } from '../../userContext';
import {
  loginQuery,
  registerQuery,
  LoginMutationResult,
  LoginMutationVariables,
  RegisterMutationResult,
  RegisterMutationVariables,
} from './components/login.query';

function LoginCompound({
  loginType,
  isLoggedIn,
  setIsLoggedIn,
}: {
  loginType: string;
  isLoggedIn: boolean;
  setIsLoggedIn: (_isLoggedIn: boolean) => void;
}) {
  if (isLoggedIn) return <Navigate to="/" replace />;
  const { signIn } = useUserContext();
  const [loginBoxTransition, setLoginBoxTransition] = useState('');
  const [currentLoginType, setCurrentLoginType] = useState(loginType);
  const [errorMessage, setErrorMessage] = useState('');
  const changeLoginType = (type: string) => () => {
    setCurrentLoginType(type === 'Login' ? 'Register' : 'Login');
    window.history.pushState({}, '', type === 'Login' ? '/register' : '/login');
    setErrorMessage('');
    document.querySelector('form')?.reset();
  };

  const [login, { loading: loginLoading }] = useMutation<LoginMutationResult, LoginMutationVariables>(loginQuery, {
    onCompleted: (data) => {
      const {
        login: { token, me },
      } = data;
      const tokenWithRole = window.btoa(`${token}::${me?.role}`);
      signIn(tokenWithRole);
      localStorage.setItem(
        'user_info',
        JSON.stringify({
          id: me?.id,
          image: me?.info?.image,
        }),
      );
      if (!me?.info?.nickname) window.history.pushState({}, '', '/?setProfile=true');
      setLoginBoxTransition(me?.info?.nickname ? 'redirect' : 'profileCreate');
      setTimeout(() => {
        setIsLoggedIn(true);
        setLoginBoxTransition('');
      }, 1000);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const [register, { loading: registerLoading }] = useMutation<RegisterMutationResult, RegisterMutationVariables>(
    registerQuery,
    {
      onCompleted: (data) => {
        const {
          register: { id },
        } = data;
        if (id) changeLoginType('Register')();
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    },
  );

  const handleLogin = (loginInput: string, password: string) => {
    let email: string | null = null;
    let username: string | null = null;
    if (!loginInput.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3,})$/i)) {
      username = loginInput;
    } else {
      email = loginInput;
    }
    login({ variables: { email, username, password } });
  };
  const handleRegister = (email: string, username: string, password: string, confirmPassword: string) => {
    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) setErrorMessage('Invalid email');
    else if (password !== confirmPassword) setErrorMessage('Passwords do not match');
    else register({ variables: { email, password, username } });
  };

  return (
    <Login
      loginType={currentLoginType}
      changeLoginType={changeLoginType}
      onLogin={handleLogin}
      onRegister={handleRegister}
      Loading={registerLoading || loginLoading}
      loginBoxTransition={loginBoxTransition}
      errorMessage={errorMessage}
    />
  );
}

export default LoginCompound;
