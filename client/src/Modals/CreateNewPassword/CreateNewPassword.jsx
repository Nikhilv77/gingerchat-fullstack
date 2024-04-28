import React, { useState } from "react";
import './CreateNewPassword.css'
import { updatePassword } from "../../Api/LoginAPI";

const CreateNewPassword = ({setShowCreatePassword,email}) => {
  const[success,setSuccess] = useState(false);
  const[error,setError] = useState('');
  const[password,setPassword] = useState('')
  const handleUpdatePassword = async()=>{
    console.log(password,email);
    
   if(password.length<6){
    setError('Password must be atleast 6 characters')
    setTimeout(()=>{
      setError('')
    },3000)
    return;
   }
     try {
      await updatePassword({email,password});
      setSuccess(true);
     } catch (error) {
      setError(error.message);
     }
  }
  return <div className="create-password-modal">
    <div className="create-password-modal-container">
      {success && <div className="update-password-success">
      <i class="ri-check-double-line"></i>
        <p>Password updated successfully, login with the new credentials</p></div>}
      {error && <div className="update-password-failed">
      <i class="ri-thumb-down-line"></i>
        <p>{error}</p>
        </div>}
    <i onClick={()=>setShowCreatePassword(false)} class="ri-close-large-line"></i>
      
  { !success &&  <div className="create-password-modal-body">
        <h2>Create New Password</h2>
        <div className="create-password-modal-form">
        <input value={password} onChange={(e)=>{
     setPassword(e.target.value.trim())
        }} type="text" placeholder="Enter a new Password"/>
        <button onClick={handleUpdatePassword}>Submit</button>
        </div>
        </div>}
    </div>
  </div>;
};

export default CreateNewPassword;
