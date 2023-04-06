/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Cover from './images/cover.jpg';
import './components/login.css';

type FormElements = {
  email: HTMLInputElement;
  username: HTMLInputElement;
  password: HTMLInputElement;
  'confirm-password': HTMLInputElement;
} & HTMLFormControlsCollection;

type LoginFormElement = {
  readonly elements: FormElements;
} & HTMLFormElement;

const Login = (props: { loginType: string }) => {
  const { loginType } = props;
  const [currentLoginType, setCurrentLoginType] = useState(loginType);

  const handleLoginType = (type: string) => () => {
    setCurrentLoginType(type === 'Login' ? 'Register' : 'Login');
    window.history.pushState({}, '', type === 'Login' ? '/register' : '/login');
  };

  const handleSubmit = (event: React.FormEvent<LoginFormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget;
    if (currentLoginType === 'Login') {
      const { username, password } = elements;
      console.log(username.value, password.value);
    } else {
      const { email, username, password, 'confirm-password': confirmPassword } = elements;
      console.log(email.value, username.value, password.value, confirmPassword.value);
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
      <div className={`Login-Register-Container ${currentLoginType === 'Login' ? 'Login' : 'Register'}`}>
        <div className="Login-Register-Image">
          <img src={Cover} alt="Cover" />
        </div>
        <div className="Login-Register-Form-Container">
          <h1>{currentLoginType}</h1>

          <form className="Login-Register-Form" onSubmit={handleSubmit}>
            <div className="Login-Register-Form-Group">
              {(currentLoginType === 'Login' ? LoginField : RegisterField).map(({ id, type, placeholder, label }) => (
                <div className="Login-Register-Form-Field">
                  <input type={type} id={id} className="Login-Register-Form-Input" placeholder={placeholder} />
                  <label htmlFor={id} className="Login-Register-Form-Label">
                    {label}
                  </label>
                </div>
              ))}
              <button type="submit" className="Login-Register-Form-Button">
                {currentLoginType}
              </button>
            </div>
          </form>
        </div>
        <div className="Login-Register-Form-Footer">
          <p>
            <button type="button" onClick={handleLoginType(currentLoginType)}>
              {currentLoginType === 'Login' ? 'Create Account' : 'Already have an account?'}
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
