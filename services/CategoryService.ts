import axios from "@/libs/axios";

export async function GetAllCategory (){
    const res = await axios.get("/api/Category/GetAll");
    return res.data;
}

