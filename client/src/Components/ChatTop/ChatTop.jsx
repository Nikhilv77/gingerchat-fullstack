import {useSelector} from 'react-redux'
import React, { useRef } from "react";
import "./ChatTop.css";
import { useEffect,useState } from "react";
import { getUser } from "../../Api/UserAPI";
import { getMessages } from "../../Api/MessageAPI";
import {format} from "timeago.js"
import InputEmoji from "react-input-emoji";
import { sendMessage } from "../../Api/MessageAPI";
import OthersProfileModal from '../../Modals/OtherProfileModal/OtherProfileModal';
import defaultPicture from '../../Images/default-picture.jpg'

const ChatTop = ({currentChat,currentUserId,setSendMessage,receivedMessage,setShowChatsModal,setPreviousRender}) => {
  const scroll = useRef();
  console.log(receivedMessage,"received-message");
  const user = useSelector((state) => state.AuthReducer?.authData?.savedUser)

  const[otherUsersData,setOtherUsersData] = useState([])
  const[messages,setMessages] = useState([])
  const[newMessage,setNewMessage] = useState("")
  const[showothersProfileModal,setShowOthersProfileModal] = useState(false);
  useEffect(()=>{
if(receivedMessage!==null && receivedMessage?.chatId === currentChat._id){
setMessages([...messages, receivedMessage])
}
  },[receivedMessage])
  useEffect(()=>{
    const otherUserId = currentChat?.members?.find(id=>id!==currentUserId)
   async function getotherUsers(){
    try {
      const{data} = await getUser(otherUserId)
      setOtherUsersData(data);
    } catch (error) {
      console.log(error);
    }
   
    }
    if(currentChat !==null)getotherUsers();
  },[currentChat,currentUserId])
useEffect(()=>{
  async function fetchMessages(){
    console.log("fired");
    const{data} = await getMessages(currentChat._id)
    setMessages(data)
  }
  if(currentChat!==null)fetchMessages();
},[currentChat])
console.log(messages,"messages");

const handleOnEnter = async(e)=>{

  const message = {
    senderId:currentUserId,
    text:newMessage,
    chatId:currentChat._id
  }
  const receiverId = currentChat?.members?.find(id=>id!==currentUserId)
  setSendMessage({...message,receiverId})
  setSendMessage({...message, receiverId})
  console.log(message,'newmessage');
  try {
    const{data} = await sendMessage(message)
    setMessages([...messages,data])
  } catch (error) {
    console.log(error);
  }

}
useEffect(() => {
  console.log("Scrolling...");
  console.log(scroll.current); // Check if the ref is available
  scroll.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);
  return(  <>
        {showothersProfileModal && <OthersProfileModal setPreviousRender={setPreviousRender} setShowOthersProfileModal={setShowOthersProfileModal} userId={otherUsersData._id} />}
        { showothersProfileModal && <div onClick={()=>setShowOthersProfileModal(false)} className="others-profile-modal-backdrop"></div>}
  <div className="chat-top">

<div className="chat-top-upper">
  <div className='chat-top-upper-user'>
  <img src={otherUsersData.profilePicture===null?defaultPicture : process.env.REACT_APP_PUBLIC_FOLDER + otherUsersData.profilePicture} alt="" />
<p onClick={()=>setShowOthersProfileModal(true)}>{otherUsersData.name}</p>
</div>
<div onClick={()=>setShowChatsModal(true)} className="chat-top-upper-chats">
<i class="ri-menu-unfold-fill"></i>
<span>Chats</span>
</div>
</div>
<div   className="chat-top-body">
  {messages.length === 0? <div className='no-messages'><i class="ri-chat-delete-line"></i><p>No messages yet</p></div> : null}
  {messages.map(message=>{
    return (<div className='message-scroller' ref={scroll}>
    <p className={message.senderId === user._id? 'my-message':'others-message'}>{message.text}
    <br />
    <span>{format(message.createdAt)}</span>
    </p>

    </div>)
  })}
</div>
<div className="chat-top-bottom">
  <InputEmoji
  fontFamily= 'Josefin Sans, sans-serif'
  fontSize={21}
  borderColor='#383838'
  borderRadius={8}
  height={60}
    value={newMessage}
    onChange={setNewMessage}
    cleanOnEnter
    onEnter={handleOnEnter}
    placeholder="Type a message"
  />
  <button onClick={handleOnEnter}>Send</button>
</div>
  </div>
  </>)
};
export default ChatTop;
