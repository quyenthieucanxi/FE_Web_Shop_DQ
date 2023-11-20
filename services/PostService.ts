import axios from "@/libs/axios";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";



export async function AddPost(body: object) {
    const axiosAuth = useAxiosAuth()
    const res = await axiosAuth.post("/api/Post/Create", body);
    return res.data;
}