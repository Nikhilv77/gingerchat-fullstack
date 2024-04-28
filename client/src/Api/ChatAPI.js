import axios from 'axios'
const API= axios.create({baseURL:'http://localhost:6000'})

export const getUserChats = (id)=> API.get(`/chat/${id}`)
export const createChat = (data)=> API.post('/chat/',data)