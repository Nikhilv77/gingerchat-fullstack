import axios from 'axios'
const API = axios.create({baseURL:'http://localhost:6000'})
// API.interceptors.request.use((req)=>{
//     if(localStorage.getItem('user')){
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
//     }
//     return req;
// })
export const getAllUsers = ()=>API.get('/user/getAllUsers');
export const getAllUsersIds = ()=>API.get('/user/getAllUsersIds');
export const getAllUsersNames = ()=>API.get('/user/getAllUserNames');
export const getAllUserEmails = ()=>API.get('/user/getAllUserEmails');
export const sendFriendRequest = (friendData)=>API.post('/user/sendFriendRequest',friendData);
export const undoFriendRequest = (friendData)=>API.post('/user/undoFriendRequest',friendData);
export const acceptFriendRequest = (friendData)=>API.post('/user/acceptFriendRequest', friendData);
export const declineFriendRequest = (friendData)=>API.post('/user/declineFriendRequest', friendData);
export const unfriendUser = (friendData)=>API.post('/user/unfriendUser', friendData);
export const getUser = (id)=>API.get(`/user/${id}`);
export const UpdateCreatedChat = (id)=>API.put(`/user/update-created-chat/${id}`);
export const UpdateUser = ({thisUserid,object})=>API.put(`/user/${thisUserid}`,object);
export const getFilteredUsers = (filter)=>API.get(`/user/getFilteredUsers/${filter}`);
