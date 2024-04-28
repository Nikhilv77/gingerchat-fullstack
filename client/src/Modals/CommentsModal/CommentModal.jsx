import React, { useRef } from "react";
import './CommentModal.css'
import { format } from "timeago.js";
import { fetchComments } from "../../Api/PostAPI";
import ClipLoader from "react-spinners/ClipLoader";
import { useState,useEffect } from "react";
import { makeComment } from "../../Api/PostAPI";
import { socket } from "../../App";
import OthersProfileModal from "../OtherProfileModal/OtherProfileModal";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useSelector } from "react-redux";
import { getUser } from "../../Api/UserAPI";
import defaultPicture from '../../Images/default-picture.jpg'

const CommentModal = ({setShowComments,postId,userName,setCommentsLength,userId}) => {
  const user = useSelector((state) => state.AuthReducer?.authData?.savedUser)
  const[comments,setComments] = useState([]);
const[showOthersProfileModal,setShowOthersProfileModal] = useState(false)
const[thisUser,setThisUser] = useState(null)
  const inputComment = useRef();
  const[loadingComments,setLoadingComments] = useState([]);
  const[otherUserId,setOtherUserId] = useState(null)
  useEffect(()=>{
  socket.on(`receiving-new-comment${postId}`,(newComment)=>{
    setComments(prev=>[newComment,...prev])
  })
  },[])
  useEffect(()=>{
    async function getComments (){
      setLoadingComments(true)
      const response = await fetchComments(postId);
   
      setLoadingComments(false);
      setComments(response.data);
    }
    async function getThisUser(){
      try {
        const response = await getUser(userId)
        setThisUser(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    getComments();
    getThisUser();
  },[postId])
  const handleMakeComment = async()=>{
    if(inputComment.current.value === "") return;
   const newComment = {
    userId:userId,
    userName:userName,
    userProfilePicture:thisUser.profilePicture===null?null:thisUser
    .profilePicture,
    comment:inputComment.current.value,
    date:new Date()
   }
   inputComment.current.value = "";
   socket.emit(`sending-new-comment`,{postId,newComment});
   await makeComment(newComment,postId);
  }

  return <div className="comment-modal">
{showOthersProfileModal&& otherUserId && <OthersProfileModal userId={otherUserId}  setShowOthersProfileModal={setShowOthersProfileModal}/>}

    <div className="comment-modal-container">
    {loadingComments ? <ClipLoader color="#333" size={30}/>:<> 
<i onClick={()=>setShowComments(false)} class="ri-close-large-line"></i>
{comments.length === 0 && loadingComments === false && <h4 className="no-comments">There are no comments at this moment !</h4>}
<div className="comment-modal-items">
   {comments.map(comment=>{
    return<> <div className="comment-modal-item">
      <div className="comment-modal-item-name-image">
      <img src={comment.userProfilePicture===null?defaultPicture : process.env.REACT_APP_PUBLIC_FOLDER + comment.userProfilePicture} alt="" />
    <h4 className={comment.userId !== user._id ?"comment-modal-item-other-user":''} onClick={()=>{
      if(user._id !== comment.userId){
        setOtherUserId(comment.userId)
        setShowOthersProfileModal(true)
      }
    }}>{comment.userId === user._id ?   `You` : comment.userName}</h4>
    </div>
    <p>{`"${comment.comment}"`}</p>
   <span>Commented {format(comment.date)}</span>
    </div>
    <hr className="comment-line" />
    </>
   })}
   </div>
   <div className="add-comment">
    <textarea ref={inputComment} name="" id="" cols="30" rows="6"></textarea>
    <button onClick={handleMakeComment}>Add Comment</button>
   </div>
   </> }
   </div>

  </div>;
};

export default CommentModal;