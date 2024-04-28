import React, { useState } from 'react'
import './VerifySignupModal.css'
import { useDispatch } from 'react-redux'
import AfterSignupModal from '../AfterSignupModal/AfterSignupModal'

const VerifySignupModal = ({
  OTP,
  setShowVerifyModal,
  email,
  password,
  userName,
  name,
}) => {
  const dispatch = useDispatch()
  const [userOTP, setUserOTP] = useState(null)
  const[wrongOTP,setWrongOTP] = useState(false)
  const[showAboutModal,setShowAboutModal] = useState(false);
  
  const verificationHandler = () => {
    console.log(parseInt(userOTP),OTP,'compare');
    if(parseInt(userOTP) === OTP){
    setShowAboutModal(true)
    }else{
      setWrongOTP(true)
      setTimeout(()=>{
setWrongOTP(false)
      },3000)
    }
  }
  return (
    <div className="verify-signup-modal">
      {!wrongOTP && showAboutModal && <AfterSignupModal
      setShowVerifyModal={setShowVerifyModal}
      setShowAboutModal={setShowAboutModal}
      email={email}
      password={password}
      userName={userName}
      name={name}
      />}
      <div className="verify-signup-modal-container">
        <i
          onClick={() => setShowVerifyModal(false)}
          class="ri-close-large-line"
        ></i>
        <h2>{`We have sent a one-time password (OTP) to your email address ${email}. Please check your inbox for the OTP.`}</h2>
        <div className="authentication-otp">
          <i class="ri-mail-line"></i>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              console.log(userOTP)
            }}
            className="signup-auth-form"
          >
            <input
              value={userOTP}
              onChange={(e) => {
                setUserOTP(e.target.value)
              }}
              type="text"
              placeholder="Enter OTP"
            />
            <button onClick={verificationHandler} type="submit">Verify</button>
            {wrongOTP && <p>Wrong OTP</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default VerifySignupModal
