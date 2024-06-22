import Link from "next/link";
import Star from "./Star";
import { CalculateTimePassedAsync } from "@/utils/DateHelper";
import { FormatCurrencyVND } from "@/utils/StringHelper";


interface Props {
    review: ProductReview
}

export default function ProductDetailReview({ review }: Props) {
    return (
        <>
            <div className="flex p-3 my-4 border-b-2 border-gray-200" >
                <Link href={`/user/${review?.user?.url}}`}>
                    <img className='rounded-[50%] w-[40px] h-[40px]' src={review?.user?.avatarUrl} alt="img" />
                </Link>
                <div className='ml-4'>
                    <Link href={``}>{review?.user?.fullName}</Link>
                    <div className='flex items-center'>
                        {
                            [...Array(5)].map((_, index) => {
                                const starValue = index + 1;
                                return (
                                    <Star key={index} starValue={starValue} rating={review?.rating} height={4} weight={4} />
                                );
                            })
                        }
                        <span className="mx-3">|</span>
                        <span className=' font-light text-sm  text-gray-400'>
                            {CalculateTimePassedAsync(review?.createdTime)}
                        </span>
                    </div>
                    <div className="flex border p-4 my-3 w-[100%]">
                        <div className="w-[56px] h-[56px] mr-3">
                            <img src={review?.products[0]?.urlImage} alt="" className="h-full w-full rounded object-cover" />
                        </div>
                        <div className="flex-col">
                            <p>{review?.products[0]?.title}</p>
                            <span className="font-bold text-red-500 md:text-base ">Giá: {FormatCurrencyVND(review?.products[0]?.price)}</span>
                        </div>
                    </div>
                    <p>
                        {review?.reviewText}
                    </p>

                </div>
            </div>
        </>
    )
}