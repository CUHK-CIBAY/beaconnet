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

// eslint-disable-next-line no-undef
const LoginCompound = (props: {
  loginType: string;
  isLoggedIn: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}) => {
  const { loginType, isLoggedIn, setIsLoggedIn } = props;
  if (isLoggedIn) return <Navigate to="/" replace />;
  const { signIn } = useUserContext();
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
      const loginWrapper = document.querySelector('.Login-Register-Wrapper');
      const {
        login: { token, me },
      } = data;
      const tokenWithRole = window.btoa(`${token}::${me?.role}`);
      signIn(tokenWithRole);
      if (me?.info && me.info.nickname) {
        loginWrapper?.classList.add('redirect');
        setTimeout(() => {
          setIsLoggedIn(true);
          loginWrapper?.classList.remove('redirect');
        }, 1000);
      } else {
        setIsLoggedIn(true);
      }
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
      errorMessage={errorMessage}
    />
  );
};

export default LoginCompound;
