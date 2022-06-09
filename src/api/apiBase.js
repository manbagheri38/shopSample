import axios from "axios"

export const AxiosInstance=()=>{
  return  axios.create({
        baseURL:'http://localhost:4000',
        
    })
}

export const AxiosAspInstance=()=>{
  return axios.create({
    baseURL:"http://localhost:50914"
  })
}