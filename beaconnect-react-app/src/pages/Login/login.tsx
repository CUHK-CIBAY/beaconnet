/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Cover from './images/cover.jpg';
import './components/login.css';

function Login() {
  return (
    <div className="Login-Register-Wrapper">
      <div className="Login-Register-Container">
        <div className="Login-Register-Image">
          <img src={Cover} alt="Cover" />
        </div>
        <div className="Login-Register-Form-Container">
          <h1>Log in</h1>
          <form className="Login-Register-Form">
            <div className="Login-Register-Form-Group">
              <div className="Login-Register-Form-Field">
                <input type="text" id="username" className="Login-Register-Form-Input" placeholder="enter here" />
                <label htmlFor="username" className="Login-Register-Form-Label">
                  Username
                </label>
              </div>

              <div className="Login-Register-Form-Field">
                <input type="password" id="password" className="Login-Register-Form-Input" placeholder="enter here" />
                <label htmlFor="password" className="Login-Register-Form-Label">
                  Password
                </label>
              </div>

              <button type="submit" className="Login-Register-Form-Button">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="Login-Register-Form-Footer">
          <p>
            <a href="/register">Create Account</a>
          </p>

          <p>
            <a href="/forgot-password">Forgot Password</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
