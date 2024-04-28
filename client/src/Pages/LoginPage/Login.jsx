import React from "react";
import './Login.css'
import LoginForm from "../../Components/LoginForm/LoginForm";
import LoginImage from '../../Components/LoginImage/LoginImage'
import gcLogo from '../../Images/gc-logo-login.png'

const Login = () => {
  return <div className="login">
    <div className="login-container">
      <div className="login-image-for-login">
    <LoginImage/>
    </div>
    <LoginForm/>
  </div>
  </div>;
};

export default Login;
