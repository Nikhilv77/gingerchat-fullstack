import React, { useEffect, useState } from "react";
import './OtherProfileModal.css';
import defaultPicture from '../../Images/default-picture.jpg'
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../Api/UserAPI";
import { sendFriendRequest } from "../../Api/UserAPI";
import { unfriendUser } from "../../Api/UserAPI";
import { socket } from "../../App";
const OthersProfileModal = ({setShowOthersProfileModal,userId,setPreviousRender}) => {
  const savedUser = useSelector(state=>state.AuthReducer.authData.savedUser)
  const [user,setUser] = useState(null)
  const[thisUser,setThisUser] = useState(null)
  const[addLoading,setAddLoading] = useState(null);
  const[againRender,setAgainRender] = useState(false);
  // const [rerender, setRerender] = useState(false);
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
    async function fetchUser(){
     try {
      const response = await getAllUsers();
      console.log(userId);
      const thisUser = response.data.filter(user=>user._id === savedUser._id)[0]
      setThisUser(thisUser);
      setUser(response.data.filter(user=>user._id === userId)[0]);
      console.log(user,"routeruser",thisUser);
     } catch (error) {
      console.log(error);
     }
    }
    fetchUser();
  },[userId,againRender])
  const handleAddFriend =async(userId,friendId)=>{
    setAddLoading(true)
   try {
     await sendFriendRequest({userId,friendId});
     socket.emit('notifying-friend-request',friendId)
     async function fetchUser(){
      try {
        async function fetchUser(){
          try {
           const response = await getAllUsers();
           console.log(userId);
           const thisUser = response.data.filter(user=>user._id === savedUser._id)[0]
           setThisUser(thisUser);
           setUser(response.data.filter(user=>user._id === friendId)[0]);
           setAddLoading(false)
           if(setPreviousRender){
            setPreviousRender(prev=>!prev)
           }
          } catch (error) {
           console.log(error);
           setAddLoading(false)
          }
         }
         fetchUser();

      } catch (error) {
       console.log(error);
       setAddLoading(false)
      }
     }
     fetchUser();
   } catch (error) {
    console.log(error);
   }
  }
   const handleUnfriend =async(userId, friendId)=>{
    setAddLoading(true)
   try {
     await unfriendUser({userId, friendId});
     socket.emit('notifying-unfriend',friendId)
     async function fetchUser(){
      try {
        async function fetchUser(){
          try {
           const response = await getAllUsers();
           console.log(userId);
           const thisUser = response.data.filter(user=>user._id === savedUser._id)[0]
           setThisUser(thisUser);
           setUser(response.data.filter(user=>user._id === friendId)[0]);
           setAddLoading(false)
           if(setPreviousRender){
            setPreviousRender(prev=>!prev)
           }
          } catch (error) {
           console.log(error);
           setAddLoading(false)
          }
         }
         fetchUser();
    
      } catch (error) {
       console.log(error);
       setAddLoading(false)
      }
     }
     fetchUser();
   } catch (error) {
    console.log(error);
   }
  }
  const openLogoutModelHandler = ()=>{
    setShowOthersProfileModal(false)
    document.getElementsByClassName('logout-modal')[0].style.display = 'grid'
  }
  return <div className="others-profile-modal">
<div className="others-profile-modal-container">
{!user ? <ClipLoader color={"#fff"} size={40}/> :<>
<i onClick={()=>setShowOthersProfileModal(false)} class="ri-close-large-line"></i>

<div className="others-profile-modal-container-image-actions-container">
  <div className="others-names">
  <h2>{user?.name}</h2>
  <span>@{user?.userName}</span>
  </div>
  <img src={user?.profilePicture===null?defaultPicture : process.env.REACT_APP_PUBLIC_FOLDER + user?.profilePicture} alt="" />
  <p>{user?.about}</p>
  <div className="others-location">
  <i class="ri-map-pin-user-fill"></i>
  <span>{user?.residence}</span>
  </div>
  <div className="others-number-of-friends">
    <span>{user?.friends?.length} Friends</span>
  </div>
  <div className="others-delete-update-actions">
  {thisUser.friendRequests.includes(user._id) && (user.sentRequests.includes(thisUser._id)) ? <p className="friend-request-sent-p">{user.name} has sent you friend request, Accept it on the friend Request Section</p>:thisUser?.friends?.includes(user._id) && (user.friends.includes(thisUser._id))?<button onClick={()=>handleUnfriend(savedUser._id,user._id)} disabled = {addLoading}>{addLoading? <ClipLoader size={19} color="#fff"/>:"Unfriend"}</button>: thisUser?.sentRequests?.includes(user._id) && (user.friendRequests.includes(thisUser._id))? <button className="friend-request-sent" disabled onClick={()=>handleAddFriend(savedUser._id,user._id)}>Request Sent</button>:<button onClick={()=>handleAddFriend(savedUser._id, user._id)} disabled = {addLoading}>{addLoading? <ClipLoader size={19} color="#fff"/>:"Add as Friend"}</button>}
  </div>
</div>
</>
}
</div>
 

</div>
; 
};

export default OthersProfileModal;
