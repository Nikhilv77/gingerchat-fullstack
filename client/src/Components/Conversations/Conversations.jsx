import { useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { getUser } from '../../Api/UserAPI';
import './Conversations.css';
import defaultPicture from '../../Images/default-picture.jpg'
import { socket } from '../../App';


const Conversations = ({chat,currentUserId,previousRender}) => {
  
  const[otherUsersData,setOtherUsersData] = useState([])
  const[thisUserData,setThisUserData] = useState([]);
  const savedUser = useSelector(state=>state.AuthReducer.authData.savedUser)
  
  const[againRender,setAgainRender] = useState(false)
  useEffect(()=>{
    socket.on(`receiving-accepting-request-${savedUser._id}`,()=>{
      setAgainRender(prev=>!prev)
    })
    socket.on(`receiving-unfriend-${savedUser._id}`,()=>{
      setAgainRender(prev=>!prev)
    })
  },[])
  useEffect(()=>{
    async function fetchThisUser(){
      try {
        const{data} = await getUser(currentUserId)
        setThisUserData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchThisUser();
      },[previousRender,againRender])
 
  useEffect(()=>{
    const otherUserId = chat?.members?.filter(id=>id!==currentUserId)[0]
   async function getotherUsers(){
    try {
      const{data} = await getUser(otherUserId)
      setOtherUsersData(data);
    } catch (error) {
      console.log(error);
    }
   
    }
    getotherUsers();
  },[])
  
  return <div className='conversation-top'>
  <div className="conversation">
  <img src={otherUsersData.profilePicture===null?defaultPicture : process.env.REACT_APP_PUBLIC_FOLDER + otherUsersData.profilePicture} alt="" />
    <div className="conversation-information">
    <p>{otherUsersData.name}</p>
   {thisUserData?.friends?.length>0 && thisUserData?.friends.includes(otherUsersData._id)? <span className='user-is-friend'>Friend❤</span>:<span className='user-is-stranger'>Stranger😈</span>}
    </div>

  </div>
  {/* <hr className='conversation-hr' /> */}
  </div>;
};

export default Conversations;
