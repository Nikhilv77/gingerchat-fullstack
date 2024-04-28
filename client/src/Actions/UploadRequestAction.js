import * as uploadRequestAPI from '../Api/UploadRequestAPI';

export const UploadRequestAction = (imageData)=>async(dispatch)=>{
  try {
    await uploadRequestAPI.uploadRequest(imageData);
  } catch (error) {
    console.log(error);
  }
}