"use client";
import { FcLike } from "react-icons/fc";
import Loading from "@/components/Loading";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CalculateTimePassedAsync, ConvertToDDMMYYYY } from "@/utils/DateHelper";
import { FormatCurrencyVND, makeSlug } from "@/utils/StringHelper";
import Link from "next/link";
import { toast } from "react-toastify";
import Toast from "@/components/Toast";

export default function MyLikePostPage() {
    const axiosAuth = useAxiosAuth();
    const queryClient = useQueryClient();
    const fetchData = async () => {
        const res = await axiosAuth.get(`/api/User/GetSavesPost`)
        return res.data
    }
    const { data, status } = useQuery({
        queryKey: ['SavePosts'],
        queryFn: fetchData,
    })

    const handleRemoveLike = async (postId: string) => {
        try {
            const res = await axiosAuth.delete(`/api/User/RemoveSavesPost?postId=${postId}`)
            queryClient.invalidateQueries({ queryKey: ['SavePosts']});
            toast.success("Tin đã xoá khỏi danh sách yêu thích", {
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
        catch (error) {

        }
    }
    return (
        <div className="mx-auto bg-white max-w-[960px] mt-16 p-4 h-screen">
            <Toast />
            <h1 className="text-lg font-bold">
                Tin đăng đã lưu ({data?.data?.totalPost})
            </h1>
            {
                status === "pending" ?
                    <Loading /> :
                    <div className="mt-2">
                        {
                            data?.data?.postList?.map((product, i) => (
                                <div key={i} >
                                    <Link href={`/${makeSlug(product.categoryName)}/${product.postPath}`} className='mx-auto max-w-[960px] bg-white border rounded-md p-3 flex gap-3 mb-2 hover:shadow-lg'>
                                        <div className=" h-[100px] w-[100px] min-w-[100px] rounded ">
                                            <img src={product.urlImage} alt={product.title} className="h-full w-full rounded object-cover" />
                                        </div>
                                        <div className="relative overflow-hidden w-full">
                                            <div className="overflow-hidden text-ellipsis whitespace-nowrap font-bold ">{product.title}</div>
                                            <div>
                                                <span className="font-bold text-red-500 text-[15px] undefined">{FormatCurrencyVND(product.price)}</span>
                                            </div>
                                            <div className=" absolute bottom-0 left-0">
                                                <div className="mt-2 flex items-center text-gray-500">
                                                        <img className="h-4 w-4 object-cover rounded-[50%]" src={product.user?.avatarUrl} alt="img" />
                                                    <span className="text-[12px] ml-[4px] ">{product.user?.fullName}</span>
                                                    <div className="relative after:inline-block after:content-['.'] after:bottom-1/4 after:-translate-y-1/4 after:ml-1">
                                                    </div>
                                                    <span className="text-[12px] mx-[3px] whitespace-nowrap">{CalculateTimePassedAsync(product.createdTime)}</span>
                                                    <div className="relative after:inline-block after:content-['.'] after:bottom-1/4 after:-translate-y-1/4 after:mr-1">
                                                    </div>
                                                    <span className="text-[12px] truncate ">{product.address}</span>
                                                </div>
                                            </div>
                                            <button className=" absolute bottom-0 right-0" onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation(); 
                                                handleRemoveLike(product.id);
                                            }}  >
                                                <FcLike />
                                            </button>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }

                    </div>
            }

        </div>
    )
}