"use client";
import Link from "next/link";
import { useState } from "react";
import Input from "@/components/Input";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { CgDanger } from "react-icons/cg";
import { toast } from "react-toastify";
import Toast from "@/components/Toast";





export default function AccountPage() {
    const axiosAuth = useAxiosAuth();
    const [error, setError] = useState("")
    const [oldPassword, setOldPasswords] = useState("");
    const handleoOnChangeOldPassword = (e) => {
        setOldPasswords(e.target.value)
    }
    const [newPassword, setNewPasswords] = useState("");
    const handleoOnChangeNewPassword = (e) => {
        setNewPasswords(e.target.value)
    }
    const [conFirmNewPassword, setConfirmNewPassword] = useState("");
    const handleoOnChangeConFirmNewPassword = (e) => {
        setConfirmNewPassword(e.target.value)
    }
    const handleSubmit = async () => {
        if (newPassword !== conFirmNewPassword) {
            setError("Mật khẩu xác nhận chưa khớp. Vui lòng thử lại.")
        }
        else {
            try {
                const res = await axiosAuth.post(`/api/Authentication/ChangePassword?currentPassword=${oldPassword}&newPassword=${newPassword}`)
                toast.success("Đổi mật khẩu thành công", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setError("")
            }
            catch (error) {
                if (error.response.data.statusCode === 404) {
                    setError("Mật khẩu cũ không chính xác. Vui lòng thử lại")
                }
                if (error.response.data.statusCode === 400) {
                    setError("Mật khẩu phải có ít nhất 6 ký tự, một ký tự đặc biệt, một chữ số ('0'-'9'), một chữ cái viết hoa, một chữ cái viết thường")
                }
            }
        }
    }
    return (
        <div>
            <Toast />
            <div className="mx-auto max-w-[960px] mt-24">
                <h1 className="mt-20 font-bold text-[20px]">Chỉnh sửa thông tin cá nhân</h1>
                <div className="grid md:grid-cols-[225px_auto] md:gap-3 mt-4">
                    <div className=" p-4 bg-white rounded">
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link className="text-sm text-gray-400 " href="/settings/profile">Thông tin cá nhân</Link>
                            </li>
                            <li>
                                <Link className="text-sm font-bold " href="/settings/account">Cài đặt tài khoản</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white md:py-8 p-4 rounded">
                        <div className="mb-4 md:mb-8">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Thay đổi mật khẩu</h2>
                            {
                                !!error
                                &&
                                <div className="flex items-center space-x-4 mb-4 bg-red-300 p-4">
                                    <CgDanger className="w-[20px] h-[20px] text-red-500" />
                                    <p className="">{error}</p>
                                </div>
                            }
                            <div>
                                <Input onChange={handleoOnChangeOldPassword} label="password" type="password" text="Mật khẩu hiện tại:" classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" />
                            </div>
                            <div className="mt-4">
                                <Input onChange={handleoOnChangeNewPassword} label="password" type="password" text="Mật khẩu mới:" classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" />
                            </div>
                            <div className="mt-4">
                                <Input onChange={handleoOnChangeConFirmNewPassword} label="password" type="password" text="Xác nhận mật khẩu mới:" classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" />
                            </div>
                            <div className="mt-6">
                                <button onClick={handleSubmit} className={`border border-solid rounded font-bold text-white text-sm py-2 px-4 bg-[#f80]  `}>
                                    ĐỔI MẬT KHẨU
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}