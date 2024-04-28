import * as signupAPIs from '../Api/SignupAPI'
export const signupAction = (signupData)=>async(dispatch)=>{
  console.log(signupData);
  dispatch({type:'AUTH_REQUEST'})
  try {
    const response = await signupAPIs.signupAPI(signupData);
    console.log(response);
    dispatch({type:"AUTH_SUCCESSFUL",payload:response.data})
  } catch (error) {
    console.log(error);
    dispatch({type:"AUTH_FAILED",payload:error})
  }
}