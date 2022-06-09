import { AxiosInstance } from "./apiBase"


export const GetAllGroup=()=>{
    return AxiosInstance().get("/groups");
}