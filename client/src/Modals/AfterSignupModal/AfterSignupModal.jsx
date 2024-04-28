import React, { useEffect, useRef, useState } from "react";
import './AfterSignupModal.css'
import ClipLoader from "react-spinners/ClipLoader";
import defaultPicture from '../../Images/default-picture.jpg'
import {signupAction} from '../../Actions/SignupAction'
import { useDispatch } from "react-redux";
import { UploadRequestAction } from "../../Actions/UploadRequestAction";
import { getAllUsersIds } from "../../Api/UserAPI";

const AfterSignupModal = ({setShowVerifyModal,setShowAboutModal,email,password,userName,name}) => {
  console.log(email,password,userName,name);
  const [about, setAbout] = useState('');
  const[city,setCity] = useState('');
  const[image,setImage] = useState(null)
  const characterLimit = 120;
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const text = event.target.value;
    const chars = text.length;
    if (chars <= characterLimit) {
      setAbout(text);
    } 
  };
  const imageRef = useRef();
  
  

  const handleImageChange = (e)=>{
    if(e.target.files && e.target.files[0]){
      setImage(e.target.files[0])
    }
  }
  const signinHandler = (e)=>{
    e.preventDefault();
    const object = {
      email:email,
      password:password,
      userName:userName,
      name:name,
      about:about,
      city:city,
    }
    if(image){
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append('name',fileName)
      data.append('file',image)
      object.image = fileName;
      try {
        dispatch(UploadRequestAction(data))

      } catch (error) {
        console.log(error);
      }
    }else{
      object.image = null;
    }
    async function signupActionFn(){
      try {
        dispatch(signupAction(object));
      } catch (error) {
        console.log(error);
      }
    }
    signupActionFn();
  }
  return <div className="after-signup-modal">
    <div className="after-signup-modal-container">
    <h2>Tell us more about yourself</h2>
<i onClick={()=>setShowAboutModal(false)} class="ri-close-large-line"></i>
{ !email || !password || !userName || !name && <ClipLoader color={"#fff"} size={40}/>}
<div className="after-signup-modal-items">
 <div className="after-signup-modal-image">
  <img src={image?URL.createObjectURL(image):defaultPicture} alt="" />
  <i onClick={()=>imageRef.current.click()} class="ri-image-edit-fill"></i>
 </div>
<form onSubmit={signinHandler} className="after-signup-modal-form">
<div className="edit-lives-in">
    <label htmlFor="edit-lives-in">City</label>
    <input required value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Enter your city (e.g., Mumbai)" type="text" id="edit-lives-in" />
</div>
<div className="edit-about">
    <label htmlFor="edit-about">About</label>
     <textarea required placeholder="Describe yourself in short" id="edit-about" cols="30" rows="8" value={about} onChange={handleChange}></textarea>
</div>
<span>{`${about.length}/${characterLimit}`}</span>
<button disabled = {!city || !about} className={(!city || !about) ? 'signin-button-disabled':''}  type="submit">Sign in</button>
<input ref={imageRef} type="file" hidden onChange = {handleImageChange} />
</form>
  </div>
  </div>
  </div>;
};

export default AfterSignupModal;
