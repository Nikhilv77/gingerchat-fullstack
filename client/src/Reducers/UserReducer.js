export const UserReducer = (state={AllUsers:[],loading:false,error:null},action)=>{
switch(action.type){
  case 'GET_ALL_USERS_REQUEST':return{
    ...state,
    loading:true,
    error:null,
  }
  case 'GET_ALL_USERS_SUCCESSFUL':return{
    ...state,
    loading:false,
    error:null,
    AllUsers : action.payload
  }
  case 'GET_ALL_USERS_FAILED':return{
    ...state,
    loading:false,
    error:action.payload,
  }
  default:return state
}
}