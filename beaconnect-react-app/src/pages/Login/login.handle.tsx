import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { Navigate, useNavigate } from 'react-router-dom';

import Login from './login';
import { useUserContext } from '../../userContext';
import { loginQuery, registerQuery } from './components/login.query';

type LoginMutationVariables = {
  email: string;
  password: string;
};

type LoginMutationResult = {
  login: {
    token: string;
  };
};

type RegisterMutationVariables = {
  email: string;
  password: string;
  username: string;
};

type RegisterMutationResult = {
  register: {
    id: string;
  };
};

// eslint-disable-next-line no-undef
const LoginCompound = (props: { loginType: string; isLoggedIn: boolean }) => {
  const { loginType, isLoggedIn } = props;
  if (isLoggedIn) return <Navigate to="/" replace />;
  const navigate = useNavigate();
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
      const {
        login: { token },
      } = data;
      signIn(token);
      navigate('/', { replace: true });
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

  const handleLogin = (email: string, password: string) => {
    login({ variables: { email, password } });
  };
  const handleRegister = (email: string, username: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) setErrorMessage('Passwords do not match');
    else register({ variables: { email, password, username } });
  };

  return (
    <Login
      loginType={currentLoginType}
      changeLoginType={changeLoginType}
      onLogin={handleLogin}
      onRegister={handleRegister}
      loginLoading={loginLoading}
      registerLoading={registerLoading}
      errorMessage={errorMessage}
    />
  );
};

export default LoginCompound;
