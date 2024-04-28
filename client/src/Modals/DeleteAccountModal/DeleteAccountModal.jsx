import React, { } from "react";
import './DeleteAccountModal.css'
import { useDispatch,useSelector } from "react-redux";
import { deleteAccountAction} from "../../Actions/LoginAction";
import { useNavigate } from "react-router-dom";
const DeleteAccountModal = () => {
  const user = useSelector(state=>state.AuthReducer?.authData?.savedUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const closeModalHandler = ()=>{
    document.getElementsByClassName('delete-account-modal')[0].style.display = "none"
    document.getElementsByClassName('delete-account-backdrop')[0].style.display = "none"
  }
  const deleteAccountHandler = ()=>{
    try{
      dispatch(deleteAccountAction({userId:user._id}));
    }catch(error){
  console.log(error);
    }
    closeModalHandler();
  }
  return <div className="delete-account-modal">
<div className="delete-account-box">
<i onClick={closeModalHandler} class="ri-close-large-line"></i>
  <div className="delete-account-container">
    <h2>Are You sure that you want to Delete your account?</h2>
    <span>Note: All your information, including your friends, posts, profile, chats, friend requests, etc., will be deleted if you click 'Yes.' Your account cannot be recovered once deleted.</span>
<hr />
    <div className="delete-account-btn">
    <button onClick={deleteAccountHandler}>Yes</button>
    <button onClick={closeModalHandler}>No</button>
   </div>
  </div>
</div>
  </div>;
};

export default DeleteAccountModal;
