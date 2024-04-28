import React from "react";
import './HomeLeft.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FriendRequestsModal from "../../Modals/FriendRequestsModal/FriendRequestsModal";

const HomeLeft = ({setShowMembersModal,setFriendRequestsModal}) => {

  const navigate=useNavigate()

  return<> 

  <div className="home-left">
    <div className="home-left-items">

  <i title="chat" onClick={()=>navigate('/chat')} class="ri-chat-heart-fill"></i>
  <i title="find friends" onClick={()=>setShowMembersModal(true)} class="ri-group-fill"></i>
  <i title="friend requests" onClick={()=>setFriendRequestsModal(true)} class="ri-chat-new-line"></i>
  
  </div>
  </div>
  </>;
};

export default HomeLeft;
