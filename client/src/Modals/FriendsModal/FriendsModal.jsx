import React, { useEffect, useState } from "react";
import './FriendsModal.css'
import { getAllUsers } from "../../Api/UserAPI";
import ClipLoader from "react-spinners/ClipLoader";
import defaultPicture from '../../Images/default-picture.jpg'
import OthersProfileModal from "../OtherProfileModal/OtherProfileModal";
import { socket } from "../../App";
import { useSelector } from "react-redux";
import { unfriendUser } from "../../Api/UserAPI";
const FriendsModal = ({setFriendsModal}) => {
  const savedUser = useSelector(state=>state.AuthReducer.authData.savedUser)
  
  const[previousRender,setPreviousRender] = useState(false)
  useEffect(()=>{
    socket.on(`receiving-accepting-request-${savedUser._id}`,()=>{
      setPreviousRender(!previousRender)
    })
    socket.on(`receiving-unfriend-${savedUser._id}`,()=>{
      setPreviousRender(!previousRender)
    })
  },[])
  const [friends,setFriends] = useState(null);
  const[showothersProfileModal,setShowOthersProfileModal] = useState(false);
  const[setUserId, SetSetUserId] = useState(null)
  const[thisUser,setThisUser] = useState(null);
  const[unfriendLoading,setUnfriendLoading] = useState(null);
  useEffect(()=>{
  async function getAllUsersFn(){
    try {
      console.log("hehe");
      const response = await getAllUsers();
      const thisUser = response.data.filter(user=>user._id === savedUser._id)[0]
      setFriends(response.data.filter(user=>thisUser.friends.includes(user._id)&&user.friends.includes(thisUser._id)))
      setThisUser(thisUser)
    } catch (error) {
      console.log(error);
    }
  }
    getAllUsersFn();
  },[previousRender])
  const handleUnfriend =async(userId,friendId)=>{
    setUnfriendLoading(true);
    try {
      await unfriendUser({userId,friendId});
      socket.emit('notifying-unfriend',friendId)
      const response = await getAllUsers();
      setFriends(response.data.filter(user=>user._id === savedUser._id)[0].friends)
      setUnfriendLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  return(<>
     {showothersProfileModal && setUserId && <OthersProfileModal setPreviousRender ={setPreviousRender} setShowOthersProfileModal={setShowOthersProfileModal} userId={setUserId} />}
  <div className="friends-modal">
    <div className="friends-modal-container">
    <h2>Friends</h2>
<i onClick={()=>setFriendsModal(false)} class="ri-close-large-line"></i>
{friends===null?<ClipLoader color={"#333"} size={40}/>:<div className="friends-modal-items">
 {friends.length===0 && <div className="no-friends-data">
  <i class="ri-emoji-sticker-fill"></i>
  <span>You have no friends, get some friends</span>
  </div>}
 {friends.map(user=>{
   return (<><div className="friends-modal-item">
 <img src={user?.profilePicture===null?defaultPicture : process.env.REACT_APP_PUBLIC_FOLDER + user?.profilePicture} alt="" />
     <div className="friends-modal-item-description">
       <div className="friends-modal-item-names">
     <p  onClick={()=>{
       setShowOthersProfileModal(true)
       SetSetUserId(user._id)
     }}>{user?.name}</p>
     <p>@{user?.userName}</p>
     </div>
     <span>{user?.about}</span>
     </div>
       <button onClick={()=>handleUnfriend(thisUser?._id,user?._id)} disabled = {unfriendLoading}>{unfriendLoading? <ClipLoader size={19} color="#fff"/>:"Unfriend"}</button>
   </div>
   <hr id="friend-item-hr" />
   </>
   )
 })}
 </div>}

  </div>
  </div>
  </>)
  ;
};

export default FriendsModal;
