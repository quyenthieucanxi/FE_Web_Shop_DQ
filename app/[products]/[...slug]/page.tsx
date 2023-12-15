"use client";
import { FiPhoneCall } from "react-icons/fi";
import { IoIosHeartEmpty } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi2";

import dynamic from "next/dynamic";
import Button from "@/components/Button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetPostById, GetPostByPath } from "@/services/PostService";
import Loading from "@/components/Loading";
import { FormatCurrencyVND } from "@/utils/StringHelper";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { toast } from "react-toastify";
import Toast from "@/components/Toast";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Slider = dynamic(() => import("@/components/Slider"), { ssr: false });




export default function ProductDetailPage({ params }: { params: { slug: string[] } }) {
    const axiosAuth = useAxiosAuth();
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(false);
    const { data: session } = useSession()
    useEffect(() => {
        const checkLikePost = async () => {
            try {
                const res = await axiosAuth.get(`/api/User/CheckSavesPost?pathPost=${params.slug[0]}`)
                if (res.data.data === true)
                    setIsLiked(true);
            }
            catch (error) {

            }
        }
        checkLikePost()
    }, [session?.user.accessToken])
    const fetchData = async () => {
        const res = await GetPostByPath(params.slug[0]);
        return res.data
    }
    const { data, isSuccess } = useQuery({
        queryKey: ["path", params.slug[0]],
        queryFn: fetchData,
    })
    const [quantity, setQuantity] = useState(1);
    const handleMinusQuantity = () => {
        setQuantity(pre => pre - 1)
    }
    const handlePlusQuantity = () => {
        setQuantity(pre => pre + 1)
    }
    const handleLikePost = async (postId: string) => {
        try {
            if (isLiked) {
                const res = await axiosAuth.delete(`/api/User/RemoveSavesPost?postId=${postId}`)
                toast.success("Đã huỷ lưu tin này", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setIsLiked(false)
            }
            else {
                const res = await axiosAuth.post(`/api/User/AddLikePost?postId=${postId}`)
                toast.success("Tin đã được lưu", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setIsLiked(true)
            }


        }
        catch (error) {

        }
    }
    return (
        <>
            <Toast />
            {
                isSuccess ? <>
                    <section>
                        <div className="mx-auto p-4 bg-white rounded-md max-w-[960px] mt-20">
                            <Slider />
                        </div>
                    </section>
                    <section>
                        <div className="flex mx-auto max-w-[960px] bg-white pt-12 mb-6">
                            <div className="w-[66.66666667%] px-[18px]">
                                <img className="w-full  object-cover" src={data?.urlImage} alt="" />
                                <div>
                                    <h1 className="font-bold text-base  mt-[20px] mb-[10px]">{data?.title}</h1>
                                    <div className="flex justify-between">
                                        <span className="text-red-600 font-bold text-sx">
                                            {FormatCurrencyVND(data?.price)}
                                        </span>
                                        <button className="flex items-center text-[15px] text-red-500 rounded-[20px] border border-solid border-red-500 py-[5px] px-[10px] gap-1"
                                            onClick={() => handleLikePost(data?.id)}
                                        >
                                            {
                                                isLiked ? (
                                                    <>
                                                        Đã lưu <FcLike />
                                                    </>
                                                ) : (
                                                    <>
                                                        Lưu tin <IoIosHeartEmpty />
                                                    </>
                                                )
                                            }
                                        </button>
                                    </div>

                                </div>
                                <div className="mt-3">
                                    Số lượng còn: {data?.quantity}
                                </div>
                                <div className="mt-3">
                                    {data?.description}
                                </div>
                            </div>
                            <div className="w-[33.3333333%] pr-[15px] border-t p-2">
                                <div className="flex gap-3 items-center">
                                    <div className="flex items-center rounded-[50%] h-12 w-12 border-1 border-slate-600">
                                        <img className="w-full rounded-[50%]"
                                            src={data?.user?.avatarUrl} alt="Profile" />
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div className="text-sm font-bold">{data?.user?.fullName}</div>

                                        <img className="w-[24px] h-[24px]" src="https://static.chotot.com/storage/chotot-icons/png/house.png" alt="" height="20px" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center border-1 bg-green-600 rounded-md p-3 mt-3 space-x-2">
                                    <FiPhoneCall className="fill-green text-white" />
                                    <span className="text-sm font-bold text-white">{data?.user?.phoneNumber}</span>
                                </div>
                                <div className="flex items-center mt-3">
                                    <span className="w-[110px]">Số lượng</span>
                                    <button disabled={quantity === 1} onClick={handleMinusQuantity} className="w-[32px] h-[32px] border border-solid rounded-sm pt-[1px] px-[6px]"><HiMinus />
                                    </button>
                                    <input type="text" value={quantity} readOnly className="w-[50px] h-[32px] text-base font-normal text-center cursor-text border-l-0 border-r-0 border border-solid " />
                                    <button disabled={quantity === data?.quantity} onClick={handlePlusQuantity} className="w-[32px] h-[32px] border border-solid rounded-sm pt-[1px] px-[6px]"><GoPlus /></button>
                                </div>
                                {
                                    data?.user?.role === 'Admin' 
                                    && <div className="mt-3">
                                        <Button onClick={() => {
                                            router.push(`/order/checkout?itemKeys=${data?.id}&quantity=${quantity}`);
                                            router.refresh();
                                        }} type="secondary" childern={"MUA NGAY"} className="text-sm font-bold text-white border-1 border-green-600" />
                                    </div>
                                }
                                <div className=" mt-6">
                                    <img width="100px" height="100px" className="mr-[15px] float-left" src="https://static.chotot.com/storage/images/tips/1_mobile.png" alt="" />
                                    <div>
                                        <p className="text-[13px]">Giao dịch, đừng giao ‘dịch’. Mua bán trong thời điểm này, bạn nhớ làm theo khuyến cáo 5k của Bộ Y Tế: “Khẩu trang – Khử khuẩn – Khoảng cách – Không tập trung
                                            – Khai báo y tế” để đảm bảo an toàn cho bản thân, gia đình và cộng động nhé! ❤️</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </> : <Loading />
            }

        </>
    )
}