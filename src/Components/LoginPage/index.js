import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Navigate ,useNavigate} from 'react-router-dom';
import './index.css';

const LoginPage = () => {
    const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    return nav("/");

  };

  const onSubmitFailure = (errorMsg) => {
    setIsError(true);
    setError(errorMsg);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const userdetails = { username, password };
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        onSubmitSuccess(data.jwt_token);
      } else {
        onSubmitFailure(data.error_msg);
      }
    } catch (error) {
      
      console.error('Error during fetch:', error);
      onSubmitFailure('An error occurred during login.');
    }
  };

  const jwtToken = Cookies.get('jwt_token');

  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="loginContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="Logo"
          className="loginLogo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="loginImage"
          className="loginImage"
        />
        <form className="form-class" onSubmit={onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="inputElement">
            <label className="label" htmlFor="username">
              USER NAME
            </label>
            <input
              className="input"
              type="text"
              id="username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>
          <div className="inputElement">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input"
              type="password"
              id="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <button type="submit" className="loginButton">
            Login
          </button>
          {isError && <p className="error-message">* {error}</p>}
          
        </form>
      </div>
    );
  }
};

export default LoginPage;
