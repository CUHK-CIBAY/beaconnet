/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { ApolloError } from '@apollo/client';
import Cover from './images/cover.jpg';
import './components/login.css';

type FormFieldElements = {
  email: HTMLInputElement;
  username: HTMLInputElement;
  password: HTMLInputElement;
  'confirm-password': HTMLInputElement;
} & HTMLFormControlsCollection;

type FormElement = {
  readonly elements: FormFieldElements;
} & HTMLFormElement;

const Login = (props: {
  loginType: string;
  changeLoginType: (type: string) => () => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, username: string, password: string, confirmPassword: string) => void;
}) => {
  const { loginType, onLogin, onRegister, changeLoginType } = props;

  const handleFormSubmit = (event: React.FormEvent<FormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget;
    if (loginType === 'Login') {
      const { username, password } = elements;
      onLogin(username.value, password.value);
    } else {
      const { email, username, password, 'confirm-password': confirmPassword } = elements;
      onRegister(email.value, username.value, password.value, confirmPassword.value);
    }
  };

  const RegisterField = [
    {
      id: 'email',
      type: 'text',
      placeholder: 'Enter Here',
      label: 'Email',
    },
    {
      id: 'username',
      type: 'text',
      placeholder: 'Enter Here',
      label: 'Username',
    },
    {
      id: 'password',
      type: 'password',
      placeholder: 'Enter Here',
      label: 'Password',
    },
    {
      id: 'confirm-password',
      type: 'password',
      placeholder: 'Enter Here',
      label: 'Confirm Password',
    },
  ];

  const LoginField = [
    {
      id: 'username',
      type: 'text',
      placeholder: 'Enter Here',
      label: 'Username',
    },
    {
      id: 'password',
      type: 'password',
      placeholder: 'Enter Here',
      label: 'Password',
    },
  ];

  return (
    <div className="Login-Register-Wrapper">
      <div className={`Login-Register-Container ${loginType === 'Login' ? 'Login' : 'Register'}`}>
        <div className="Login-Register-Image">
          <img src={Cover} alt="Cover" />
        </div>
        <div className="Login-Register-Form-Container">
          <h1>{loginType}</h1>

          <form className="Login-Register-Form" onSubmit={handleFormSubmit}>
            <div className="Login-Register-Form-Group">
              {(loginType === 'Login' ? LoginField : RegisterField).map(({ id, type, placeholder, label }) => (
                <div className="Login-Register-Form-Field" key={id}>
                  <input type={type} id={id} className="Login-Register-Form-Input" placeholder={placeholder} required />
                  <label htmlFor={id} className="Login-Register-Form-Label">
                    {label}
                  </label>
                </div>
              ))}
              <button type="submit" className="Login-Register-Form-Button">
                {loginType}
              </button>
            </div>
          </form>
        </div>
        <div className="Login-Register-Form-Footer">
          <p>
            <button type="button" onClick={changeLoginType(loginType)}>
              {loginType === 'Login' ? 'Create Account' : 'Already have an account?'}
            </button>
          </p>

          <button type="button">
            <a href="/forgot-password">Forgot Password</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
