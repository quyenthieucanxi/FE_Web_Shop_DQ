import axios from "@/libs/axios";

export async function GetAllCategory (){
    const res = await axios.get("/api/Category/GetAll");
    return res.data;
}
export async function GetCategoryById(CateId: string){
    const res = await axios.get(`/api/Category/$GetbyId=${CateId}`);
    return res.data;
}
export const Update = async (model : Object) => {
    const res = await axios.put(`/api/Category/Update`,model)
    return res.data;
}

