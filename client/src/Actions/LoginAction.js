import * as LoginAPIs from '../Api/LoginAPI';
export const loginAction = (loginData,setAuthError)=>async(dispatch)=>{
  dispatch({type:'AUTH_REQUEST'});
  try {
    const response = await LoginAPIs.LoginAPI(loginData);
    dispatch({type:'AUTH_SUCCESSFUL',payload:response.data});
  } catch (error) {
    console.log(error);
    dispatch({type:'AUTH_FAILED',payload:error});
    setAuthError(error.response.data.message)
  }
}

export const logoutAction = ()=>async(dispatch)=>{
  dispatch({type:'LOGOUT_REQUEST'});
  try{
   localStorage.clear();
   dispatch({type:'LOGOUT_SUCCESSFUL'});
  }catch(error){
    dispatch({type:'LOGOUT_FAILED', payload:error});  
console.log(error);
  }
  return null;
}

export const deleteAccountAction = (userId)=>async(dispatch)=>{
  dispatch({type:'DELETE_ACCOUNT_REQUEST'});
  try{
   const response = await LoginAPIs.deleteAccountAPI(userId);
    localStorage.clear();
    dispatch({type:'DELETE_ACCOUNT_SUCCESSFUL'});
  }catch(error){
    dispatch({type:'DELETE_ACCOUNT_FAILED', payload:error});
    console.log(error);
  }
}