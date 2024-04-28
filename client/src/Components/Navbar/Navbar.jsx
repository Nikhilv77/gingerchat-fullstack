import React, { useState } from "react";
import './Navbar.css'
import gchatLogo from '../../Images/gc-logo.png'
import { useNavigate } from "react-router-dom";
import MyPostsModal from "../../Modals/MyPostsModal/MyPostsModal";
import ProfileModal from "../../Modals/ProfileModal/ProfileModal";
import FriendsModal from '../../Modals/FriendsModal/FriendsModal';
import AllMembersModal from '../../Modals/AllMembersModal/AllMembersModal';
import FriendRequestsModal from '../../Modals/FriendRequestsModal/FriendRequestsModal';
import EditProfileModal from '../../Modals/EditProfileModal/EditProfileModal'



const Navbar = () => {
  const[showMyPosts,setShowMyPosts] = useState(false)
  const[showProfileModal,setShowProfileModal] = useState(false)
  const[friendsModal,setFriendsModal] = useState(false)
  const [showMembersModal,setShowMembersModal]=useState(false)
  const[showFriendRequestsModal,setFriendRequestsModal] = useState(false)
  const[showEditAccount,setShowEditAccount] = useState(false);
  const[thisUser,setThisUser] = useState(null)
  const navigate = useNavigate();
  const handleNavbarShow = () => {
    document.getElementsByClassName('slider-modal')[0].style.top = 0;
  }
  const handleCloseNavbar = () => {
    document.getElementsByClassName('slider-modal')[0].style.top = '-100%';
  }
  const openAllMembersModalHandler = ()=>{
    handleCloseNavbar();
    document.getElementsByClassName('all-members-modal')[0].style.left = '50%'
  }
  const openProfileModalHandler = ()=>{
    handleCloseNavbar();
    document.getElementsByClassName('profile-modal')[0].style.left = '50%'
  }


  const openfriendsModalHandler = ()=>{
    handleCloseNavbar();
    document.getElementsByClassName('friends-modal')[0].style.left = '50%'
  }
  const openfriendRequestsModalHandler = ()=>{
    handleCloseNavbar();
    document.getElementsByClassName('friend-requests-modal')[0].style.left = '50%'
  }
  const opendeleteAccountModalHandler = ()=>{
    document.getElementsByClassName('delete-account-modal')[0].style.display = 'grid'
    document.getElementsByClassName('delete-account-backdrop')[0].style.display = "inline"
  }
  const openLogoutModelHandler = ()=>{
    document.getElementsByClassName('logout-modal')[0].style.display = 'grid'
    document.getElementsByClassName('logout-backdrop')[0].style.display = 'inline'
    
  }
  const setProfileUser = (aUser)=>{
    console.log(aUser,'logged');
    setThisUser(aUser)
  }
  return<> 
  {showMyPosts && <MyPostsModal setShowProfileModal={setShowProfileModal} setShowMyPosts={setShowMyPosts}/>}
  {showProfileModal && <ProfileModal setProfileUser = {setProfileUser} setFriendsModal = {setFriendsModal} setFriendRequestsModal = {setFriendRequestsModal} showProfileModal = {showProfileModal} setShowEditAccount = {setShowEditAccount} setShowProfileModal={setShowProfileModal}/>}
  {friendsModal && <FriendsModal setFriendsModal={setFriendsModal}/>}
  {showMembersModal && <AllMembersModal setShowMembersModal={setShowMembersModal}/>}
  {showFriendRequestsModal && <FriendRequestsModal setFriendRequestsModal={setFriendRequestsModal}/>}
  {thisUser && showEditAccount && <EditProfileModal thisUser = {thisUser}  setShowEditAccount={setShowEditAccount}/>}
 {showEditAccount &&  <div onClick={()=>setShowEditAccount(false)} className="edit-account-backdrop"></div>}
 {friendsModal && <div onClick={()=>setFriendsModal(false)} className="friends-modal-backdrop"></div>}
 {showMyPosts && <div onClick={()=>setShowMyPosts(false)} className="my-posts-backdrop"></div>}
 {showMembersModal && <div onClick={()=>setShowMembersModal(false)} className="find-friends-backdrop"></div>}
{showFriendRequestsModal && <div onClick={()=>setFriendRequestsModal(false)} className="friend-requests-backdrop"></div>}
  <div className="navbar">
   <img src={gchatLogo} alt="" />
   <i onClick={handleNavbarShow} class="ri-menu-line"></i> 
   <div className="desktop-items">
   <i title="home" onClick={()=>
    navigate('/')} class="ri-home-4-fill"></i>
      <i title="chat" onClick={()=>navigate('/chat')} class="ri-chat-heart-fill"></i>
    <i title="friends" onClick={()=>setFriendsModal(true)} class="ri-user-smile-fill"></i>
    <i title="posts" onClick={()=>setShowMyPosts(true)} class="ri-gallery-line"></i>
    <i title="profile" onClick={()=>setShowProfileModal(true)} class="ri-id-card-fill"></i>
   </div>
  
<div className="slider-modal">
<i onClick={handleCloseNavbar} class="ri-close-large-line"></i>
<div className="items">
  <div className="item">
  <i onClick={()=>{
    handleCloseNavbar();
    navigate('/')}} class="ri-home-4-fill"></i>
    <p>Home</p>
  </div>
  
  <div className="item">
  <i onClick={()=>{
  setShowMembersModal(true)
  handleCloseNavbar();
  }} class="ri-group-fill"></i>
    <p>Find Friends</p>
  </div>
  <div className="item">
  <i onClick={()=>{setShowProfileModal(true)
  handleCloseNavbar();
  }} class="ri-id-card-fill"></i>
    <p>Profile</p>
  </div>
  <div className="item">
  <i onClick={()=>{setShowMyPosts(true)
  handleCloseNavbar();
  }} class="ri-gallery-line"></i>
    <p>My posts</p>
  </div>
  <div className="item">
  <i onClick={()=>{
        handleCloseNavbar();
    navigate('/chat')}} class="ri-chat-heart-fill"></i>
    <p>My Chats</p>
  </div>
  <div className="item">
  <i onClick={()=>{setFriendsModal(true)
  handleCloseNavbar();
  }} class="ri-user-smile-fill"></i>
    <p>Friends</p>
  </div>
  <div className="item">
  <i onClick={()=>{setFriendRequestsModal(true)
  handleCloseNavbar();
  }} class="ri-chat-new-line"></i>
    <p>Friend Requests</p>
  </div>
  <div className="item">
  <i onClick={()=>{
    openLogoutModelHandler()
    handleCloseNavbar();
  
  }} class="ri-logout-box-r-fill"></i>
    <p>Logout</p>
  </div>
  <div className="item">
  <i onClick = {()=>{
    opendeleteAccountModalHandler()
    handleCloseNavbar();
  }}class="ri-delete-bin-fill"></i>
    <p>Delete Account</p>
  </div>
</div>
</div>
  </div>
  </>;
};

export default Navbar;
