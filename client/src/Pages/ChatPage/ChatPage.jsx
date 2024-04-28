import React, { useRef } from 'react'

import Navbar from '../../Components/Navbar/Navbar'
import './ChatPage.css'
import { useSelector } from 'react-redux'
import Conversations from '../../Components/Conversations/Conversations'
import { getUserChats } from '../../Api/ChatAPI'
import ChatTop from '../../Components/ChatTop/ChatTop'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { socket } from '../../App'

const ChatPage = () => {
  const user = useSelector((state) => state.AuthReducer?.authData?.savedUser)
  const [currentChat, setCurrentChat] = useState(null)
  const [chatUsers, setChatUsers] = useState([])
  const [sendMessage, setSendMessage] = useState()
  const [onlineUsers, setOnlineUsers] = useState([])
  const [receivedMessage, setReceivedMessage] = useState('')
  const[showChatsModal,setShowChatsModal] = useState(false);
  const[previousRender,setPreviousRender] = useState(false)
  useEffect(() => {
    socket.emit('add-user', user._id)
    socket.on('get-users', (users) => {
      setOnlineUsers(users)
      console.log(onlineUsers, 'onlineusers')
    })
  }, [user])
  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit('send-message', sendMessage)
    }
  }, [sendMessage])
  useEffect(() => {
    socket.on('receive-message', (data) => {
      console.log(data, 'received message')
      setReceivedMessage(data)
    })
  }, [])
  useEffect(() => {
    async function fetchChatUsers() {
      const { data } = await getUserChats(user._id)
      setChatUsers(data)
    }
    fetchChatUsers()
  }, [user._id])

  return (
    <div className="chatpage">
      <div className="chat-container">
       {showChatsModal &&  <div onClick={()=>setShowChatsModal(false)} className="conversation-mobile-backdrop"></div>}
      {showChatsModal && <div className="conversation-container-mobile">
          {chatUsers.map((chat) => {
            return (
              <div
                onClick={() => {
                  setCurrentChat(chat)
                  setShowChatsModal(false)
                }}
              >
         
                <Conversations previousRender = {previousRender} setPreviousRender = {setPreviousRender}  chat={chat} currentUserId={user._id} />
              </div>
            )
          })}
        </div>}
        <div className="conversation-container">
          {chatUsers.map((chat) => {
            return (
              <div
                onClick={() => {
                  setCurrentChat(chat)
                }}
              >
                <Conversations previousRender = {previousRender} setPreviousRender = {setPreviousRender} chat={chat} currentUserId={user._id} />
              </div>
            )
          })}
        </div>

        {currentChat ? (
          <ChatTop
           setPreviousRender = {setPreviousRender}
            currentChat={currentChat}
            currentUserId={user._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
            setShowChatsModal = {setShowChatsModal}
          />
        ) : (
          <div className="no-chat">
            <div className="no-chat-icons">
            <i class="ri-chat-1-fill"></i>
            <p>Select a chat to start messaging...</p>
            <div onClick={()=>setShowChatsModal(true)} className="no-chat-show-chat">
<i class="ri-chat-heart-fill"></i>
<span>Chats</span>
</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatPage


// import React, { useRef } from 'react'
// import img3 from '../../Images/selfie.jpeg'
// import Navbar from '../../Components/Navbar/Navbar'
// import './ChatPage.css'
// import { useSelector } from 'react-redux'
// import Conversations from '../../Components/Conversations/Conversations'
// import { getUserChats } from '../../Api/ChatAPI'
// import ChatTop from '../../Components/ChatTop/ChatTop'
// import { useEffect, useState } from 'react'
// import { io } from 'socket.io-client'
// import socializing from '../../Images/chatting.png'

// const ChatPage = () => {
//   const user = useSelector((state) => state.AuthReducer?.authData?.savedUser)
//   const [currentChat, setCurrentChat] = useState(null)
//   const [chatUsers, setChatUsers] = useState([])
//   const [sendMessage, setSendMessage] = useState()
//   const socket = useRef()
//   const [onlineUsers, setOnlineUsers] = useState([])
//   const [receivedMessage, setReceivedMessage] = useState('')
//   useEffect(() => {
//     socket.current = io('http://localhost:8900')
//     socket.current.emit('add-user', user._id)
//     socket.current.on('get-users', (users) => {
//       setOnlineUsers(users)
//       console.log(onlineUsers, 'onlineusers')
//     })
//     return ()=>{
//       socket.current.disconnect();
//     }
//   }, [user])
//   useEffect(() => {
//     if (sendMessage !== null) {
//       socket.current.emit('send-message', sendMessage)
//     }
//   }, [sendMessage])
//   useEffect(() => {
//     socket.current.on('receive-message', (data) => {
//       console.log(data, 'received message')
//       setReceivedMessage(data)
//     })
//   }, [])
//   useEffect(() => {
//     async function fetchChatUsers() {
//       const { data } = await getUserChats(user._id)
//       setChatUsers(data)
//     }
//     fetchChatUsers()
//   }, [user._id])

//   return (
//     <div className="chatpage">
//       <div className="chat-container">
//         <div className="conversation-container">
//           {chatUsers.map((chat) => {
//             return (
//               <div
//                 onClick={() => {
//                   setCurrentChat(chat)
//                 }}
//               >
//                 <Conversations chat={chat} currentUserId={user._id} />
//               </div>
//             )
//           })}
//         </div>
 
//         {currentChat ? (
//           <ChatTop
//             currentChat={currentChat}
//             currentUserId={user._id}
//             setSendMessage={setSendMessage}
//             receivedMessage={receivedMessage}
//           />
//         ) : (
//           <img className="chatting-image" src={socializing}></img>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ChatPage