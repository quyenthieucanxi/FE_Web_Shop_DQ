"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Input from "@/components/Input";
import { FaCaretDown } from "react-icons/fa";
import { FormEvent, useEffect, useState } from "react";
import ModalAddress from "@/components/ModalAddress";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { toast } from "react-toastify";
import Toast from "@/components/Toast";
import { useRouter } from "next/navigation";




export default function ProfilePage() {
    const { data: session, } = useSession();
    useEffect(() => {
        if (session && session.user) {
            setFullName(session.user.name);
            setSelectedAddress(session.user.address);
            setPhone(session.user.phone);
            setIntroduce(session.user.introduce);
        }
    }, [session]);
    const axiosAuth = useAxiosAuth();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [selectedAddress, setSelectedAddress] = useState(session?.user?.address ?? "");
    const onSubmitAddress = (address: string) => {
        setSelectedAddress(address);
        closeModal();
    }
    const [fullName, setFullName] = useState(session?.user?.name ?? "")
    const handleOnChangeFullName = (e) => {
        setFullName(e.target.value)
    }
    const [phone, setPhone] = useState(session?.user?.phone ?? "")
    const handleOnChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const [introduce, setIntroduce] = useState(session?.user?.introduce ?? "")
    const handleOnChangeIntroduce = (e) => {
        setIntroduce(e.target.value)
    }
    const [isFormChanged, setIsFormChanged] = useState(false);
    useEffect(() => {
        const isChanged =
            fullName !== session?.user?.name ||
            phone !== session?.user?.phone ||
            selectedAddress !== session?.user?.address ||
            introduce !== session?.user?.introduce;
        setIsFormChanged(isChanged);
    }, [fullName, phone, introduce, session,selectedAddress]);

    const handleSubmit = async () => {
        const body = {
            email: session?.user.email,
            fullName: fullName,
            phoneNumber: phone,
            address: selectedAddress,
            introduce: introduce,
        }
        try {
            const res = await axiosAuth.put(`/api/User/UpdateInfo`, body)
            if (res.data.code === 200) {
                toast.success("Cập nhập thông tin thành công", {
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
        catch (error) {
            console.error("Error APi", error)
        }
    }
    return (
        <div>
            <Toast />
            <div className="mx-auto max-w-[960px] mt-24">
                <h1 className="mt-20 font-bold text-[20px]">Chỉnh sửa thông tin cá nhân</h1>
                <div id="modal_address">
                    <ModalAddress isModalOpen={isModalOpen} isCloseModal={closeModal} onSubmitAddress={onSubmitAddress} title="Địa chỉ" />
                </div>
                <div className="grid md:grid-cols-[225px_auto] md:gap-3 mt-4">
                    <div className=" p-4 bg-white rounded">
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link className="text-sm font-bold" href="/settings/profile">Thông tin cá nhân</Link>
                            </li>
                            <li>
                                <Link className="text-sm text-gray-400" href="/settings/account">Cài đặt tài khoản</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white md:py-8 p-4 rounded">
                        <div className="mb-4 md:mb-8">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Hồ sơ cá nhân</h2>
                            <div  >
                                <div className="flex flex-col md:flex-row md:gap-3">
                                    <Input label="fullname" type="text" text="Họ và tên" value={fullName}
                                        onChange={handleOnChangeFullName}
                                        classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" />
                                    <Input label="phone" type="text" text="Số điện thoại" value={phone}
                                        onChange={handleOnChangePhone}
                                        classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" />
                                </div>
                                <div onClick={openModal} className="border-[#cacaca] w-full h-12  rounded border border-solid mt-6 relative cursor-pointer ">
                                    <label className={` absolute top-[12px] left-[12px] cursor-text text-[#8c8c8c] text-sm capitalize after:content-['*'] after:ml-2 after:text-[#e5193b] ${selectedAddress ? "scale(.7143) translate-y-[-10px]" : ""} `} htmlFor="Địa chỉ">Địa chỉ</label>
                                    <select name="address" className="w-full h-full text-[#222] text-sm appearance-none pointer-events-none px-3 pt-4" >
                                        <option value={selectedAddress}>{selectedAddress}</option>
                                    </select>
                                    <FaCaretDown className="absolute right-[12px] text-[#8c8c8c] h-12 top-[-1px] pointer-events-none" />
                                </div>
                                <div className="mt-4">
                                    <Input label="introduce" type="text" text="Giới thiệu bản thân" textarea={true} value={introduce}
                                        onChange={handleOnChangeIntroduce}
                                        className="h-[110px]" classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" />
                                </div>
                                <div className="mt-4">
                                    <button disabled={!isFormChanged} onClick={handleSubmit} className={`border border-solid rounded font-bold text-white text-sm py-2 px-4 ${!isFormChanged ? "bg-gray-400" : "bg-[#f80]"}  `}>
                                        LƯU THAY ĐỔI
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
