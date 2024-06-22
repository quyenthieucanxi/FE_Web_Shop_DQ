"use client";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { GetPostById } from "@/services/PostService";
import { Order } from "@/types/order";
import { FormatCurrencyVND } from "@/utils/StringHelper";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { CiLocationOn } from "react-icons/ci";
import { MdEventNote } from "react-icons/md";


export default function OrderDetailPage({ params }: { params: { slug: string[] } }) {
    const { data: session } = useSession()
    const axiosAuth = useAxiosAuth()
    const fetchDataOrder = async () => {
        const res = await axiosAuth.get(`/api/Order/GetById?OrderId=${params.slug[0]}`)
        return res.data as Response
    }
    const { data: dataOrder } = useQuery({
        queryKey: ['OrderInfo'],
        queryFn: fetchDataOrder,
        placeholderData: keepPreviousData,
        enabled: !!session?.user.accessToken,
    })
    const order = dataOrder?.data as Order

    return (
        <div className="max-w-[636px] mt-20 mx-auto">
            <div className="bg-white p-4">
                <h4 className="font-bold text-lg ">Thông tin đơn hàng</h4>
                <div className="flex justify-between border-t py-4 mt-4">
                    <span className="text-base font-semibold flex items-center gap-1 "> <CiLocationOn className="font-bold" />Địa chỉ Người nhận</span>
                </div>
                <div className="flex text-sm font-normal">
                    {order?.recipientName} &nbsp;<p>| &nbsp;{order?.phone}</p>
                </div>
                <div className="text-[#777] text-sm font-normal mt-2">
                    {order?.addressShipping}
                </div>
            </div>
            <div className="bg-white mt-4 p-4">
                <div className="flex gap-3 items-center">
                    <div className="flex items-center rounded-[50%] h-6 w-6 border-1 border-slate-600">
                        <img className="w-full rounded-[50%]"
                            src={`${order?.products[0]?.user?.avatarUrl}`} alt="img" />
                    </div>
                    <div className="flex justify-between w-full">
                        <div className="text-sm font-bold">{order?.products[0]?.user?.fullName}</div>
                        <img className="w-[24px] h-[24px]" src="https://static.chotot.com/storage/chotot-icons/png/house.png" alt="" height="20px" />
                    </div>
                </div>
                <div className="flex mt-2 gap-2">
                    <div>
                        <img className="h-[64px] w-[64px] object-cover rounded-sm" src={order?.products[0]?.urlImage} alt="img" />
                    </div>
                    <div className="flex-col">
                        <p className="text-sm font-normal mb-1">{order?.products[0]?.title}</p>
                        <p className="text-[#d0021b] font-semibold text-sm ">{FormatCurrencyVND(order?.totalPrice.toString())}</p>
                        <p className="text-sm font-normal mt-1">Số lượng: {order?.quantity}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white mt-4 p-4">
                <div className="flex gap-2 mb-3">
                    <img src="https://static.chotot.com/storage/escrow/icons/delivery_dining_v2.svg" alt="" />
                    <span className="text-base font-bold">Phương thức Giao hàng</span>
                </div>
                <div className="flex justify-between items-center py-4 gap-2">
                    <div className="flex-1 text-sm">Giao Hàng Nhanh</div>
                </div>
            </div>
            <div className="bg-white mt-4 p-4">
                <div className="flex gap-2 mb-3">
                    <img src="https://static.chotot.com/storage/escrow/icons/payment_method_v2.svg" alt="" />
                    <span className="text-base font-bold">Phương thức Thanh Toán</span>
                </div>
                <div className="py-4">
                    <div className="flex justify-between items-center gap-2 mb-3">
                        <div className="flex-1 text-sm">{order?.payment}</div>
                    </div>
                </div>
            </div>
            <div className="bg-white mt-4 p-4">
                <div className="text-base font-bold mb-3">Thông tin Thanh toán</div>
                <div className="mb-3 flex justify-between">
                    <p>Số tiền</p>
                    <p>{FormatCurrencyVND(order?.products[0].price).toString()}</p>
                </div>
                <div className="mb-3 flex justify-between">
                    <p>Phí giao hàng</p>
                    <p>{FormatCurrencyVND((order?.totalPrice - order?.products[0]?.price).toString())}</p>
                </div>
                <div className="h-[1px] w-full border border-dashed border-[#222222] my-3">
                </div>
                <div className="mb-6 flex justify-between">
                    <p>Tổng thanh toán</p>
                    <p>{FormatCurrencyVND(order?.totalPrice.toString())}</p>
                </div>
                <div className="flex items-center gap-2 my-3 text-base font-semibold">
                    <MdEventNote />
                    Ghi chú
                </div>
                <div className="text-sm font-medium">
                    {order?.note}
                </div>
            </div>
            <div className="bg-white mt-4 p-4 flex items-center justify-between ">
                <div className=" w-full">
                    <p className="text-[10px] text-[#9b9b9b] font-bold">TỔNG CỘNG:<br /><b className="text-[18px] font-bold text-black">{FormatCurrencyVND(order?.totalPrice.toString())}</b></p>
                </div>
            </div>
        </div>
    )
}
