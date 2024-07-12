import axios from "@/libs/axios";


export const GetPostLimite = async (page: number, limit: number, catPath?: string, search?: string, orderByDirection?: string) => {
    //const res = await axios.get(`/api/Post/GetAllByItemPage?page=${page}&limit=${limit}${catPath ?  `&catName=${catPath}&${search}`: ``}&orderByDirection=${orderByDirection}`)
    const catPathQuery = catPath ? `&catName=${catPath}` : '';
    const searchQuery = search ? `&search=${search}` : '';
    const res = await axios.get(`/api/Post/GetAllByItemPage?page=${page}&limit=${limit}${catPathQuery}${searchQuery}&orderByDirection=${orderByDirection}`);
    return res.data;
}

export const GetPostById = async (id: string) => {
    const res = await axios.get(`/api/Post/GetById?postId=${id}`)
    return res.data
}
export const GetPostByPath = async (path: string) => {
    const res = await axios.get(`/api/Post/GetByPath?pathPost=${path}`)
    return res.data
}

export const GetPostByStatus = async (status: string, page?: number, limit?: number) => {
    const res = await axios.get(`/api/Post/GetByStatus?${page && limit ? `page=${page}&limit=${limit}&status=${status}` : `status=${status}`} `)
    return res.data;
}

export const GetAll = async () => {
    const res = await axios.get(`/api/Post/GetAll`)
    return res.data;
}

export const UpdateStatus = async (id: string, status: string) => {
    const res = await axios.put(`/api/Post/UpdateStatus/${id}?status=${status}`)
    return res.data;
}
export const Update = async (model : Object) => {
    const res = await axios.put(`/api/Post/Update`,model)
    return res.data;
}

export const Delete = async (id: string) => {
    const res = await axios.put(`/api/Post/Delete/${id}`)
    return res.data;
}
