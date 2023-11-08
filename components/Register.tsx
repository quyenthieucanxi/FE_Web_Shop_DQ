"use client";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import Input from "@/components/Input";
import Link from "next/link";
import { signIn } from "next-auth/react";
export default function Register () {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-96 ">
                <div className="flex justify-center items-center my-2">
                    <img className="w-full" src="/images/logo.png" alt="logo" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Đăng ký tài khoản</h2>
                <form className="space-y-4" >
                    <Input label="name" type="text" text="Họ và tên:" ></Input>
                    <Input label="username" type="text" text="Tên đăng nhập:" ></Input>
                    <Input label="password" type="password" text="Mật khẩu:" ></Input>
                    <div className="flex space-x-2 items-center">
                        <input className="w-8 h-8" type="checkbox" />
                        <p className="text-sm">Bằng việc Đăng ký, bạn đã đọc và đồng ý với Điều khoản sử dụng và Chính sách bảo mật</p>
                    </div>
                    <button
                        type="submit"
                        className="font-medium w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        ĐĂNG KÝ
                    </button>
                    <div className="flex justify-center items-center">
                        <hr className="w-full h-[1px] border-[#8c8c8c]"/>
                        <span className="mx-2 text-sm whitespace-nowrap">
                        Hoặc đăng nhập bằng
                        </span>
                        <hr className="w-full h-[1px] border-[#8c8c8c]"/>
                    </div>
                    <div className="grid grid-cols-3 space-x-4">
                        <div className="flex items-center justify-center space-x-2 rounded cursor-pointer border-slate-400	border-[1px] p-2">
                            <a href=""><FaFacebook className="w-[20px] h-[20px] fill-blue-500"></FaFacebook></a>
                            <p className="text-sm font-semibold">Facebook</p>
                        </div>
                        <div className="flex items-center justify-center space-x-2 rounded cursor-pointer border-slate-400 border-[1px] p-2">
                            <a href=""><FaGoogle className="w-[20px] h-[20px] fill-red-500"></FaGoogle></a>
                            <p className="text-sm font-semibold">Google</p>
                        </div>
                    </div>
                    <div className="flex justify-center">                     
                        <p className="text-sm">Đã có tài khoản? <Link className="text-blue-500 text-sm font-bold" href="/signIn">Đăng nhập ngay</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}