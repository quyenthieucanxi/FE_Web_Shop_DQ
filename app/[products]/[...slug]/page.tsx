
"use client";

import { FiPhoneCall } from "react-icons/fi";
import { IoIosHeartEmpty } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi2";

import dynamic from "next/dynamic";
import Button from "@/components/Button";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetPostById, GetPostByPath } from "@/services/PostService";
import Loading from "@/components/Loading";
import { FormatCurrencyVND } from "@/utils/StringHelper";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { toast } from "react-toastify";
import Toast from "@/components/Toast";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductReview from "@/components/ProductReview";
import axios from "@/libs/axios";
import Star from "@/components/Star";
const Slider = dynamic(() => import("@/components/Slider"), { ssr: true });




export default function ProductDetailPage({ params }: { params: { slug: string[] } }) {
    const axiosAuth = useAxiosAuth();
    const router = useRouter();
    const { data: session } = useSession()
    const queryClient = useQueryClient();

    const fetchData = async () => {
        const res = await GetPostByPath(params.slug[0]);
        return res.data
    }
    const { data: dataProduct, isSuccess } = useQuery({
        queryKey: ["path", params.slug[0]],
        queryFn: fetchData,
        placeholderData: keepPreviousData,
    })
    const CheckLikePost = async () => {
        try {
            const res = await axiosAuth.get(`/api/User/CheckSavesPost?pathPost=${params.slug[0]}`)
            return res.data.data
        }
        catch (error) {

        }
    }
    const { data: checkLikePost } = useQuery({
        queryKey: ["checkLikePost", params.slug[0]],
        queryFn: CheckLikePost,
        placeholderData: keepPreviousData,
        enabled: !!session?.user.accessToken,
    })
    const [isLiked, setIsLiked] = useState(checkLikePost);

    const [quantity, setQuantity] = useState(1);
    const handleMinusQuantity = () => {
        setQuantity(pre => pre - 1)
    }
    const handlePlusQuantity = () => {
        setQuantity(pre => pre + 1)
    }
    const [filterRating, setFilterRating] = useState(0);
    const fetchReviews = async () => {
        const { data: res }: { data: Response } =
            await axios.get(`/api/OrderReview/GetOrderReviewsByProduct/${params.slug[0]}${filterRating !== 0 ? `?rating=${filterRating}` : ""} `);
        return res.data
    }
    const { data: reviews }: { data: Array<ProductReview> } = useQuery({
        queryKey: ["fetchReviews", params.slug[0], filterRating],
        queryFn: fetchReviews,
        placeholderData: keepPreviousData,
    })


    const handleFilterRating = (newRating: number) => {
        setFilterRating(newRating);
        queryClient.invalidateQueries({ queryKey: ["fetchReviews", params.slug[0], filterRating] });
    };

    const fetchAverageRating = async () => {
        const { data: res }: { data: Response } =
            await axios.get(`/api/OrderReview/CountProductReview/${params.slug[0]} `);
        return res.data
    }
    const { data: averageRating }: { data: Review } = useQuery({
        queryKey: ["fetchAverageRating", params.slug[0]],
        queryFn: fetchAverageRating,
        placeholderData: keepPreviousData,
    })



    const handleLikePost = async (postId: string) => {
        if (session)
        {
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
        else {
            signIn()
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
                                <img className="w-full  object-cover" src={dataProduct?.urlImage} alt="" />
                                <div>
                                    <h1 className="font-bold text-base  mt-[20px] mb-[10px]">{dataProduct?.title}</h1>
                                    <div className="flex justify-between">
                                        <span className="text-red-600 font-bold text-sx">
                                            {FormatCurrencyVND(dataProduct?.price)}
                                        </span>
                                        <button className="flex items-center text-[15px] text-red-500 rounded-[20px] border border-solid border-red-500 py-[5px] px-[10px] gap-1"
                                            onClick={() => handleLikePost(dataProduct?.id)}
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
                                    Số lượng còn: {dataProduct?.quantity}
                                </div>
                                <div className="mt-3">
                                    {dataProduct?.description}
                                </div>
                            </div>
                            <div className="w-[33.3333333%] pr-[15px] border-t p-2">
                                <div className="flex gap-3 items-center">
                                    <Link href={`/user/${dataProduct?.user?.url}`} className="flex items-center rounded-[50%] h-12 w-12 border-1 border-slate-600">
                                        <img className="w-full rounded-[50%]"
                                            src={dataProduct?.user?.avatarUrl} alt="Profile" />
                                    </Link>
                                    <div className="flex justify-between w-full">
                                        <Link href={`/user/${dataProduct?.user?.url}`} className="text-sm font-bold">{dataProduct?.user?.fullName}</Link>

                                        <img className="w-[24px] h-[24px]" src="https://static.chotot.com/storage/chotot-icons/png/house.png" alt="" height="20px" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center border-1 bg-green-600 rounded-md p-3 mt-3 space-x-2">
                                    <FiPhoneCall className="fill-green text-white" />
                                    <span className="text-sm font-bold text-white">{dataProduct?.user?.phoneNumber}</span>
                                </div>
                                {
                                    dataProduct?.user?.role === 'Seller'
                                    &&
                                    <>
                                        <div className="flex items-center mt-3">
                                            <span className="w-[110px]">Số lượng</span>
                                            <button disabled={quantity === 1} onClick={handleMinusQuantity} className="w-[32px] h-[32px] border border-solid rounded-sm pt-[1px] px-[6px]"><HiMinus />
                                            </button>
                                            <input type="text" value={quantity} readOnly className="w-[50px] h-[32px] text-base font-normal text-center cursor-text border-l-0 border-r-0 border border-solid " />
                                            <button disabled={quantity === dataProduct?.quantity} onClick={handlePlusQuantity} className="w-[32px] h-[32px] border border-solid rounded-sm pt-[1px] px-[6px]"><GoPlus /></button>
                                        </div>
                                        <div className="mt-3">
                                            <Button onClick={() => {
                                                router.push(`/order/checkout?itemKeys=${dataProduct?.id}&quantity=${quantity}`);
                                                router.refresh();
                                            }} type="secondary" childern={"MUA NGAY"} className="text-sm font-bold text-white border-1 border-green-600" />
                                        </div>
                                    </>
                                }
                                <div className="my-3">
                                    <Button onClick={() => {
                                        router.push(`/chat/${dataProduct?.user?.url}`);
                                    }} type="secondary" childern={"CHAT"} className="text-sm font-bold text-white border-1 border-green-600" />

                                </div>
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
                    <section>
                        <div className="mx-auto p-4 bg-white rounded-md max-w-[960px] mt-4">
                            <h4 className="font-normal mb-6">ĐÁNH GIÁ SẢN PHẨM</h4>
                            <div className="flex justify-start space-x-4 mb-4 border px-4 py-12">
                                <div className="ml-4 mr-12">
                                    <span className=" text-3xl text-yellow-400">{averageRating?.averageRating}</span>
                                    <span className="text-lg text-yellow-400"> trên 5</span>
                                    <div className="flex">
                                        <Star starValue={5} rating={5} height={6} weight={6} />
                                        <Star starValue={5} rating={5} height={6} weight={6} />
                                        <Star starValue={5} rating={5} height={6} weight={6} />
                                        <Star starValue={5} rating={5} height={6} weight={6} />
                                        <Star starValue={5} rating={5} height={6} weight={6} />
                                    </div>

                                </div>
                                <button
                                    className={`border border-gray-300 py-2 px-4 rounded-full ${filterRating === 0 ? 'bg-yellow-400 text-white' : ''}`}
                                    onClick={() => handleFilterRating(0)}
                                >
                                    Tất cả {`(${averageRating?.totalReview})`}
                                </button>
                                {[...Array(5)].map((_, index) => (
                                    <button
                                        key={index}
                                        className={`border border-gray-300 py-2 px-4 rounded-full ${filterRating === index + 1 ? 'bg-yellow-400 text-white' : ''}`}
                                        onClick={() => handleFilterRating(index + 1)}

                                    >
                                        {index + 1} sao {filterRating === index + 1 ? `(${reviews?.length})` : ""}
                                    </button>
                                ))}

                            </div>
                            <div className="">
                                {
                                    reviews?.map((review, index) => {
                                        return (
                                            <ProductReview key={index} review={review} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </section>
                </> : <Loading />
            }
        </>
    )
}
