"use client";
import Input from "./Input"
import { FormEvent, useState } from "react";
import axios from "@/libs/axios";
import { CgDanger } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";
import Toast from "./Toast";
import { toast } from "react-toastify";


export default function ForgetPassword() {
    const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const body = {
            email : formData.get("email"),
            newPassword : formData.get("new_password"),
            confirmPassword : formData.get("confirm_password"),
        }
        try {
            await axios.post("/api/Authentication/ForgetPassword", body ).then(() => {
                toast.success(`Thư xác nhận đặt mật lại mật khẩu đã gửi tới ${body.email}! `, {
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
            )
            
        }
        catch (error) {
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
        <div className="flex justify-center lg:items-center h-screen ">
            <Toast />
            <div className="bg-white p-8 rounded shadow-md w-96 ">
                <div className="flex justify-center items-center my-2">
                    <img className="w-full" src="/images/logo.png" alt="logo" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Đặt lại mật khẩu</h2>
                
                <form onSubmit={HandleSubmit} className="space-y-4" >
                    <Input label="email" type="text" text="Email:" ></Input>
                    <Input label="new_password" type="password" text="Mật khẩu mới:" ></Input>
                    <Input label="confirm_password" type="password" text="Xác nhận mật khẩu:" ></Input>
                    <button
                        type="submit"
                        className="font-medium w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        TIẾP TỤC
                    </button>
                </form>
                <div className="flex justify-center mt-4">                
                        <Link className="text-blue-500 text-sm font-bold ml-1" href="/signIn">Đăng nhập ngay</Link>
                </div>
            </div>
        </div>
    )
}