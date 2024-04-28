export const AuthReducer = (state = {authData:null,loading:false,error:null,requestLoading:false,requestError:null},action)=>{
switch(action.type){
  case 'AUTH_REQUEST':return{
    ...state,
    loading : true,
    error:null
  }
  case 'AUTH_SUCCESSFUL':
  localStorage.setItem("user",JSON.stringify({...action?.payload}))  
  return{
    ...state,
    loading:false,
    authData:action.payload,
    error:null,
  }
  case 'AUTH_FAILED':
  return{
    ...state,
    loading:false,
    error:action.payload
  }
  case 'UPDATE_CREATE_CHAT_REQUEST':return{
    ...state,
    loading : true,
    error:null
  }
  case 'UPDATE_CREATE_CHAT_SUCCESSFUL':
  return{
    ...state,
    loading:false,
    authData: {
      ...state.authData,
      savedUser: action.payload
    },
    error:null,
  }
  case 'UPDATE_CREATE_CHAT_FAILED':
  return{
    ...state,
    loading:false,
    error:action.payload
  }
  case 'SEND_FRIEND_REQUEST_REQUEST':return{
    ...state,
    requestLoading:true,
    requestError:null,
  }
  case 'SEND_FRIEND_REQUEST_SUCCESSFUL':return{
    ...state,
    requestLoading:false,
    requestError:null,
    authData:action.payload,
  }
  case 'SEND_FRIEND_REQUEST_FAILED':return{
    ...state,
    requestLoading:true,
    requestError:action.payload,
  }
  case 'UNDO_FRIEND_REQUEST_REQUEST':return{
    ...state,
    requestLoading:true,
    requestError:null,
  }
  case 'UNDO_FRIEND_REQUEST_SUCCESSFUL':return{
    ...state,
    requestLoading:false,
    requestError:null,
    authData:action.payload,
  }
  case 'UNDO_FRIEND_REQUEST_FAILED':return{
    ...state,
    requestLoading:true,
    requestError:action.payload,
  }
  case 'LOGOUT_REQUEST':return{
    ...state,
    loading : true,
    error:null
  }
  case 'LOGOUT_SUCCESSFUL':
  return{
    ...state,
    loading:false,
    authData:null,
    error:null,
  }
  case 'LOGOUT_FAILED':
  return{
    ...state,
    loading:false,
    error:action.payload
  }

  case 'DELETE_ACCOUNT_REQUEST':return{
    ...state,
    loading : true,
    error:null
  }
  case 'DELETE_ACCOUNT_SUCCESSFUL':
  return{
    ...state,
    loading:false,
    authData:null,
    error:null,
  }
  case 'DELETE_ACCOUNT_FAILED':
  return{
    ...state,
    loading:false,
    error:action.payload
  }
  default : return state
}
}
