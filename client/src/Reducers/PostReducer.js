export const PostReducer = (state={Posts:[],loading:false,error:null},action)=>{
  switch(action.type){
    case 'CREATE_REQUEST':return{
      ...state,
      loading:true,
      error:null,
    }
    case'CREATE_SUCCESSFUL':return{
      ...state,
      Posts : [action.payload,...state.Posts],
      loading:false,
      error:null
    }
    case 'CREATE_FAILED':return{
      ...state,
      loading:false,
      error:action.payload
    }
    default:return state
  }
}

export const GetAllPostsReducer = (state={AllPosts:[],loading:false,error:null},action)=>{
  switch(action.type){
    case 'GET_POSTS_REQUEST':return{
      ...state,
      loading:true,
      error:null,
    }
    case'GET_POSTS_SUCCESSFUL':return{
      ...state,
      AllPosts : action.payload,
      loading:false,
      error:null
    }
    case 'GET_POSTS_FAILED':return{
      ...state,
      loading:false,
      error:action.payload
    }
    default:return state
  }
}