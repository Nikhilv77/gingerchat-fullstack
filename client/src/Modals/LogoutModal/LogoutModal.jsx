import React, { } from "react";
import './LogoutModal.css'
import { useDispatch } from "react-redux";
import { logoutAction } from "../../Actions/LoginAction";
import { useNavigate } from "react-router-dom";
const LogoutModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const closeModalHandler = ()=>{
    document.getElementsByClassName('logout-modal')[0].style.display = "none"
    document.getElementsByClassName('logout-backdrop')[0].style.display = "none"
  }
  const logoutHandler = ()=>{
    try{
      dispatch(logoutAction());
      navigate('/login');
    }catch(error){
  console.log(error);
    }
    closeModalHandler();
  }
  return <div className="logout-modal">
<div className="logout-box">
<i onClick={closeModalHandler} class="ri-close-large-line"></i>
  <div className="logout-container">
    <h2>Are You sure that you want to logout?</h2>
<hr />
    <div className="logout-btn">
    <button onClick={logoutHandler}>Yes</button>
    <button onClick={closeModalHandler}>No</button>
   </div>
  </div>

  
</div>
  </div>;
};

export default LogoutModel;
