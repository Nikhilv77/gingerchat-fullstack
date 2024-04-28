import React, { useEffect, useState } from "react";
import './FriendRequestsModal.css'
import { getAllUsers } from "../../Api/UserAPI";
import ClipLoader from "react-spinners/ClipLoader";
import OthersProfileModal from "../OtherProfileModal/OtherProfileModal";
import { useSelector } from "react-redux";
import defaultPicture from '../../Images/default-picture.jpg'
import { declineFriendRequest } from "../../Api/UserAPI";
import { acceptFriendRequest } from "../../Api/UserAPI";  
import { socket } from "../../App";
const FriendRequestsModal = ({setFriendRequestsModal}) => {
  const savedUser = useSelector(state=>state.AuthReducer.authData.savedUser)
  const[showothersProfileModal,setShowOthersProfileModal] = useState(false);
  const[friendRequests,setFriendRequests] = useState([]);
  const[loadingComments,setLoadingComments] = useState(null);
  const[setUserId, SetSetUserId] = useState(null);
  const[thisUser,setThisUser] = useState(null);
  const[declineLoading,setDeclineLoading] = useState(null);
  const[acceptLoading,setAcceptLoading] = useState(null);
  const[previousRender,setPreviousRender] = useState(false);
  useEffect(()=>{
    socket.on(`receiving-friend-request-${savedUser._id}`,()=>{
      setPreviousRender(!previousRender)
    })
   
  },[])
  useEffect(()=>{
  async function getAllUsersFn(){
    setLoadingComments(true)
    try {
      const response = await getAllUsers();
      const thisUser = response.data.filter(user=>user._id===savedUser._id)[0]
      const otherUsers = response.data.filter(user=>savedUser._id !== user._id)
      const friendRequestsData = otherUsers.filter(user=>thisUser.friendRequests.includes(user._id) && user.sentRequests.includes(thisUser._id))
      setThisUser(thisUser)
      setFriendRequests(friendRequestsData)
    } catch (error) {
      console.log(error);
    }
    setLoadingComments(false)
  }
    getAllUsersFn();
  },[previousRender])
  const declineRequestFn = (thisUserId,friendId) => async()=>{
    setDeclineLoading(true);
    try {
      await declineFriendRequest({userId:thisUserId,friendId:friendId});
      socket.emit('notifying-declining-request', friendId)
      const response = await getAllUsers();
      setFriendRequests(response.data.filter(user=>user._id === savedUser._id)[0].friendRequests)
      setDeclineLoading(false)
    } catch (error) {
      console.log(error);
    }
  }
  const acceptRequestFn = (thisUserId, friendId) => async()=>{
    setAcceptLoading(true);
    try {
      await acceptFriendRequest({userId:thisUserId, friendId:friendId});
      socket.emit('notifying-accepting-request',friendId)
      const response = await getAllUsers();
      setFriendRequests(response.data.filter(user=>user._id === savedUser._id)[0].friendRequests)
      setAcceptLoading(false)
    } catch (error) {
      console.log(error);
    }
  }
  return( <>
           {showothersProfileModal && setUserId && <OthersProfileModal setShowOthersProfileModal={setShowOthersProfileModal} userId={setUserId} />}
           
           <div className="friend-requests-modal">

    <div className="friend-requests-modal-container">
    <h2>Friend Requests</h2>
<i onClick={()=>setFriendRequestsModal(false)} class="ri-close-large-line"></i>
{(loadingComments && !friendRequests.length)? <ClipLoader color={"#333"} size={2}/> : (loadingComments===false && friendRequests.length===0)?<div className="no-friend-requests-data">
  {loadingComments===false&&<i class="ri-emotion-normal-fill"></i>}
{loadingComments===false &&   <span>You have no friend Requests</span>}
  </div>:
<div className="friend-requests-modal-items">
 
  {friendRequests.map(user=>{
    return (<div className="friend-requests-modal-item">
   <img src={user.profilePicture===null?defaultPicture : process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture} alt="" />
      <div className="friend-requests-modal-item-description">
        <div className="friend-requests-modal-item-names">
      <p onClick={()=>{
        setShowOthersProfileModal(true)
        SetSetUserId(user._id)
      }}>{user.name}</p>
      <p>@{user.userName}</p>
      </div>
      <span>{user.about}</span>
      </div>
      <div className="friend-requests-button">
        <button disabled = {acceptLoading} onClick={acceptRequestFn(thisUser._id,user._id)}>{acceptLoading?<ClipLoader size={19} color="#fff"/>:'Accept'}</button>
        <button disabled={declineLoading} onClick={declineRequestFn(thisUser._id,user._id)}>{declineLoading?<ClipLoader size={19} color="#fff"/>:'Decline'}</button>
        </div>
    </div>
    )
  })}
  </div>
}
  </div>
  
  </div>
  </> )
};

export default FriendRequestsModal;
