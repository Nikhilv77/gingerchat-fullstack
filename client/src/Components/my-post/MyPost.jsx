import React, { useEffect, useState } from "react";
import './MyPost.css'
import { useSelector } from 'react-redux'
import { likePost } from "../../Api/PostAPI";
import { dislikePost } from "../../Api/PostAPI";
import { socket } from "../../App";
import { fetchComments,fetchLikes } from "../../Api/PostAPI";
import CommentModal from "../../Modals/CommentsModal/CommentModal";
import ProfileModal from "../../Modals/ProfileModal/ProfileModal";
import { getUser } from "../../Api/UserAPI";
import defaultPicture from '../../Images/default-picture.jpg'

const MyPost = ({ post,handleDeletePost,setShowProfileModal }) => {

  const[showComments,setShowComments] = useState(false)
  const user = useSelector(state => state.AuthReducer.authData.savedUser);
  const [likes, setLikes] = useState(null);
  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const[commentsLength,setCommentsLength] = useState(post.comments.length);
  const[thisUser,setThisUser] = useState(null);
  useEffect(()=>{
async function fetchLikesFn(){
try {
  const response = await fetchLikes(post._id);
   setLikes(response.data.length);
} catch (error) {
  console.log(error);
}
}
async function getThisUser(){
  try {
    const response = await getUser(post.userId)
    setThisUser(response.data)
  } catch (error) {
    console.log(error);
  }
}
fetchLikesFn();
getThisUser();
  },[post._id])
  useEffect(() => {
    socket.on(`notifying-likings-${post._id}`, () => {
      async function fetchLikesFn(){
        try {
          const response = await fetchLikes(post._id);
           setLikes(response.data.length);
           console.log(response.data.length);
        } catch (error) {
          console.log(error);
        }
        }
        fetchLikesFn();
    });
  }, [post._id]);
useEffect(()=>{
  async function getComments (){
    const response = await fetchComments(post._id);
    setCommentsLength(response.data.length);
  }
  getComments();
},[post._id])
useEffect(()=>{
  socket.on("receiving-new-comment",(newComment)=>{
   setCommentsLength(prev=>prev+1)
  })
  },[])
  const handleLike = async () => {
    try {
      setLiked(true);
      setLikes(prev=>prev+1);
      const {data} =await likePost({ userId: user._id }, post._id);
      socket.emit('sending-likings', {postId:post._id});
      socket.emit('update-liked',{postId:post._id,liked:true,socketId:socket.id});
      setLikes(data.length)
    } catch (error) {
      console.log(error);
      setLiked(false);
    }
  };

  const handleDislike = async () => {
    try {
      setLiked(false);
      setLikes(prev=>prev-1);
      const {data} = await dislikePost({ userId: user._id }, post._id);
      socket.emit('sending-likings', {postId:post._id});
      socket.emit('update-liked',{postId:post._id,liked:false,socketId:socket.id});
      setLikes(data.length)
    } catch (error) {
      console.log(error);
      setLiked(true);
    }
  };
const handleDelete = ()=>{
  const postId = post._id;
  handleDeletePost(postId)
}
  return (
    <div className="my-post">
      {showComments && <CommentModal setShowComments={setShowComments} setCommentsLength = {setCommentsLength} postId={post._id} userName = {user.name} userId = {user._id}/>}
      <img src={post.image ? process.env.REACT_APP_PUBLIC_FOLDER + post.image : ""} alt="" />
      <div className="my-post-user-description">
      <div onClick={()=>setShowProfileModal(true)} className="mypost-user-description-name-image">
        <img src={thisUser?.profilePicture===null?defaultPicture : process.env.REACT_APP_PUBLIC_FOLDER + thisUser?.profilePicture} alt="" />
        <span  className="user-name-description"><b>{post.userName} </b></span>
        </div>
        <br />
        <span className="my-post-name-description">{post.description}</span>
      </div>
      <hr />
      <div className="my-post-actions">
        <div className="my-post-like-action">
          {liked ? <i onClick={handleDislike} className="ri-heart-fill" /> : <i onClick={handleLike} className="ri-heart-line" />}
          <span>{likes}</span>
        </div>
        <div className="my-post-comment-action">
          <i onClick={()=>setShowComments(true)} className="ri-discuss-line"></i>
          <span>{commentsLength}</span>
        </div>
        <div title="Delete this post" className="my-post-delete-action">
        <i onClick={handleDelete} class="ri-delete-bin-line"></i>
        </div>
      </div>
    </div>
  );
};

export default MyPost; 












// import React, { useEffect, useState } from "react";
// import './Post.css'
// import { useSelector } from 'react-redux'
// import { likeOrDislike } from "../../Api/PostAPI";
// import { socket } from "../../App";
// import ClipLoader from "react-spinners/ClipLoader";


// const Post = ({post}) => {
//   const user = useSelector(state=>state.AuthReducer.authData.savedUser);
//   const [likes, setLikes] = useState(post.likes?.length);
//   const [liked, setLiked] = useState(post.likes.includes(user._id));
//   const[receivedLikes,setReceivedLikes] = useState(null)
//   useEffect(()=>{
// socket.on('receiving-likings',(likes)=>{
// setReceivedLikes(likes)
// })
//   },[])
//   const handleLike = async () => {


//     try {
//       setLikes(prevLikes => {
//         const newLikes = liked ? prevLikes - 1 : prevLikes + 1;
//         socket.emit('sending-likings', newLikes); // Emit updated likes value
//         return newLikes; // Return the updated value
//       });
//       console.log(likes,'likes');
//       console.log(receivedLikes,"receivedlikes");
//       setLiked(!liked);
//       await likeOrDislike({userId: user._id}, post._id);
//     } catch (error) {
//       console.log(error);
//       setLikes(prevLikes => (liked ? prevLikes + 1 : prevLikes - 1));
//       setLiked(!liked);
//     }
//   };

//   return (
//     <div className="post">
//       <img src={post.image ? process.env.REACT_APP_PUBLIC_FOLDER + post.image : ""} alt="" />
//       <div className="post-user-description">
//         <span className="user-name-description"><b>{post.userName} </b></span>
//         <br />
//         <span className="post-name-description">{post.description}</span>
//       </div>
//       <hr />
//       <div className="actions">
//         <div className="like-action">
//           <i onClick={handleLike} className={liked ? "ri-heart-fill" : "ri-heart-line"} />
//           <span>{receivedLikes? receivedLikes:likes}</span>
//         </div>
//         <div className="comment-action">
//           <i className="ri-discuss-line"></i>
//           <span>23</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Post;