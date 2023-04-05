/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Cover from './images/cover.jpg';
import './components/login.css';

const Login = (props: { loginType: string }) => {
  const { loginType } = props;
  const [currentLoginType, setCurrentLoginType] = useState(loginType);

  return (
    <div className="Login-Register-Wrapper">
      <div className={`Login-Register-Container ${currentLoginType === 'Login' ? 'Login' : 'Register'}`}>
        <div className="Login-Register-Image">
          <img src={Cover} alt="Cover" />
        </div>
        <div className="Login-Register-Form-Container">
          <h1>{currentLoginType}</h1>

          <form className="Login-Register-Form">
            {currentLoginType === 'Login' ? (
              <div className="Login-Register-Form-Group">
                <div className="Login-Register-Form-Field">
                  <input type="text" id="username" className="Login-Register-Form-Input" placeholder="Enter Here" />
                  <label htmlFor="username" className="Login-Register-Form-Label">
                    Username
                  </label>
                </div>
                <div className="Login-Register-Form-Field">
                  <input type="password" id="password" className="Login-Register-Form-Input" placeholder="Enter Here" />
                  <label htmlFor="password" className="Login-Register-Form-Label">
                    Password
                  </label>
                </div>
                <button type="submit" className="Login-Register-Form-Button">
                  Login
                </button>
              </div>
            ) : (
              <div className="Login-Register-Form-Group">
                <div className="Login-Register-Form-Field">
                  <input type="text" id="email" className="Login-Register-Form-Input" placeholder="Enter Here" />
                  <label htmlFor="email" className="Login-Register-Form-Label">
                    Email
                  </label>
                </div>
                <div className="Login-Register-Form-Field">
                  <input type="text" id="username" className="Login-Register-Form-Input" placeholder="Enter Here" />
                  <label htmlFor="username" className="Login-Register-Form-Label">
                    Username
                  </label>
                </div>
                <div className="Login-Register-Form-Field">
                  <input type="password" id="password" className="Login-Register-Form-Input" placeholder="Enter Here" />
                  <label htmlFor="password" className="Login-Register-Form-Label">
                    Password
                  </label>
                </div>
                <div className="Login-Register-Form-Field">
                  <input
                    type="password"
                    id="confirm-password"
                    className="Login-Register-Form-Input"
                    placeholder="Enter Here"
                  />
                  <label htmlFor="confirm-password" className="Login-Register-Form-Label">
                    Confirm Password
                  </label>
                </div>
                <button type="submit" className="Login-Register-Form-Button">
                  Register
                </button>
              </div>
            )}
          </form>
        </div>
        <div className="Login-Register-Form-Footer">
          <p>
            <button
              type="button"
              onClick={() => {
                if (currentLoginType === 'Login') {
                  setCurrentLoginType('Register');
                  window.history.pushState({}, '', '/register');
                } else {
                  setCurrentLoginType('Login');
                  window.history.pushState({}, '', '/login');
                }
              }}
            >
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
