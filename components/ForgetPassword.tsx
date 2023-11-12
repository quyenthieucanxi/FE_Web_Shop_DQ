"use client";
import Input from "./Input"
import { FormEvent, useState } from "react";
import axios from "@/libs/axios";
import { CgDanger } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";


export default function ForgetPassword() {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const body = {
            email : formData.get("email"),
            newPassword : formData.get("new_password"),
            confirmPassword : formData.get("confirm_password"),
        }
        try {
            const res = await axios.post("/api/Authentication/ForgetPassword", body )
            setMessage(`Thư xác nhận đặt mật lại mật khẩu đã gửi tới ${body.email}`)
        }
        catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            }
            else if (error.request) {
                setError("Yêu cầu không hoàn thành:" + error.request.toString());
            } else {
                setError("Lỗi khi gửi yêu cầu:" + error.message.toString());
            }
        }

    }
    return (
        <div className="flex justify-center lg:items-center h-screen ">
            <div className="bg-white p-8 rounded shadow-md w-96 ">
                <div className="flex justify-center items-center my-2">
                    <img className="w-full" src="/images/logo.png" alt="logo" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Đặt lại mật khẩu</h2>
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
            </div>
        </div>
    )
}