import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/LoginPage/Login";
import Signup from "./Pages/SignupPage/Signup";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Chat } from "./Pages/Chat/Chat";
import DeleteAccountModal from "./Modals/DeleteAccountModal/DeleteAccountModal";
import LogoutModal from "./Modals/LogoutModal/LogoutModal";
import { io } from 'socket.io-client';
import { useEffect,useState } from "react";

function App() {
  const user = useSelector(state => state.AuthReducer?.authData?.savedUser);
  const socket = io('http://localhost:8800');

  

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="app">
      <div
        onClick={() => {
          document.getElementsByClassName('logout-modal')[0].style.display = 'none';
          document.getElementsByClassName('logout-backdrop')[0].style.display = 'none';
        }}
        className="logout-backdrop"
      ></div>

      <div
        onClick={() => {
          document.getElementsByClassName('delete-account-modal')[0].style.display = 'none';
          document.getElementsByClassName('delete-account-backdrop')[0].style.display = 'none';
        }}
        className="delete-account-backdrop"
      ></div>

      <DeleteAccountModal />
      <LogoutModal />

      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/signup" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to = '/'/>} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export const socket = io('http://localhost:8800');
export default App;
