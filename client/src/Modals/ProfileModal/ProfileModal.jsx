import React, { useEffect, useState } from "react";
import './ProfileModal.css';
import { useSelector } from "react-redux";
import { getUser } from "../../Api/UserAPI";
import ClipLoader from "react-spinners/ClipLoader";
import defaultPicture from '../../Images/default-picture.jpg'
import { socket } from "../../App";

const ProfileModal = ({showProfileModal,setShowProfileModal,setShowEditAccount,setFriendRequestsModal,setFriendsModal,setProfileUser}) => {
  const[againRender,setAgainRender] = useState(false)

  const savedUser = useSelector(state=>state.AuthReducer.authData.savedUser)
  const [user,setUser] = useState(null)
  useEffect(()=>{
    socket.on(`receiving-friend-request-${savedUser._id}`,()=>{
      setAgainRender(prev=>!prev)
    })
    socket.on(`receiving-accepting-request-${savedUser._id}`,()=>{
      setAgainRender(prev=>!prev)
    })
    socket.on(`receiving-unfriend-${savedUser._id}`,()=>{
      setAgainRender(prev=>!prev)
    })
    socket.on(`receiving-declining-request-${savedUser._id}`,()=>{
      setAgainRender(prev=>!prev)
    })
  },[])
  useEffect(()=>{
    async function fetchThisUser (){
      try {
        const response = await getUser(savedUser._id)
       setUser(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchThisUser();
  },[savedUser._id,againRender])
  const openLogoutModelHandler = ()=>{
    setShowProfileModal(false)
    document.getElementsByClassName('logout-modal')[0].style.display = 'grid'
    document.getElementsByClassName('logout-backdrop')[0].style.display = 'inline'
  }
  
  return<>
  {showProfileModal && <div onClick={()=>{
    setShowProfileModal(false)
  }} className="profile-modal-backdrop"></div>}
  <div className="profile-modal">
  <div className="profile-modal-container">
    {user === null ? <ClipLoader color={"#333"} size={60}/> : <>
<i onClick={()=>setShowProfileModal(false)} class="ri-close-large-line"></i>
<div className="profile-modal-container-image-actions">
<div className="profile-modal-container-image-actions-container">
  <h2>My Profile</h2>
  <img src={user.profilePicture===null?defaultPicture : process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture} alt="" />
  <p>{user.about}</p>
  <div className="delete-update-actions">
    <button onClick={()=>{setShowEditAccount(true)
    setShowProfileModal(false)
    setProfileUser(user)
    }}>Edit Account</button>
    <button onClick={()=>{
      setShowProfileModal(false)
      document.getElementsByClassName('delete-account-modal')[0].style.display = "grid"
      document.getElementsByClassName('delete-account-backdrop')[0].style.display = 'inline'
    }}>Delete Account</button>
  </div>
</div>
</div>
<div className="profile-modal-container-info">
  <div className="profile-information">
    <div className="profile-info-name">
    <h2>Name</h2>
    <p>{user.name}</p>
    </div>
    <div className="profile-info-user-name">
      <h2>User Name</h2>
      <p>@{user.userName}</p>
    </div>
    <div className="profile-info-email">
      <h2>Email</h2>
      <p>{user.email}</p>
    </div>
    <div className="profile-info-friends">
      <h2 onClick={()=>{setFriendsModal(true)
      setShowProfileModal(false)}
      }>Friends</h2>
      <p>{user.friends.length}</p>
    </div>
    <div className="profile-info-friend-requests">
      <h2 onClick={()=>{setFriendRequestsModal(true)
  
       setShowProfileModal(false)
      }
      }>Requests </h2>
      <p>{user.friendRequests.length}</p>
    </div>
    <div className="profile-info-posts">
      <h2>Lives in</h2>
      <p>{user.residence}</p>
    </div>
   
  </div>
  <div>
    <button onClick={openLogoutModelHandler}>Logout</button>
  </div>
</div>
</>}
</div>

  </div>
  </> ; 
};

export default ProfileModal;
