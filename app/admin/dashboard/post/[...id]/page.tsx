"use client";
import Input from "@/components/Input"
import Button from "@/components/Button"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetPostById, Update } from "@/services/PostService";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "@/libs/axios";
import Toast from "@/components/Toast";
import { makeSlug } from "@/utils/StringHelper";


export default function UpdatePost({ params }: { params: { id: string[] } }) {
    const queryClient = useQueryClient();
    const fetchData = async (): Promise<Product> => {
        const res = await GetPostById(params.id[0]);
        return res.data
    }
    const { data, isSuccess } = useQuery({
        queryKey: ["id", params.id[0]],
        queryFn: fetchData,
    })
    const inputFileRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const [form, setForm] = useState({
        id: "",
        title: "",
        postPath: "",
        description: "",
        urlImage: "",
        price: "",
        quantity: 0,
    })
    useEffect(() => {
        setForm({
            ...form,
            id: params.id[0],
            title: data?.title || "",
            postPath: makeSlug(data?.title || ""),
            description: data?.description || "",
            urlImage: selectedImage ? selectedImage : data?.urlImage || "",
            price: data?.price || "",
            quantity: data?.quantity || 0,
        })
    }, [data, selectedImage])
    const handleChangeInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleUpdate = async () => {
        try {
            if (selectedImage) {
                const imageFile = inputFileRef.current.files[0];
                const formDataImg = new FormData();
                formDataImg.append("formFile", imageFile);
                const res = await axios.post("/api/File/Upload", formDataImg, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                setForm({
                    ...form,
                    urlImage: res.data.data.url,
                })
            }
            const res =  await Update(form);
            queryClient.invalidateQueries({ queryKey: ["id", params.id[0]] });
            toast.success("Cập nhập thành công", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        } catch (error) {
            toast.error(error.response.data.Message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }
    console.log(form)
    return (
        isSuccess ?
            <div className=" mx-auto mt-5 w-[700px]">
                <Toast />
                <Input onChange={handleChangeInput} label="title" type="text" text="Tên sản phẩm" value={form.title}></Input>
                <div className="my-3">
                    <span className="text-sm font-normal mr-5">Ảnh</span>
                    <input ref={inputFileRef} onChange={handleFileChange} type="file" accept="image/*" />
                    <img className="max-h-[250px] max-w-[250px]" src={form.urlImage} alt="" />
                </div>
                <Input onChange={handleChangeInput} label="description" type="text" text="Mô tả sản phẩm" textarea={true} value={form.description} className="h-[110px]" classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" />
                <Input onChange={handleChangeInput} label="price" type="number" text="Giá" value={form.price} classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" />
                <Input onChange={handleChangeInput} label="quantity" type="number" text="Số lượng" placeholder="0" value={form?.quantity.toString()} classNamelable="mt-2 after:content-['*'] after:ml-2 after:text-[#e5193b]" />
                <Button onClick={handleUpdate} className="my-4" childern="Xác nhận"></Button>
            </div>
            :
            <></>
    )
}