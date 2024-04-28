import React, { useEffect, useState } from 'react'
import './SignupForm.css'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { getAllUsersNames } from '../../Api/UserAPI'
import { getAllUserEmails } from '../../Api/UserAPI'
import VerifySignupModal from '../../Modals/VerifySignupModal/VerifySignupModal'
import { verifyUserAPI } from '../../Api/LoginAPI'
import gcLogo from '../../Images/gc-logo-login.png'

const SignupForm= () => {

  const dispatch = useDispatch();
  const{loading,error,authData} = useSelector(state=>state.AuthReducer)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const[name,setName] =useState('')
  const[userName,setUserName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const[userNamesArray,setUserNamesArray] = useState([]);
  const[userNameAvailable,setUserNameAvailable] = useState(null);
  const[userEmailsArray,setUserEmailsArray] = useState([]);
  const[userEmailAvailable,setUserEmailAvailable] = useState(null);
  const[passwordIsOkay,setPasswordIsOkay] = useState(null);
const[errorOccured,setErrorOccured] = useState(null);
const[showVerifyModal,setShowVerifyModal] = useState(false);
const[verificationLoading,setVerificationLoading] = useState(false);
const[OTP,setOTP] = useState(null);
  useEffect(()=>{
    async function getUserNamesFn(){
      try {
        const response = await getAllUsersNames();
        setUserNamesArray(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    async function getUserEmailsFn(){
      try {
        const response = await getAllUserEmails();
       setUserEmailsArray(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    getUserNamesFn();
    getUserEmailsFn();
  },[])
  const singupHandler = (e)=>{
    e.preventDefault();
    if (!email) {
      setErrorOccured("Please enter your email address.");
      setTimeout(()=>{
        setErrorOccured(false)
      },3000)
    } else if (!email.includes('@')) {
      setErrorOccured("Please enter a valid email address.");
      setTimeout(()=>{
        setErrorOccured(false)
      },3000)
    } else if (!userName) {
      setErrorOccured("Please enter a username.");
      setTimeout(()=>{
        setErrorOccured(false)
      },3000)
    } else if (!userNameAvailable) {
      setErrorOccured("Username is already taken.");
      setTimeout(()=>{
        setErrorOccured(false)
      },3000)
    } else if (!name) {
      setErrorOccured("Please enter your name.");
      setTimeout(()=>{
        setErrorOccured(false)
      },3000)
    } else if (!userEmailAvailable) {
      setErrorOccured("Email is already registered.");
      setTimeout(()=>{
        setErrorOccured(false)
      },3000)
    } else if (!password) {
      setErrorOccured("Please enter your password.");
      setTimeout(()=>{
        setErrorOccured(false)
      },3000)
    } else if (!passwordIsOkay) {
      setErrorOccured("Please enter a password with at least 6 characters.");
      setTimeout(()=>{
        setErrorOccured(false)
      },3000)
    } else {
  try {
   async function sendingOTP(){
   setVerificationLoading(true)
    const oneTimePassword = Math.floor(Math.random() * 9000 + 1000);
    const data = {email,oneTimePassword}
    const response = await verifyUserAPI(data);
    setOTP(response.data)
    setVerificationLoading(false)
   }
   sendingOTP()
   setShowVerifyModal(true)
 
  } catch (error) {
    console.log(error);
  }
    }
    
  }

  return (
    <div className="signup-component">
      <img src={gcLogo} alt="" />
      {showVerifyModal && OTP && <div onClick={()=>setShowVerifyModal(false)} className="verify-signup-backdrop"></div>}
      {showVerifyModal && OTP && <VerifySignupModal OTP={OTP} setShowVerifyModal={setShowVerifyModal} email={email} password={password} userName={userName} name={name}/>}
      <form onSubmit={singupHandler} className="signup-form">
        <div className="logo">
          <div>
            <h2 className="logo-text">Ginger</h2>
            <h2 className="logo-text">Chat</h2>
          </div>
          <span>signup to chat with your friends.</span>
        </div>

        <div className="inputs">
        <div className="name-input-signup">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                
              }}
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="user-name-input-signup">
            <input
              value={userName}
              onChange={(e) => {
                if (!/\s/.test(e.target.value)){
                  setUserName(e.target.value.toLocaleLowerCase())
                  setUserNameAvailable(!userNamesArray.includes(e.target.value.toLowerCase()))
                }
              }}
              type="text"
              placeholder="User Name"
            />
       {(userName && userNameAvailable !== null) &&<i title={userNameAvailable?'user name available':'user name not available'} class={userNameAvailable? "ri-thumb-up-fill":'ri-thumb-down-fill' }></i>}
          </div>
          <div className="email-input-signup">
            <input
              value={email}
              onChange={(e) => {
                if (!/\s/.test(e.target.value)){
                  setEmail(e.target.value.toLocaleLowerCase())
                  setUserEmailAvailable(!userEmailsArray.includes(e.target.value.toLocaleLowerCase()))
                }
              
              }}
              type="text"
              placeholder="Email"
            />
                   {(userEmailAvailable === false) &&<i title='email is already registered' class='ri-thumb-down-fill'></i>}
          </div>
          <div className="password-input-signup">
            <input
              value={password}
              onChange={(e) => {
                if (!/\s/.test(e.target.value)){
                  setPassword(e.target.value)
                  setPasswordIsOkay(e.target.value.length >= 6)
                }
                
              }}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
             
          { password && <i onClick={()=>setShowPassword(!showPassword)} class={showPassword?'ri-eye-fill':'ri-eye-off-fill'}></i>}
          </div>
        </div>
        <div className="signup-button">
          <button type='submit'  disabled = {showVerifyModal}>{verificationLoading? 'processing...' : 'Sign up'}</button>
        </div>
        {errorOccured && <span className='password-invalid'>{errorOccured}</span>}
      </form>
      <div className="redirect-to-signup">
        <span>Already have an account?</span>
        <span onClick={()=>{
          navigate('/login')
        }}>Log in</span>
      </div>
    </div>
  )
}

export default SignupForm
