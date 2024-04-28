import React from "react";
import LoginImage from "../../Components/LoginImage/LoginImage";
import SignupForm from '../../Components/SignupForm/SignupForm'
import './Signup.css'

const Signup = () => {
  return <div className ="signup">
    <div className="signup-container">
      <div className="signup-image-for-signup">
   <LoginImage/>
   </div>
 <SignupForm/>
  </div>
  </div>;
};

export default Signup;
