import React, { useEffect, useState } from "react";
import './AllMembersModal.css'
import { getAllUsers, sendFriendRequest } from "../../Api/UserAPI";
import ClipLoader from "react-spinners/ClipLoader";
import OthersProfileModal from "../OtherProfileModal/OtherProfileModal";
import { useSelector } from "react-redux";
import defaultPicture from '../../Images/default-picture.jpg';
import { getUser } from "../../Api/UserAPI";
import { getFilteredUsers } from "../../Api/UserAPI";
import { unfriendUser } from "../../Api/UserAPI";
import { socket } from "../../App";

const AllMembersModal = ({setShowMembersModal}) => {
  const savedUser = useSelector(state=>state.AuthReducer.authData.savedUser)
  useEffect(()=>{
    socket.on(`receiving-friend-request-${savedUser._id}`,()=>{
      setPreviousRender(!previousRender)
    })
    socket.on(`receiving-accepting-request-${savedUser._id}`,()=>{
      setPreviousRender(!previousRender)
    })
    socket.on(`receiving-unfriend-${savedUser._id}`,()=>{
      setPreviousRender(!previousRender)
    })
    socket.on(`receiving-declining-request-${savedUser._id}`,()=>{
      setPreviousRender(!previousRender)
    })
  },[])

  const[allUsers,setAllUsers] = useState([]);
  const[loadingComments,setLoadingComments] = useState(null);
  const[search,setSearch] = useState('')
  const[showothersProfileModal,setShowOthersProfileModal] = useState(false);
  const[setUserId, SetSetUserId] = useState(null)
  const[sentRequest,setSentRequest] = useState(false);
  const[thisUser,setThisUser] = useState(null);
  const[addLoading,setAddLoading] = useState(null);
  const[previousRender,setPreviousRender] = useState(false)
  
  useEffect(()=>{
    
  async function getAllUsersFn(){
    setLoadingComments(true)
    try {
      const response = await getAllUsers();
      setThisUser(response.data.find(user=>user._id === savedUser._id))
      const otherUsers = response.data.filter(users=>users._id !== savedUser._id)
      setAllUsers(otherUsers);

    } catch (error) {
      console.log(error);
    }
    setLoadingComments(false)
  }
    getAllUsersFn();
  },[previousRender])
  const handleAddFriend =async(userId,friendId)=>{
    setAddLoading(true)
   try {
     await sendFriendRequest({userId,friendId});
     socket.emit('notifying-friend-request',friendId)
     async function getAllUsersFn(){
      setLoadingComments(true)
      try {
        const response = await getAllUsers();
        setThisUser(response.data.find(user=>user._id === savedUser._id))
        const otherUsers = response.data.filter(users=>users._id !== savedUser._id)
        setAllUsers(otherUsers);
  
        setAddLoading(false)
      } catch (error) {
        console.log(error);
      }
      setLoadingComments(false)
    }
      getAllUsersFn();
   } catch (error) {
    console.log(error);
   }
  }
  const handleUnfriend =async(userId, friendId)=>{
    setAddLoading(true)
   try {
     await unfriendUser({userId, friendId});
     socket.emit('notifying-unfriend',friendId)
     async function getAllUsersFn(){
      setLoadingComments(true)
      try {
        const response = await getAllUsers();
        setThisUser(response.data.find(user=>user._id === savedUser._id))
        const otherUsers = response.data.filter(users=>users._id !== savedUser._id)
        setAllUsers(otherUsers);
  
        setAddLoading(false)
      } catch (error) {
        console.log(error);
      }
      setLoadingComments(false)
    }
      getAllUsersFn();
   } catch (error) {
    console.log(error);
   }
  }
const handleSearch = async()=>{
  if(search.length ===0){
    async function getAllUsersFn(){
      setLoadingComments(true)
      try {
        const response = await getAllUsers();
        setThisUser(response.data.find(user=>user._id === savedUser._id))
        const otherUsers = response.data.filter(users=>users._id !== savedUser._id)
        setAllUsers(otherUsers);
  
      } catch (error) {
        console.log(error);
      }
      setLoadingComments(false)
    }
      getAllUsersFn();
  }
  else{
  try {
    const response = await getFilteredUsers(search);
    console.log(response.data);
    setAllUsers(response.data)
  } catch (error) {
    console.log(error);
  }
}
}
  return <div className="all-members-modal">
            {showothersProfileModal && setUserId && <OthersProfileModal setPreviousRender = {setPreviousRender} setShowOthersProfileModal={setShowOthersProfileModal} userId={setUserId} />}
    <div className="all-members-modal-container">
    <h2>Find Friends</h2>
    <div className="search-friends-form">
      <input value={search}  onChange={(e) => setSearch(e.target.value.trim())} type="text" placeholder="Search" />
      <button onClick={handleSearch}>Search</button>
    </div>
<i onClick={()=>setShowMembersModal(false)} class="ri-close-large-line"></i>
{loadingComments && !allUsers.length ? <ClipLoader color={"#333"} size={2}/>:loadingComments===false && allUsers.length === 0? <div className="no-users-found-in-array">
{ loadingComments===false&& <i class="ri-menu-search-line"></i>}
{ loadingComments===false && <span>No user found!</span>}
  </div>:<div className="all-members-modal-items">
 
 {allUsers.map(user=>{
   return (<div className="all-members-modal-item">
     <img src={user.profilePicture===null?defaultPicture : process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture} alt="" />
     <div className="all-members-modal-item-description">
       <div className="all-members-modal-item-names">
     <p onClick={()=>{
       setShowOthersProfileModal(true)
       SetSetUserId(user._id)
     }}>{user.name}</p>
     <p>@{user.userName}</p>
     </div>
     <span>{user.about}</span>
     </div>
     {thisUser.friendRequests.includes(user._id) && (user.sentRequests.includes(thisUser._id)) ? <p className="friend-request-sent-p">{user.name} has sent you friend request, Accept it on the friend Request Section</p>:thisUser?.friends?.includes(user._id) && (user.friends.includes(thisUser._id))?<button onClick={()=>handleUnfriend(savedUser._id,user._id)} disabled = {addLoading}>{addLoading? <ClipLoader size={19} color="#fff"/>:"Unfriend"}</button>: thisUser?.sentRequests?.includes(user._id) && (user.friendRequests.includes(thisUser._id))? <button className="friend-request-sent" disabled onClick={()=>handleAddFriend(savedUser._id,user._id)}>Request Sent</button>:<button onClick={()=>handleAddFriend(savedUser._id, user._id)} disabled = {addLoading}>{addLoading? <ClipLoader size={19} color="#fff"/>:"Add as Friend"}</button>}
   </div>
   )
 })}
 </div>}

  </div>
  </div>;
};

export default AllMembersModal;
