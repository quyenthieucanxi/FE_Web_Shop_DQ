import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Star from './Star'
import { ConvertToDDMMYYYY } from '@/utils/DateHelper'


interface Props {
    review: ProductReview
}


export default function ProductReview({ review }: Props) {

    return (
        <>
            <div className="flex p-3 my-4 border-b-2 border-gray-200" >
                <Link href={`/user/${review?.user?.url}}`}>
                    <img className='rounded-[50%] w-[40px] h-[40px]' src={review?.user?.avatarUrl} alt="img" />
                </Link>
                <div className='ml-4'>
                    <Link href={``}>{review?.user?.fullName}</Link>
                    <div className='flex'>
                        {
                            [...Array(5)].map((_, index) => {
                                const starValue = index + 1;
                                return (
                                    <Star key={index} starValue={starValue} rating={review?.rating} height={4} weight={4} />
                                );
                            })
                        }
                    </div>
                    <span className=' font-light text-sm  text-gray-400'>
                        {ConvertToDDMMYYYY(review?.createdTime)}
                    </span>
                    <p>
                        {review?.reviewText}
                    </p>
                </div>
            </div>
        </>
    )
}