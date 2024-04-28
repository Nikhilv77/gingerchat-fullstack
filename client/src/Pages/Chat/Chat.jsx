import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import ChatPage from "../ChatPage/ChatPage";

export const Chat = () => {
  return <div className="chatpage-container">
    <Navbar/>
    <ChatPage/>
  </div>;
};
