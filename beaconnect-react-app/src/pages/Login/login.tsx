/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { ApolloError } from '@apollo/client';
import Cover from './images/cover.jpg';
import './components/login.css';
import { LoginField, RegisterField, FormElement } from './components/login.field';

const Login = (props: {
  loginType: string;
  changeLoginType: (type: string) => () => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, username: string, password: string, confirmPassword: string) => void;
  errorMessage: string;
  Loading: boolean;
}) => {
  const { loginType, onLogin, onRegister, changeLoginType, errorMessage, Loading } = props;

  const handleFormSubmit = (event: React.FormEvent<FormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget;
    const { email, username, password, 'confirm-password': confirmPassword } = elements;
    if (loginType === 'Login') onLogin(username.value, password.value);
    else onRegister(email.value, username.value, password.value, confirmPassword.value);
  };

  return (
    <div className="Login-Register-Wrapper">
      <div className={`Login-Register-Container ${loginType === 'Login' ? 'Login' : 'Register'}`}>
        <div className="Login-Register-Image">
          <img src={Cover} alt="Cover" />
        </div>
        <div className="Login-Register-Form-Container">
          <h1>{loginType}</h1>

          {errorMessage ? (
            <div className="Login-Register-Form-Error">
              <p>{errorMessage}</p>
            </div>
          ) : null}

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
                {Loading ? 'Loading...' : loginType}
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
