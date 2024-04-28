import React, { useState } from 'react'
import './ForgotPassword.css'
import { useDispatch } from 'react-redux'
import { verifyUserAPI } from '../../Api/LoginAPI'


const ForgotPasswordModal = ({
  setShowForgotPasswordModal,
  handleShowCreateNewPassword
}) => {
  const dispatch = useDispatch()
  const [userOTP, setUserOTP] = useState(null);
  const[userEmail,setUserEmail] = useState('');
  const[wrongOTP,setWrongOTP] = useState(false)
  const[OTP,setOTP] = useState(null)
  const[verificationLoading,setVerificationLoading] = useState(false)
  const[showDisabled,setShowDisabled] = useState(true)
  
const sendOTPHandler = () => {
  try {
    async function sendingOTP(){
    setVerificationLoading(true)
     const oneTimePassword = Math.floor(Math.random() * 9000 + 1000);
     const data = {email:userEmail,oneTimePassword}
     const response = await verifyUserAPI(data);
     console.log(response.data);
     setOTP(response.data)
     setShowDisabled(false)
     setVerificationLoading(false)
    }
    sendingOTP()
  
   } catch (error) {
     console.log(error);
   }
}

  const verificationHandler = () => {
    console.log(parseInt(userOTP),OTP,'from forgotPassword');
    if(parseInt(userOTP) === OTP){
      handleShowCreateNewPassword(userEmail)
      setShowForgotPasswordModal(false)
    }else{
      setWrongOTP(true)
      setTimeout(()=>{
setWrongOTP(false)
      },3000)
    }
  }
  return (
    <div className="forgot-password-modal">

      <div className="forgot-password-modal-container">
        <i
          onClick={() => setShowForgotPasswordModal(false)}
          class="ri-close-large-line"
        ></i>
        <div className="authentication-otp">
          <i class="ri-mail-line"></i>
          <div
            className="signup-auth-form"
          >
            
               <input
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value.trim())
              }}
              type="text"
              placeholder="Enter your email to send OTP"
            />
            <button disabled = {verificationLoading} onClick={sendOTPHandler}>{verificationLoading?'Sending...':'Send OTP'}</button>
            <input
              value={userOTP}
              onChange={(e) => {
                setUserOTP(e.target.value)
              }}
              type="text"
              placeholder="Enter OTP"
            />
            <button disabled = {showDisabled} className={showDisabled ? 'disabled-verify':''} onClick={verificationHandler}>Verify</button>
            {wrongOTP && <p>Wrong OTP</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordModal
