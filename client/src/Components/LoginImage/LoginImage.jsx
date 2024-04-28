import React from "react";
import './LoginImage.css'
import loginImage from '../../Images/Login-image.jpg'

const LoginImage = () => {
  return <div className="login-image">
   <img src={loginImage} alt="" />
 
  </div>;
};

export default LoginImage;
