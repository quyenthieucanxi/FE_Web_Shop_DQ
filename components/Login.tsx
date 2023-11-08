"use client";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import Input from "./Input";
import Link from "next/link";
import { FormEvent } from "react";
import { signIn, useSession } from "next-auth/react";


export default function Login() {
    const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(formData.get("username"), formData.get("password"));
        await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false,
        })        
    }
    const {data : session} = useSession();
    console.log(session?.user)  
    return (
        <div className="flex justify-center lg:items-center h-screen ">
            <div className="bg-white p-8 rounded shadow-md w-96 ">
                <div className="flex justify-center items-center my-2">
                    <img className="w-full" src="/images/logo.png" alt="logo" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Đăng nhập</h2>
                {
                    <div className="flex items-center space-x-4 mb-2 bg-red-300 p-4">
                        <CgDanger className="w-[20px] h-[20px] text-red-500" />
                        <p className="text-red-500">lỗi</p>
                    </div>
                }

                <form onSubmit={HandleSubmit} className="space-y-4" >
                    <Input label="username" type="text" text="Tài khoản:" ></Input>
                    <Input label="password" type="password" text="Mật khẩu:" ></Input>
                    <div>
                        <a className="text-blue-500 text-sm" href="">Quên mật khẩu?</a>
                    </div>
                    <button
                        type="submit"
                        className="font-medium w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        ĐĂNG NHẬP
                    </button>
                    <div className="flex justify-center items-center">
                        <hr className="w-full h-[1px] border-[#8c8c8c]" />
                        <span className="mx-2 text-sm whitespace-nowrap">
                            Hoặc đăng nhập bằng
                        </span>
                        <hr className="w-full h-[1px] border-[#8c8c8c]" />
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
                        <p className="text-sm">Chưa có tài khoản? <Link className="text-blue-500 text-sm font-bold" href="/signUp">Đăng ký tài khoản mới</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}