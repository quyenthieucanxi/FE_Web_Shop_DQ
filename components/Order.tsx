import Link from "next/link";
import { Order } from "@/types/order";
import { ConvertToDDMMYYYY } from "@/utils/DateHelper";
import { FormatCurrencyVND } from "@/utils/StringHelper";
import Button from "./Button";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { toast } from "react-toastify";
import Toast from "./Toast";
import { useRouter } from 'next/navigation';


interface Props {
    order: Order,
    openModal?: (orderID: string) => any;
}

export default function Order(props: Props) {
    const axiosAuth = useAxiosAuth()
    const router = useRouter();
    const handleOpenReview = (e) => {
        e.preventDefault();
        props.openModal(props.order?.id)
    }
    const handleCancelOrder = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosAuth.put(`/api/Order/UpdateStatus?status=Huỷ&orderId=${props?.order?.id}`)
            toast.success("Huỷ đơn thành công", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            router.refresh()
        }
        catch (err) {
            toast.error("Huỷ đơn thất bại", {
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
    const handleReturnOrder = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosAuth.put(`/api/Order/UpdateStatus?status=Yêu cầu trả hàng&orderId=${props?.order?.id}`)
            toast.success("Yêu cầu trả hàng thành công", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            router.refresh()
        }
        catch (err) {
            toast.error(err.response.data.message, {
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
        return (
            <>
                <Toast />
                <div className='mx-auto max-w-[960px] bg-white border rounded-md p-3 gap-3 mb-2'>
                    <div className="flex items-center mb-2">
                        <div className="flex items-center rounded-[50%] h-6 w-6 border-1 border-slate-600">
                            <img className="w-full rounded-[50%]"
                                src={props.order?.products[0]?.user?.avatarUrl} alt="img" />
                        </div>
                        <div className="flex justify-between w-full ml-2">
                            <div className="text-sm font-bold">{props.order?.products[0]?.user?.fullName}</div>
                        </div>
                    </div>
                    <Link href={`/order/${props.order?.id}`} className="flex gap-3 w-full">
                        <div className=" h-20 w-32 min-w-[80px] rounded md:h-36 md:w-[250px] md:min-w-[250px]">
                            <img src={props.order?.products[0]?.urlImage} alt="" className="h-full w-full rounded object-cover" />
                        </div>
                        <div className="ml-12 overflow-hidden flex w-full">
                            <div className='w-[60%]'>
                                <div className="overflow-hidden text-ellipsis whitespace-nowrap md:font-bold ">{props.order?.products[0]?.title}</div>
                                <div>
                                    <span className="font-bold text-red-500 md:text-base ">Giá: {FormatCurrencyVND(props.order?.products[0]?.price)}</span>
                                </div>
                                <div className="hidden md:block">
                                    <span className="text-xs text-gray-400 font-normal">Số lượng: {props.order?.quantity} </span>
                                </div>
                                <div>
                                    <span className="text-xs leading-5 text-gray-500">Ngày đặt hàng: <span className="text-gray-900">{ConvertToDDMMYYYY(props.order?.createdTime)}</span>
                                    </span>
                                </div>
                            </div>
                            <div className='w-[40%]'>
                                <div>Địa chỉ nhận hàng</div>
                                <div className="flex text-sm font-normal">
                                    {props.order?.recipientName} &nbsp;<p>| &nbsp;{props.order?.phone}</p>
                                </div>
                                <div className="text-[#777] text-sm font-normal mt-2">
                                    {props.order?.addressShipping}
                                </div>
                                <div className="font-bold">Thành tiền: {FormatCurrencyVND(props.order?.totalPrice.toString())}</div>
                                {
                                    props.order?.status === "Đã giao" &&
                                    <Button onClick={handleOpenReview} className="mt-4" childern={`Đánh giá`} ></Button>
                                }
                                {
                                    props.order?.status === "Chờ xác nhận" &&
                                    <Button onClick={handleCancelOrder} className="mt-4" childern={`Huỷ`} ></Button>
                                }
                                {
                                    props.order?.status === "Đánh giá" &&
                                    <Button onClick={handleReturnOrder} className="mt-4" childern={`Trả hàng`} ></Button>
                                }
                            </div>
                        </div>
                    </Link>
                </div>
            </>
        )
    }