"use client";
import LabTabs from "@/components/LabTabs";
import axios from "@/libs/axios";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";




export default function UserPage({ params }: { params: { slug: string[] } }) {
    const { data: session } = useSession()
    const axiosAuth = useAxiosAuth()
    const router = useRouter()
    const fetchUser = async () => {
        const { data: response }: { data: Response } = await axios.get(`/api/User/GetProfile?url=${params.slug[0]}`)
        const user: User = response.data as User
        return user
    }
    const { data }: { data: User } = useQuery({
        queryKey: ["userInfo"],
        queryFn: fetchUser,
        placeholderData: keepPreviousData,
    }
    )
    const fetchCountFollower = async () => {
        const { data: response }: { data: Response } = await axios.get(`/api/Friendship/CountFollower/${params.slug[0]}`)
        return response.data
    }
    const { data: countFollower } = useQuery({
        queryKey: ["countFollower", params.slug[0]],
        queryFn: fetchCountFollower,
        placeholderData: keepPreviousData,
    }
    )
    const fetchCountFollowing = async () => {
        const { data: response }: { data: Response } = await axios.get(`/api/Friendship/CountFollowing/${params.slug[0]}`)
        return response.data
    }
    const { data: countFollowing } = useQuery({
        queryKey: ["countFollowing", params.slug[0]],
        queryFn: fetchCountFollowing,
        placeholderData: keepPreviousData,
    }
    )
    const fetchReview = async () => {
        const { data: response }: { data: Response } = await axios.get(`api/OrderReview/CountOrderReview/${params.slug[0]}`)
        return response.data
    }
    const { data: countReviews }: { data: Review } = useQuery({
        queryKey: ["countReviews", params.slug[0]],
        queryFn: fetchReview,
        placeholderData: keepPreviousData,
    }
    )
    const checkFollow = async () => {
        const { data: response }: { data: Response } = await axiosAuth.get(`/api/Friendship/CheckFollow?url=${params.slug[0]}`)
        setIsFollow(response.data)
        return response.data
    }
    const { data: isFollowing } = useQuery({
        queryKey: ["checkFollow", params.slug[0]],
        queryFn: checkFollow,
        enabled: !!session?.user?.accessToken && session?.user?.url !== params.slug[0],
        placeholderData: keepPreviousData,
    }
    )

    const [isFollow, setIsFollow] = useState(isFollowing ?? false)
    const handleFollow = async () => {
        if (!session?.user) {
            signIn();
        }
        try {
            if (!isFollow) {
                await axiosAuth.post(`/api/Friendship/Follow/${params.slug[0]}`)
            }
            else {
                await axiosAuth.delete(`/api/Friendship/UnFollow/${params.slug[0]}`)
            }
            setIsFollow(!isFollow)
        } catch (error) {

        }
    }
    const [avatar, setAvatar] = useState(data?.avatarUrl);
    const handleAvatarChange = async (event) => {
        const selectedFile = event.target.files[0];
        const formData = new FormData();
        formData.append('formFile', selectedFile);
        console.log(formData)
        try {
            const { data: res }: { data: Response } = await axios.post("/api/File/Upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })

            const img: ImageRes = res.data as ImageRes
            await axiosAuth.put(`/api/User/UpdateAvatar`, {
                avatarUrl: img?.url
            })
            setAvatar(img?.url)
        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    };
    return (
        <div className="mx-auto max-w-[960px] bg-white  pt-20">
            <div className="grid  gap-x-3 gap-y-2 mt-2 mx-3 mb-3 ">
                <div className="flex flex-col gap-3">
                    <div className="bg-white px-3 pb-3 md:rounded-lg md:border md:border-gray-75">
                        <div className="-mx-3 ">
                            <div className="flex items-center justify-center relative">
                                <img className="h-[125px] w-full object-cover md:rounded-t-lg" src="https://cdn.chotot.com/uac2/25842631_banner" alt="" />
                                <div className="absolute w-[72px] h-[72px] md:w-[96px] md:h-[96px] left-4 bottom-0 translate-y-2/4 bg-white rounded-full p-[2px]">
                                    <img className="rounded-full" alt="Avatar" src={avatar ?? data?.avatarUrl} />
                                    <div className="absolute bottom-0 right-0">
                                        <label htmlFor="uploadAvatar" className="w-7 h-7 flex items-center justify-center bg-gray-50 rounded-full border-2 border-white cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" fill="currentColor" aria-hidden="true" className="w-4 h-4">
                                                <path d="M12 16.676a3 3 0 100-6 3 3 0 000 6z">
                                                </path>
                                                <path d="M20.25 7.676h-2.766c-.14 0-.315-.091-.45-.235l-1.216-1.919a.727.727 0 00-.065-.086c-.42-.49-.987-.76-1.597-.76H9.844c-.61 0-1.177.27-1.597.76a.729.729 0 00-.065.086L6.967 7.444c-.104.114-.25.235-.404.235v-.375a.75.75 0 00-.75-.75H4.688a.75.75 0 00-.75.75v.375H3.75a2.252 2.252 0 00-2.25 2.25v8.997a2.252 2.252 0 002.25 2.25h16.5a2.252 2.252 0 002.25-2.25v-9a2.252 2.252 0 00-2.25-2.25zM12 18.176a4.5 4.5 0 110-9 4.5 4.5 0 010 9z">
                                                </path>
                                            </svg></label>
                                    </div>
                                </div>
                            </div>
                            <input onChange={handleAvatarChange} id="uploadAvatar" type="file" accept="image/jpeg, image/png" className="hidden"></input>
                            <input id="uploadBanner" type="file" accept="image/jpeg, image/png" className="hidden"></input>
                        </div>
                        <div className="mt-[64px] mb-3">
                            <h1 className="text-[18px] font-bold">{data?.fullName}</h1>
                            <div className="mb-1">
                                <div className="flex items-center">
                                    <b className="mr-1 leading-3">{countReviews?.averageRating}</b>
                                    <div className="flex mt-[-3px] mr-1">
                                        {
                                            countReviews?.averageRating !== undefined && countReviews?.averageRating !== null ? 
                                            (
                                                Number.parseInt(countReviews?.averageRating) !== 0 ?
                                                [...Array(5)].map((_, index) => {
                                                    const ratingFormatNumber = Math.floor(Number.parseInt(countReviews?.averageRating))
                                                    const remainder = Number.parseFloat(countReviews?.averageRating) - Math.floor(Number.parseFloat(countReviews?.averageRating))
                                                    return (
                                                        <>
                                                            {
                                                                remainder > 0 && index >= ratingFormatNumber
                                                                    ?
                                                                    <img key={index} alt="rating-star" width="24px" loading="lazy" src="https://static.chotot.com/storage/marketplace/common/pf_rating_half_active_icon.svg" className="w-[16px] mr-[1px]" />
                                                                    :
                                                                    <img key={index} alt="rating-star" width="24px" loading="lazy" src="https://static.chotot.com/storage/marketplace/common/pf_rating_active_icon.svg" className="w-[16px] mr-[1px]" />
                                                            }
                                                        </>
                                                    );
                                                }) :
                                                [...Array(5)].map((_, index) => {
                                                    return (
                                                        <>
                                                            <img key={index} alt="rating-star" width="24px" loading="lazy" src="https://static.chotot.com/storage/marketplace/common/pf_rating_active_icon.svg" className="w-[16px] mr-[1px]" />
                                                        </>
                                                    );
                                                })
                                            ) :
                                            <></>      
                                        }
                                       
                                    </div>
                                    <Link className=" text-blue-400" href={`/user/detail-review/${params.slug[0]}`}>{`(${countReviews?.totalReview} đánh giá)`}</Link>
                                </div>
                            </div>
                            <p className="text-[14px]">
                                <Link href="/user/4bb8d376ef02606e8e1da8f66f3fcf67/theo-doi">Người theo dõi: <b>{countFollower?.toString()}</b></Link>
                                <span className="mx-[12px] border-r-[1px]"></span>
                                <Link href="/user/4bb8d376ef02606e8e1da8f66f3fcf67/dang-theo-doi">Đang theo dõi: <b>{countFollowing?.toString()}</b></Link>
                            </p>
                            <div className="mt-3">
                                <div className="flex justify-end gap-2">
                                    {
                                        !!session && session?.user?.email === data?.email ?
                                            <button onClick={() => router.push("/settings/profile")} className="bg-transparent border border-gray-500 text-black rounded py-2 px-4 leading-[1] text-sm font-bold flex justify-center">
                                                Chỉnh sửa trang cá nhân
                                            </button> :
                                            <button onClick={handleFollow} className="bg-transparent border border-gray-500 text-black rounded py-2 px-4 leading-[1] text-sm font-bold flex justify-center">
                                                {isFollow ? "Đang theo dõi" : "+ Theo dõi"}
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white md:rounded-lg md:border-gray-75 md:border pb-2 h-fit min-h-[344px]">
                    <LabTabs tabs={["Đang hiển thị"]} typeDisplay="row" ByUrl={params.slug[0]} />

                </div>
            </div>

        </div>
    )
}