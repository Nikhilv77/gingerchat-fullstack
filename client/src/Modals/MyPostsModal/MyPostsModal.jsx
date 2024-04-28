import React, { useEffect, useState } from "react";
import './MyPostsModal.css'
import MyPost from '../../Components/my-post/MyPost';
import {useSelector} from 'react-redux'
import { getUserPosts } from "../../Api/PostAPI";
import ClipLoader from "react-spinners/ClipLoader";
import { socket } from "../../App";
import { deletePost } from "../../Api/PostAPI";
const MyPostsModal = ({setShowMyPosts,setShowProfileModal}) => {
  const user = useSelector(state=>state.AuthReducer.authData.savedUser)
  let[userPosts,setUserPosts] = useState([])
  const[loading,setLoading] = useState(null)
  useEffect(()=>{
    async function getUserPostsFn(){
      setLoading(true)
      try {
        const response = await getUserPosts(user._id);
        console.log(response.data);
        setUserPosts(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    }
    getUserPostsFn();
  },[])
 const handleDeletePost = async(postId)=>{
userPosts = userPosts.filter(post=>post._id !== postId)
setUserPosts(userPosts)
try {
  await deletePost(postId);
} catch (error) {
  console.log(error);
}
socket.emit('delete-Post',postId)
 }

  return ( <div className="my-posts-modal">
    <div className="my-posts-modal-container">
      <h2>My Posts</h2>
    <i onClick={()=>setShowMyPosts(false)} className="ri-close-large-line"></i>
     <div className="my-posts">
     {loading === false && userPosts.length===0 &&
     <div className="no-user-posts">
      <i class="ri-slideshow-line"></i>
      <span>You haven't made any post </span>
      </div>}
   {userPosts?userPosts.map((post,index)=>{
    return <MyPost setShowProfileModal = {setShowProfileModal} handleDeletePost={handleDeletePost} key={index} post = {post}/>
   }):  <ClipLoader
   className="my-post-loader"
   size={20}
   color="#333"
   aria-label="Loading Spinner"
   data-testid="loader"
 />}
  </div>
  </div>
  </div>);
};

export default MyPostsModal;

