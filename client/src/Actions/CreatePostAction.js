import * as PostAPIs from '../Api/PostAPI'
export const CreatePostAction = (postData)=>async(dispatch)=>{
dispatch({type:'CREATE_REQUEST'});
try {
  const response = await PostAPIs.createPostAPI(postData);
  dispatch({type:'CREATE_SUCCESSFUL', payload:response.data})
} catch (error) {
  console.log(error);
  dispatch({type:'CREATE_FAILED',payload:error})
}
}

export const GetAllPosts = ()=>async(dispatch)=>{
  dispatch({type:'GET_POSTS_REQUEST'});
  try {
    const response = await PostAPIs.getAllPostsAPI();

    dispatch({type:'GET_POSTS_SUCCESSFUL',payload:response.data})
  } catch (error) {
    dispatch({type:'GET_POSTS_FAILED',payload:error})
  }
}