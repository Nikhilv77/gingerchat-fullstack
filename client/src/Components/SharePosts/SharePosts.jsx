import React, { useEffect, useRef, useState } from "react";
import photoIcon from '../../Images/photo-icon.png'
import {useSelector} from 'react-redux'
import { UploadRequestAction } from "../../Actions/UploadRequestAction";
import {useDispatch} from 'react-redux'
import { makePost } from "../../Api/PostAPI";
import './SharePosts.css'
import { socket } from "../../App";
import { getUser } from "../../Api/UserAPI";
import defaultPicture from '../../Images/default-picture.jpg'
const PostShare = () => {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.AuthReducer.authData.savedUser)
    const[thisUser,setThisUser] = useState(null);
    const[error,setError] = useState(null);
    useEffect(()=>{
        async function getUserFunction(){
            try {
                const response = await getUser(user._id);
               setThisUser(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        getUserFunction();
    },[])
   const[image,setImage] = useState(null);
   const imageRef = useRef();
   const desc = useRef();
   const handleImageChange = (e)=>{
    console.log(e.target.files[0],'share');
        if(e.target.files && e.target.files[0]){
            setImage(
         (e.target.files[0])
            )
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
       if(!desc.current.value || !image){
        setError("Please give both description and image");
        setTimeout(()=>{
            setError(null)
        },3000)
        return;
       }
        const newPost = {
            userId :user._id,
            userName:user.name,
            description : desc.current.value
        }
        if(image){
            console.log(image);
            const data=new FormData();
            const fileName= Date.now()+image.name;
            data.append("name", fileName);
            data.append("file", image); 
            newPost.image=fileName;
            console.log(newPost);
            try {
                dispatch(UploadRequestAction(data))
             } catch (error) {
                console.log(error);
             }
        }
        async function makePostFunction(){
            try {
                const response = await makePost(newPost);
                socket.emit("sending-new-post", response.data);
            } catch (error) {
                console.log(error);
            }
        }
        makePostFunction();
        reset();
    }
    const reset = ()=>{
        desc.current.value = "";
        setImage(null)
    }
  return <div className="post-share-card">
    <div className="upper-post-share">
    <img className="share-image" src={thisUser?.profilePicture===null?defaultPicture : process.env.REACT_APP_PUBLIC_FOLDER + thisUser?.profilePicture} alt="" />
        <input ref={desc} required className="share-input" type="text" placeholder={`What's on your mind, ${thisUser?.name.split(' ')[0]}?`} />
    </div>
   
   <div className="share-post-comps">
        <div onClick={()=>imageRef.current.click()} style={{color:'green',cursor:"pointer"}} className="action">
        <img src={photoIcon} alt="" />
        <span>Image</span>
    </div>
        <button onClick={handleSubmit} className="share-button">Post</button>
    
  </div>
  <input type="file" ref={imageRef} hidden onChange={handleImageChange} />
   {
    image && <div className="show-image">
     <i onClick = {()=>{
        imageRef.current.value = null;
        setImage(null)}} class="ri-close-large-line"></i>
     <img src={URL.createObjectURL(image)} alt="" />
    </div>
   }
  {error && <span className="share-post-error">{error}</span>}
  </div>;
};

export default PostShare;
