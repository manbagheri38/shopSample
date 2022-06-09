import { AxiosAspInstance, AxiosInstance } from "../apiBase"



export const InsertWare=(ware)=>{
    return AxiosAspInstance().post('/api/wares',ware);
}


export const getWareDetailById=(wareId)=>{
    return AxiosInstance().get('/waredetails');
}
export const DeleteDetailByWareId=(id)=>{
   // return AxiosInstance().delete
}