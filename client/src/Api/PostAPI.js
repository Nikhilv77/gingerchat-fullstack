import axios from 'axios';
const API = axios.create({baseURL:'http://localhost:6000'});
export const createPostAPI =(postData)=> API.post('/posts/createPost',postData);

export const getAllPostsAPI = ()=>API.get('/posts/getAllPosts');
export const getUserPosts = (userId)=>API.get(`/posts/${userId}/get-user-posts`)
export const fetchLikes = (postId)=> API.get(`/posts/${postId}/get-likes`);
export const likePost =(userId,postId)=> API.put(`/posts/${postId}/like`,userId)
export const dislikePost =(userId, postId)=> API.put(`/posts/${postId}/dislike`, userId)
export const fetchComments = (postId)=> API.get(`/posts/${postId}/comments`);
export const makeComment = (commentData,postId)=>API.post(`/posts/${postId}/make-comment`,commentData)

export const fetchAllPosts = ()=> API.get('/posts/getAllPosts');
export const makePost = (postData)=> API.post('/posts/createPost', postData);

export const deletePost = (postId)=> API.delete(`/posts/${postId}/delete`);