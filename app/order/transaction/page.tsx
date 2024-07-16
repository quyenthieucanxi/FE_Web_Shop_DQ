"use client";
import { useRouter, useSearchParams } from 'next/navigation'
import useAxiosAuth from '@/libs/hooks/useAxiosAuth';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { FcCheckmark } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";

export default function OrderTransactionPage() {
    const axiosAuth = useAxiosAuth()
    const { data: session, update } = useSession();
    const router = useRouter()
    const searchParams = useSearchParams()
    const vnp_Amount = searchParams.get('vnp_Amount')
    const vnp_BankCode = searchParams.get('vnp_BankCode')
    const vnp_BankTranNo = searchParams.get('vnp_BankTranNo')
    const vnp_CardType = searchParams.get('vnp_CardType')
    const vnp_OrderInfo = searchParams.get('vnp_OrderInfo')
    const vnp_PayDate = searchParams.get('vnp_PayDate')
    const vnp_ResponseCode = searchParams.get('vnp_ResponseCode')
    const vnp_TmnCode = searchParams.get('vnp_TmnCode')
    const vnp_TransactionNo = searchParams.get('vnp_TransactionNo')
    const vnp_TransactionStatus = searchParams.get('vnp_TransactionStatus')
    const vnp_TxnRef = searchParams.get('vnp_TxnRef')
    const vnp_SecureHash = searchParams.get('vnp_SecureHash')

    const fetchData = async () => {
        const res = await
            axiosAuth.get(`/api/Order/CallBackPayment?vnp_Amount=${vnp_Amount}
        &vnp_BankCode=${vnp_BankCode}&vnp_BankTranNo=${vnp_BankTranNo}&vnp_CardType=${vnp_CardType}
        &vnp_OrderInfo=${vnp_OrderInfo}
        &vnp_PayDate=${vnp_PayDate}&vnp_ResponseCode=${vnp_ResponseCode}&vnp_TmnCode=${vnp_TmnCode}&vnp_TransactionNo=${vnp_TransactionNo}
        &vnp_TransactionStatus=${vnp_TransactionStatus}&vnp_TxnRef=${vnp_TxnRef}&vnp_SecureHash=${vnp_SecureHash}`)
        return res.data as Response
    }
    const { data: dataTransaction, status } = useQuery({
        queryKey: ['CheckPayment'],
        queryFn: fetchData,
        enabled: !!session?.user.accessToken,
    })
    const paymentRespData = dataTransaction?.data as PaymentResponseData;
    return (
        <div className="max-w-[636px] mt-20 mb-8 mx-auto h-screen">
            <div className="bg-white p-4">
                <div className="mb-6">
                    <div className='flex justify-center space-x-8 items-center'>
                        <h5 className=" text-lg text-black text-center">
                            {status === "success" ? (paymentRespData.rspCode == "00" ? "Thanh toán thành công" : "Thanh toán thất bại") : ""}
                        </h5>
                        {status === "success" ? (paymentRespData.rspCode == "00" 
                        ? <FcCheckmark className="w-[48px] h-[48px] border-[2px] border-gray-400 rounded-full" /> 
                        : <FcCancel  className="w-[48px] h-[48px]" />) : ""}
                    </div>
                    <p className=" text-sm font-medium text-center mt-6">
                        Cùng chúng tôi bảo vệ quyền lợi của bạn - theo dõi đơn hàng!
                    </p>
                </div>
                <div className="flex justify-center py-4 px-12">
                    <button onClick={() => { router.replace("/") }} className="bg-orange-400 text-white px-6 py-2 rounded ml-6 flex items-center justify-center space-x-2 w-[30%]">
                        <span className='text-sm max-md:text-xs '>Trang Chủ</span>
                    </button>
                    <button onClick={() => { router.replace(`/order/${vnp_TxnRef}`) }} className="bg-orange-400 text-white px-6 py-2 rounded ml-6 flex items-center justify-center space-x-2 w-[30%]">
                        <span className='text-sm max-md:text-xs '>Đơn mua</span>
                    </button>
                </div>
            </div>
        </div>
    )
}