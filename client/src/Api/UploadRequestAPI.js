import axios from "axios";
const API = axios.create({baseURL:'http://localhost:6000'});

export const uploadRequest = (imageData)=>API.post('/uploadRequest/',imageData)