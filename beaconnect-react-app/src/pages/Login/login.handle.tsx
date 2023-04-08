import React from 'react';

import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import Login from './login';
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
const LoginCompound = (props: { loginType: string }) => {
  const { loginType } = props;
  const navigate = useNavigate();
  const [login] = useMutation<LoginMutationResult, LoginMutationVariables>(loginQuery, {
    onCompleted: (data) => {
      const {
        login: { token },
      } = data;
      console.log(token);
      navigate('/', { replace: true });
    },
  });
  const [register] = useMutation<RegisterMutationResult, RegisterMutationVariables>(registerQuery, {
    onCompleted: (data) => {
      const {
        register: { id },
      } = data;
      console.log(id);
      navigate('/', { replace: true });
    },
  });
  const handleLogin = (email: string, password: string) => {
    login({ variables: { email, password } });
  };
  const handleRegister = (email: string, username: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) window.alert('Password and Confirm Password must be same');
    else register({ variables: { email, password, username } });
  };
  return <Login loginType={loginType} onLogin={handleLogin} onRegister={handleRegister} />;
};

export default LoginCompound;
