import React, { useState } from 'react'
import './LoginForm.css'
import {useNavigate} from 'react-router-dom'
import {loginAction} from '../../Actions/LoginAction'
import {useDispatch,useSelector} from 'react-redux'
import ForgotPasswordModal from '../../Modals/ForgotPassword/ForgotPassword'
import CreateNewPassword from '../../Modals/CreateNewPassword/CreateNewPassword'
import gcLogo from '../../Images/gc-logo-login.png'

const LoginForm = () => {
  const dispatch = useDispatch();
  const{loading,error,authData} = useSelector(state=>state.AuthReducer)
  console.log(loading);
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const[showForgotPasswordModal,setShowForgotPasswordModal] = useState(false)
  const[showCreatePassword,setShowCreatePassword] = useState(false);
  const handleShowCreateNewPassword = (userEmail)=>{
    setEmail(userEmail)
    setShowCreatePassword(true)
  }
const [authError,setAuthError] = useState(false)
  const LoginHander = (e)=>{
    e.preventDefault();
    if(!email || !password){
      return
    }
      dispatch(loginAction({email,password},setAuthError))
  }
  return (
    <div className="login-component">
      <img src={gcLogo} alt="" />
      {showCreatePassword && <CreateNewPassword setShowCreatePassword = {setShowCreatePassword} email = {email}/>}
      {showForgotPasswordModal && <ForgotPasswordModal handleShowCreateNewPassword = {handleShowCreateNewPassword} setShowForgotPasswordModal = {setShowForgotPasswordModal}/>}
      <form onSubmit={LoginHander} className="login-form">
        <div className="logo">
          <div>
            <h2 className="logo-text">Ginger</h2>
            <h2 className="logo-text">Chat</h2>
          </div>
          <span>Login to chat with your friends.</span>
        </div>

        <div className="inputs">
          <div className="email-input-login">
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              type="text"
              placeholder="email"
            />
          </div>
          <div className="password-input-login">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
          { password && <i onClick={()=>setShowPassword(!showPassword)} class={showPassword?'ri-eye-fill':'ri-eye-off-fill'}></i>}
          </div>
          {authError && <span className="auth-error">{authError}</span>}
        </div>
        <div className="login-button">
          <button type='submit'  disabled = {loading}>{loading? 'loging in...' : 'Log in'}</button>
        </div>
        <div className="forgot-password">
          <span onClick={()=>setShowForgotPasswordModal(true)}>Forgot Password?</span>
        </div>
      </form>
      <div className="redirect-to-signup">
        <span>Don't have an account?</span>
        <span onClick={()=>{
          navigate('/signup')
        }}>Sign up</span>
      </div>
    </div>
  )
}

export default LoginForm
