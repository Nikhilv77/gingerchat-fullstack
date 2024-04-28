import axios from 'axios'
const api = axios.create({baseURL:'http://localhost:6000'})
export const LoginAPI = (loginData)=>
  api.post('/auth/login',loginData)
export const deleteAccountAPI = (userId)=>api.post('/auth/delete-account',userId)

export const verifyUserAPI = (token)=>api.post('/auth/user-verification', token)

export const updatePassword = (data)=> api.put('/auth/update-password',data)