import { AxiosInstance } from "../apiBase"


export const getAllParentGroup=()=>{
    return AxiosInstance().get('/groups');
}
export const InsertGroup=(group)=>{
    return AxiosInstance().post('/groups',group);
}