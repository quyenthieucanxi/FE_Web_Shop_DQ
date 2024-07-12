import axios from "@/libs/axios";

export async function GetAllCategory (){
    const res = await axios.get("/api/Category/GetAll");
    return res.data;
}
export async function GetCategoryById(CateId: string){
    const res = await axios.get(`/api/Category/${CateId}`);
    return res.data;
}
export const Update = async (CateId: string,model : Object) => {
    const res = await axios.put(`/api/Category/Update/${CateId}`,model)
    return res.data;
}
export const Delete = async (CateId: string) => {
    const res = await axios.put(`/api/Category/Delete/${CateId}`)
    return res.data;
}
export async function Create (model: Object){
    const res = await axios.post(`/api/Category/Create`,model);
    return res.data;
}
