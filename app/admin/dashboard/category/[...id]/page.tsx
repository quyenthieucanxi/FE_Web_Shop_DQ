"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Toast from "@/components/Toast";
import axios from "@/libs/axios";
import { GetCategoryById, Update } from "@/services/CategoryService";
import { makeSlug } from "@/utils/StringHelper";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Console } from "console";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";



export default function UpdateCategoryPage({ params }: { params: { id: string[] } }) {
    const queryClient = useQueryClient();
    const fetchData = async () => {
        const res = await GetCategoryById(params.id[0]);
        return res.data as Category
    }
    const { data } = useQuery({
        queryKey: ["id", params.id[0]],
        queryFn: fetchData,
        placeholderData: keepPreviousData,
    })
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
                    urlImg: res.data.data.url,
                })
            }
            await Update(params.id[0], form);
            queryClient.invalidateQueries({queryKey: ['categoreies']})
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
            categoryName: data?.categoryName || "",
            categoryPath: data?.categoryPath || "",
            urlImg: selectedImage ? selectedImage : data?.urlImg || "",
        })
    }, [data, selectedImage])
    useEffect(()=> {
        setForm({
            ...form,     
            categoryPath: makeSlug(form?.categoryName),
        })
        
    },[form?.categoryName])
    console.log("dads")
    return (
        <div className=" mx-auto mt-5 w-[700px]">
            <Toast />
            <Input onChange={handleChangeInput} label="categoryName" type="text" text="Tên thể loại" value={form?.categoryName}></Input>
            <div className="my-3">
                <span className="text-sm font-normal mr-5">Ảnh</span>
                <input ref={inputFileRef} onChange={handleFileChange} type="file" accept="image/*" />
                <img className="max-h-[250px] max-w-[250px] mt-2" src={form.urlImg} alt="" />
            </div>
            <Button onClick={handleUpdate} className="my-4" childern="Xác nhận"></Button>
        </div>
    )

}