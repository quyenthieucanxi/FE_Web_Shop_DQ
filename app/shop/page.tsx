"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { toast } from "react-toastify";
import { makeSlug } from "@/utils/StringHelper";
import Toast from "@/components/Toast";



export default function ShopPage() {
    const axiosAuth = useAxiosAuth()
    const [form, setForm] = useState({
        name: "",
        path: "",
        description : "",
        address : "",
    })
    const handleChangeInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleConfirm = async () => {
        try {
            const res = await axiosAuth.post(`/api/User/CreateShop`,{
                ...form,
                path : makeSlug(form.name)
            });
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
            toast.error(error.response.data.message, {
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
        <div className="max-w-[760px] mx-auto mt-20 h-screen">
            <Toast />
            <Input value={form.name} onChange={handleChangeInput} label="name" type="text" text="Tên cửa hàng" classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" />
            <Input value={form.description} onChange={handleChangeInput}  label="description" type="text" text="Mô tả cửa hàng" textarea={true} className="h-[110px]" classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" />
            <Input value={form.address} onChange={handleChangeInput} label="address" type="text" text="Địa chỉ" classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" />
            <div className="flex justify-center">
                <div className="w-[50%] mt-6 iten">
                    <Button onClick={handleConfirm} childern="Xác nhận"></Button>
                </div>
            </div>
        </div>
    )
}