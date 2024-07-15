import Link from 'next/link'
import { ConvertToDDMMYYYY } from "@/utils/DateHelper";
import { FormatCurrencyVND, makeSlug } from "@/utils/StringHelper";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { toast } from "react-toastify";
import { CalculateTimePassedAsync } from "@/utils/DateHelper";
import { signIn, useSession } from 'next-auth/react';
interface Props {
    product: Product,
    typeDisplay: string,
}

export default function Product(Props: Props) {
    const time= CalculateTimePassedAsync(Props.product?.createdTime)
    const {data: session} = useSession()
    const typeDisplay = Props.typeDisplay;
    const axiosAuth = useAxiosAuth()
    const hanldeLikeClick = async () => {
        if (session)
        {
            try {
                const res = await axiosAuth.post(`/api/User/AddLikePost?postId=${Props.product?.id}`)
                toast.success("Lưu tin thành công", {
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
                toast.error(error?.response?.data?.message, {
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
        else {
            signIn()
        }
        
    }
    return (
        <>
            {
                typeDisplay === "row" ?
                    <div className="flex flex-col hover:cursor-pointer border border-solid  p-3 hover:shadow-md rounded-lg">
                        <div className="relative h-[250px]">
                            <Link className="mb-2" href={`/${Props.product?.categoryPath}/${Props.product?.postPath}`}>
                                <img className="rounded-sm h-[202px] object-cover" src={Props.product?.urlImage} alt="img" loading="lazy" />            
                                <div className="max-h-[40px] font-normal text-sm mt-2 line-clamp-2">
                                    <h3 className=" overflow-hidden overflow-ellipsis h-[40px] max-h-[40px] whitespace-normal inline ">{Props.product?.title}</h3>       
                                </div>
                            </Link>
                            <button className="absolute right-2 bottom-14" onClick={hanldeLikeClick}>
                                <img width="20" src="https://static.chotot.com/storage/chotot-icons/next/save-ad.svg" alt="like" />
                            </button>
                        </div>
                        <span className="font-bold text-[15px] text-red-500 mt-1">{FormatCurrencyVND(Props.product?.price)}</span>
                        <div className="mt-2 flex items-center text-gray-500">
                            <a href="">
                                <img src="https://static.chotot.com/storage/chotot-icons/next/shop.svg" alt="icon" />
                            </a>
                            <div className="relative after:inline-block after:content-['.'] after:bottom-1/4 after:-translate-y-1/4 after:ml-1">
                            </div>
                            <span className="text-[10px] mx-[3px] whitespace-nowrap">{time}</span>
                            <div className="relative after:inline-block after:content-['.'] after:bottom-1/4 after:-translate-y-1/4 after:mr-1">
                            </div>
                            <span className="text-[10px] truncate ">{Props.product?.address}</span>
                        </div>

                    </div> :
                    <div className='mx-auto max-w-[960px] bg-white border rounded-md p-3 flex gap-3 mb-2'>
                        <div className=" h-20 w-32 min-w-[80px] rounded md:h-36 md:w-[250px] md:min-w-[250px]">
                            <img src={Props.product?.urlImage} alt="img" className="h-full w-full rounded object-cover" />
                        </div>
                        <div className="ml-12 overflow-hidden">
                            <div className="overflow-hidden text-ellipsis whitespace-nowrap md:font-bold ">{Props.product?.title}</div>
                            <div>
                                <span className="font-bold text-red-500 md:text-base undefined">{FormatCurrencyVND(Props.product?.price)}</span> </div>
                            <div className="hidden md:block">
                                <span className="text-xs text-gray-400">{Props.product?.address}</span>
                            </div>
                            <div>
                                <span className="text-xs leading-5 text-gray-500">Ngày đăng tin: <span className="text-gray-900">{ConvertToDDMMYYYY(Props.product?.createdTime)}</span>
                                </span>
                            </div>
                        </div>

                    </div>
            }
        </>
    )
}