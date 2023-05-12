import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import LoadingPage from '../../components/Loading/loading';
import Cover from './images/cover.jpg';
import './components/login.css';
import { LoginField, RegisterField, FormElement } from './components/login.field';

function Login({
  loginType,
  changeLoginType,
  onLogin,
  onRegister,
  errorMessage,
  loginBoxTransition,
  Loading,
}: {
  loginType: string;
  changeLoginType: (_type: string) => () => void;
  onLogin: (_email: string, _password: string) => void;
  onRegister: (_email: string, _username: string, _password: string, _confirmPassword: string) => void;
  errorMessage: string;
  loginBoxTransition: string;
  Loading: boolean;
}) {
  const navigateToHome = () => {
    window.location.href = '/';
  };

  const handleFormSubmit = (event: React.FormEvent<FormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget;
    const { email, username, password, 'confirm-password': confirmPassword } = elements;
    if (loginType === 'Login') onLogin(username.value, password.value);
    else onRegister(email.value, username.value, password.value, confirmPassword.value);
  };

  return (
    <div className={`Login-Register-Wrapper ${loginBoxTransition}`}>
      <div className={`Login-Register-Container ${loginType === 'Login' ? 'Login' : 'Register'}`}>
        <div className="Login-Register-Image Login-Register-Container-Content">
          <img src={Cover} alt="Cover" />
        </div>
        <div className="Login-Register-Form-Container Login-Register-Container-Content">
          <div
            className="Login-Register-Close-Form"
            onClick={navigateToHome}
            onKeyDown={navigateToHome}
            role="button"
            tabIndex={0}
          >
            <RxCross2 />
          </div>
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
                {loginType}
              </button>
            </div>
          </form>
        </div>
        <div className="Login-Register-Form-Footer Login-Register-Container-Content">
          <p>
            <button type="button" onClick={changeLoginType(loginType)}>
              {loginType === 'Login' ? 'Create Account' : 'Already have an account?'}
            </button>
          </p>

          <button type="button">
            <a href="/">Back to Home</a>
          </button>
        </div>
        <LoadingPage showLoading={Loading || loginBoxTransition !== ''} />
      </div>
    </div>
  );
}

export default Login;
