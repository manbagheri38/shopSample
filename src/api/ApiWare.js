import { AxiosInstance } from "./apiBase";



export const GetAllWare=()=>{
   return AxiosInstance().get('/ware');
}

export const getWareById=(id)=>{
   return AxiosInstance().get('/ware/'+id);
}