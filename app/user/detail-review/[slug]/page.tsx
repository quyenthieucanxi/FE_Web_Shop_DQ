"use client";
import ProductDetailReview from "@/components/ProductDetailReview";
import axios from "@/libs/axios"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import Link from "next/link";



export default function DetailReviewPage({ params }: { params: { slug: string } }) {
    const fetchUser = async () => {
        const { data: response }: { data: Response } = await axios.get(`/api/User/GetProfile?url=${params.slug}`)
        const user: User = response.data as User
        return user
    }
    const { data }: { data: User } = useQuery({
        queryKey: ["userInfo"],
        queryFn: fetchUser,
        placeholderData: keepPreviousData,
    }
    )
    const fetchReview = async () => {
        const { data: response }: { data: Response } = await axios.get(`api/OrderReview/CountOrderReview/${params.slug}`)
        return response.data
    }
    const { data: countReviews }: { data: Review } = useQuery({
        queryKey: ["countReviews", params.slug],
        queryFn: fetchReview,
        placeholderData: keepPreviousData,
    }
    )
    const fetchReviews = async () => {
        const { data: res }: { data: Response } =
            await axios.get(`/api/OrderReview/GetOrderReviewsByUser/${params.slug}`);
        return res.data
    }
    const { data: reviews }: { data: Array<ProductReview> } = useQuery({
        queryKey: ["fetchReviewsByUser", params.slug],
        queryFn: fetchReviews,
        placeholderData: keepPreviousData,
    })
    return (
        <div>
            <div className="mx-auto max-w-[960px] bg-white mt-20 py-3 px-6">
                <div className="flex gap-3 items-center">
                    <div className="flex items-center rounded-[50%] h-12 w-12 border-1 border-slate-600">
                        <img className="w-full h-full rounded-[50%]"
                            src={data?.avatarUrl} alt={data?.fullName} />
                    </div>
                    <div className="flex-col w-full">
                        <div className="text-sm font-bold">{data?.fullName}</div>
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
                            <Link className=" text-blue-400" href={`/user/detail-review/${params.slug}`}>{`(${countReviews?.totalReview} đánh giá)`}</Link>
                        </div>
                    </div>
                    <div className="flex">
                        <img className="w-[24px] h-[24px]" src="https://static.chotot.com/storage/chotot-icons/png/house.png" alt="" height="20px" />
                    </div>
                </div>
            </div>
            <div className='mx-auto max-w-[960px] bg-white border-t mb-5 mt-5 h-screen max-h-[900px] overflow-y-auto'>
                <h3 className="p-3">Tất cả {`(${reviews?.length})`} </h3>
                {
                    reviews?.map((review, index) => {
                        return (
                            <ProductDetailReview key={index} review={review} />
                        )
                    })
                }
            </div>
        </div>
    )
}