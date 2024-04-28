import * as UserAPIs from '../Api/UserAPI'
export const getAllUsers = ()=>async(dispatch)=>{
  dispatch({type:'GET_ALL_USERS_REQUEST'})
  try {
    const response = await UserAPIs.getAllUsers();
    dispatch({type:'GET_ALL_USERS_SUCCESSFUL',payload:response.data})
  } catch (error) {
    dispatch({type:'GET_ALL_USERS_FAILED',payload:error})
  }
}
export const UpdateUserState = (userId)=>async(dispatch)=>{
  dispatch({type:'UPDATE_CREATE_CHAT_REQUEST'})
  try {
    const response = await UserAPIs.UpdateCreatedChat(userId);
    dispatch({type:'UPDATE_CREATE_CHAT_SUCCESSFUL',payload:response.data})
  } catch (error) {
    dispatch({type:'UPDATE_CREATE_CHAT_FAILED',payload:error})
  }
}
export const sendFriendRequest = (friendData)=>async(dispatch)=>{
  dispatch({type:'SEND_FRIEND_REQUEST_REQUEST'})
  try {
    const response = await UserAPIs.sendFriendRequest(friendData);
    console.log(response.data,"coming from actions");
    dispatch({type:'SEND_FRIEND_REQUEST_SUCCESSFUL',payload:response.data})
  } catch (error) {
    dispatch({type:'SEND_FRIEND_REQUEST_FAILED',payload:error})
  }
}
export const undoFriendRequestAction = (friendData)=>async(dispatch)=>{
  dispatch({type:'UNDO_FRIEND_REQUEST_REQUEST'})
  try {
    const response = await UserAPIs.undoFriendRequest(friendData);
    dispatch({type:'UNDO_FRIEND_REQUEST_SUCCESSFUL',payload:response.data})
  } catch (error) {
    dispatch({type:'UNDO_FRIEND_REQUEST_FAILED',payload:error})
  }
}