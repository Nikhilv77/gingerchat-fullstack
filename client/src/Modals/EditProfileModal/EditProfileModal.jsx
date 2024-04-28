import React, { useEffect, useRef, useState } from "react";
import './EditProfileModal.css'
import { UpdateUser, getAllUsers } from "../../Api/UserAPI";
import ClipLoader from "react-spinners/ClipLoader";
import defaultPicture from '../../Images/default-picture.jpg';
import { getAllUsersNames } from '../../Api/UserAPI'
import { UploadRequestAction } from "../../Actions/UploadRequestAction";
import { useDispatch } from "react-redux";
import CreateNewPassword from "../CreateNewPassword/CreateNewPassword";
import ForgotPasswordModal from '../../Modals/ForgotPassword/ForgotPassword'

const EditProfileModal = ({setShowEditAccount,thisUser}) => {
  const dispatch = useDispatch();
  const[successful,setSuccessful] = useState(false)
 const[userNamesArray,setUserNamesArray] = useState([])
 const[userNameIsAvailable,setUserNameIsAvailable] = useState(true)
 const imageRef = useRef();
  const[name,setName] = useState(thisUser.name)
  const[userName,setUserName] = useState(thisUser.userName)
  const[livesIn,setLivesIn] = useState(thisUser.residence)
  const[image,setImage] = useState(thisUser.profilePicture)
  const[newImage,setNewImage] = useState(null)
  const[about,setAbout] = useState(thisUser.about)
  const[updateLoading,setUpdateLoading] = useState(false)
  const[showCreatePassword,setShowCreatePassword] = useState(false);
  const[userEmail,setUserEmail] =  useState('')
  const[showForgotPasswordModal,setShowForgotPasswordModal] = useState(false)
  const handleShowCreateNewPassword = (userEmail)=>{
    setShowCreatePassword(true)
    setUserEmail(userEmail)
  }
  const characterLimit = 120;
  const handleChange = (event) => {
    const text = event.target.value;
    const chars = text.length;
    if (chars <= characterLimit) {
      setAbout(text);
    } 
  };
  useEffect(()=>{
    async function getUserNamesFn(){
      try {
        const response = await getAllUsersNames();
        setUserNamesArray(response.data.filter(userName=>userName !==thisUser.userName))
        console.log(userNamesArray);
      } catch (error) {
        console.log(error);
      }
    }
    getUserNamesFn();
  },[])
  const changeImageHandler=(e)=>{
    if(e.target.files && e.target.files[0]){
      setImage(e.target.files[0])
      setNewImage(e.target.files[0]);
    }
  }
  const updateUserHandler = (e)=>{
    e.preventDefault();
    if(!name || !userName || !livesIn || !about || !userNameIsAvailable){
      alert('please fill all the fields')
      return;
    }
    const object = {
      name:name,
      userName:userName,
      residence:livesIn,
      about:about,
    }
    setUpdateLoading(true);
    if(newImage === null){
      object.image = thisUser.profilePicture;
    }else{
      const data = new FormData();
      const fileName = Date.now() + newImage.name;
      data.append('name',fileName)
      data.append('file',newImage)
      object.image = fileName;
      try {
        dispatch(UploadRequestAction(data))
      } catch (error) {
        console.log(error);
      }
      console.log(object,'after try');
    }
    async function updateUserfn(){
try {
  const response = await UpdateUser({thisUserid : thisUser._id,object:object});
  console.log(response.data);
  setUpdateLoading(false);
  setSuccessful(true);
  setTimeout(()=>{
    setSuccessful(false);
  },3000)
} catch (error) {
  console.log(error);
}
    }
updateUserfn();
  }
  return <div className="edit-profile-modal">
        {showCreatePassword && <CreateNewPassword setShowCreatePassword = {setShowCreatePassword} email = {userEmail}/>}
        {showForgotPasswordModal && <ForgotPasswordModal handleShowCreateNewPassword = {handleShowCreateNewPassword} setShowForgotPasswordModal = {setShowForgotPasswordModal}/>}
    <div className="edit-profile-modal-container">
    <h2>Update your profile</h2>
    {successful && <span className="profile-updated-span">Profile updated successfully</span>}
<i onClick={()=>setShowEditAccount(false)} class="ri-close-large-line"></i>
{!thisUser && <ClipLoader color={"#fff"} size={40}/>}
<div className="edit-profile-modal-items">
 <div className="edit-profile-modal-image">
 {newImage === null ?<img src={image===null?defaultPicture : process.env.REACT_APP_PUBLIC_FOLDER + thisUser.profilePicture} alt="" />:<img src={URL.createObjectURL(newImage)} alt="" />}
  <i onClick={()=>imageRef.current.click()} class="ri-image-edit-fill"></i>
 </div>
<form className="edit-profile-modal-form">
<div className="edit-name-input">
  <label htmlFor="user-name-input">Name</label>
  <input value={name} onChange={(e)=>setName(e.target.value)} type="text" id="user-name-input" />
</div>
<div className="edit-user-name-input">
  <label htmlFor="edit-user-name-input">User name</label>
  <input value={userName}  onChange={(e) => {
                if (!/\s/.test(e.target.value)){
                  setUserName(e.target.value.toLocaleLowerCase())
                  setUserNameIsAvailable(!userNamesArray.includes(e.target.value.toLowerCase()))
                }
              }} type="text" id="edit-user-name-input" />
              {(userName) &&<i title={userNameIsAvailable?'user name available':'user name not available'} class={userNameIsAvailable? "ri-thumb-up-fill":'ri-thumb-down-fill' }></i>}
</div>
<div className="edit-lives-in">
    <label htmlFor="edit-lives-in">Lives in</label>
    <input value={livesIn} onChange={(e)=>setLivesIn(e.target.value)} type="text" id="edit-lives-in" />
</div>
<div className="edit-about">
    <label htmlFor="edit-about">About</label>
     <textarea  id="edit-about" cols="30" rows="8" value={about} onChange={handleChange}></textarea>
</div>
<span>{`${about.length}/${characterLimit}`}</span>
<button onClick={(e)=>{
  e.preventDefault();
  setShowForgotPasswordModal(true)}}>Change Password</button>
<button onClick={updateUserHandler} disabled = {!name || !userName|| !livesIn || !about || !userNameIsAvailable || updateLoading}
className={!name || !userName|| !livesIn || !about || !userNameIsAvailable || updateLoading ? 'update-button-edit-disabled':''}
>{updateLoading ? 'Updating...':'Update'}</button>

<input type="file" hidden ref = {imageRef} onChange = {changeImageHandler} />
</form>
  </div>
  </div>
  </div>;
};

export default EditProfileModal;
