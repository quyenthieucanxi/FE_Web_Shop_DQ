"use client";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import Input from "@/components/Input";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import axios from "@/libs/axios";
import { signIn } from "next-auth/react";

export default function Register() {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const body = {
            userName: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
        }
        if (formData.get("checkPolicy")) {
            try {
                const res = await axios.post("/api/Authentication/register", body);
                setMessage(`Người dùng đã tạo & Mail xác minh tài khoản được gửi tới ${body.email} !`)
            }
            catch (error) {
                if (error.response) {
                    setError(error.response.data.message.toString());
                }
                else if (error.request) {
                    setError("Yêu cầu không hoàn thành:" + error.request.toString());
                } else {
                    setError("Lỗi khi gửi yêu cầu:" + error.message.toString());
                }
            }
        }
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-96 ">
                <div className="flex justify-center items-center my-2">
                    <img className="w-full" src="/images/logo.png" alt="logo" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Đăng ký tài khoản</h2>
                <form onSubmit={HandleSubmit} className="space-y-4" >
                    {
                        !!error
                            ?
                            <div className="flex items-center  mb-2 bg-red-300 p-4 gap-4">
                                <div>
                                    <CgDanger className="w-[20px] h-[20px] text-red-500" />
                                </div>
                                <p className="w-[calc(100% - 40px)] text-red-500">{error}</p>
                            </div>
                            :
                            (
                                !!message ?
                                    <div className="flex items-center  mb-2 bg-green-300 p-4 gap-4">
                                        <div>
                                            <FaCheck className="w-[20px] h-[20px] text-green-500" />
                                        </div>
                                        <p className="w-[calc(100% - 40px)] text-green-500">{message}</p>
                                    </div> :
                                    <></>
                            )
                    }
                    <Input label="username" type="text" text="Tên đăng nhập :" ></Input>
                    <Input label="email" type="text" text="Email:" ></Input>
                    <Input label="password" type="password" text="Mật khẩu:" ></Input>
                    <div className="flex space-x-2 items-center">
                        <input name="checkPolicy" className="w-8 h-8" type="checkbox" />
                        <p className="text-sm">Bằng việc Đăng ký, bạn đã đọc và đồng ý với Điều khoản sử dụng và Chính sách bảo mật</p>
                    </div>
                    <button
                        type="submit"
                        className="font-medium w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        ĐĂNG KÝ
                    </button>

                </form>
                <div className="flex justify-center items-center my-3 ">
                    <hr className="w-full h-[1px] border-[#8c8c8c]" />
                    <span className="mx-2 text-sm whitespace-nowrap">
                        Hoặc đăng nhập bằng
                    </span>
                    <hr className="w-full h-[1px] border-[#8c8c8c]" />
                </div>
                <div className="grid grid-cols-1 space-x-4 my-4">
                    {/* <button onClick={() => signIn("facebook")} className="flex items-center justify-center space-x-2 rounded cursor-pointer border-slate-400	border-[1px] p-2">
                        <FaFacebook className="w-[20px] h-[20px] fill-blue-500"></FaFacebook>
                        <p className="text-sm font-semibold">Facebook</p>
                    </button> */}
                    <button onClick={() => signIn("google")} className="flex items-center justify-center space-x-2 rounded cursor-pointer border-slate-400 border-[1px] p-2">
                        <FaGoogle className="w-[20px] h-[20px] fill-red-500"></FaGoogle>
                        <p className="text-sm font-semibold">Google</p>
                    </button>
                </div>
                <div className="flex justify-center">
                    <p className="text-sm">Đã có tài khoản?
                        <Link className="text-blue-500 text-sm font-bold ml-1" href="/signIn">Đăng nhập ngay</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}