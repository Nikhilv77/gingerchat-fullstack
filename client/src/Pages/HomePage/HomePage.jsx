import React, { useEffect, useState } from 'react'
import './HomePage.css'

import MiddleColumn from '../../Components/MiddleColumn/MiddleColumn'
import Navbar from '../../Components/Navbar/Navbar'
import HomeLeft from '../../Components/Home-Left/HomeLeft'
import HomeRight from '../../Components/Home-Right/HomeRight'
import AllMembersModal from '../../Modals/AllMembersModal/AllMembersModal'
import FriendRequestsModal from '../../Modals/FriendRequestsModal/FriendRequestsModal'
import { useSelector,useDispatch } from 'react-redux'
import { getAllUsersIds } from '../../Api/UserAPI'
import { createChat } from '../../Api/ChatAPI'
import { UpdateUserState } from '../../Actions/UserActions'


const HomePage = () => {
  const[showMembersModal,setShowMembersModal] = useState(false)
  const[friendRequestModal,setFriendRequestsModal] = useState(false);
  const savedUser = useSelector(state=>state.AuthReducer.authData.savedUser)
  const dispatch = useDispatch();
  useEffect(()=>{
  async function createChatFn(){
    if(savedUser.chatsCreated === false){
      const response = await getAllUsersIds();
      console.log(response.data,"something is wrong");
      const otherUserIds = response.data.filter(userId=>userId !== savedUser._id)
      otherUserIds.forEach(async (userId) => {
       try {
         console.log(savedUser._id, userId, "from after signup");
         const response = await createChat({ senderId: savedUser._id, receiverId: userId });
         console.log(response);
       } catch (error) {
         console.log(error);
       }
     });
      dispatch(UpdateUserState(savedUser._id))     
   }
  }
  createChatFn(); 
  },[])
  return (
    <>
{showMembersModal && <AllMembersModal setShowMembersModal={setShowMembersModal}/>}
{friendRequestModal && <FriendRequestsModal setFriendRequestsModal={setFriendRequestsModal}/>}
{showMembersModal && <div onClick={()=>setShowMembersModal(false)} className="find-friends-backdrop"></div>}
{friendRequestModal && <div onClick={()=>setFriendRequestsModal(false)} className="friend-requests-backdrop"></div>}



      <Navbar />
      <div className="home">
      <div className="left-home-side">
      <HomeLeft setFriendRequestsModal={setFriendRequestsModal} setShowMembersModal = {setShowMembersModal}/>
      </div>
      <div className="middle-home-side">
        <MiddleColumn />
      </div>
        <div className="right-home-side">
        <HomeRight/>
        </div>

      </div>
    </>
  )
}

export default HomePage
