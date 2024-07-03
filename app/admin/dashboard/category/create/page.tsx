"use client";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Toast from "@/components/Toast";
import axios from "@/libs/axios";
import { toast } from "react-toastify";
import { Create } from "@/services/CategoryService";
import { useQueryClient } from "@tanstack/react-query";
import { makeSlug } from "@/utils/StringHelper";


export default function CreatCategoryPage() {
    const queryClient = useQueryClient();
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
        categoryName: "",
        categoryPath: "",
        urlImg: "",
    })
    const handleChangeInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        setForm({
            ...form,
            urlImg: selectedImage  || "",
        })
    }, [selectedImage])
    useEffect(()=> {
        setForm({
            ...form,     
            categoryPath: makeSlug(form?.categoryName),

        })
        
    },[form?.categoryName])
    const handleCreate = async () => {

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
                    urlImg: res.data.data.url,
                })
            }
            await Create(form)
            queryClient.invalidateQueries({queryKey: ['categoreies']})
            toast.success("Tạo thành công", {
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
    return (
        <>
        <div className=" mx-auto mt-5 w-[700px]">
            <Toast />
            <Input onChange={handleChangeInput} label="categoryName" type="text" text="Tên thể loại" value={form?.categoryName}></Input>
            <div className="my-3">
                <span className="text-sm font-normal mr-5">Ảnh</span>
                <input ref={inputFileRef} onChange={handleFileChange} type="file" accept="image/*" />
                <img className="max-h-[250px] max-w-[250px] mt-2" src={form.urlImg} alt="" />
            </div>
            <Button onClick={handleCreate} className="my-4" childern="Xác nhận"></Button>
        </div>
        </>
    )
}