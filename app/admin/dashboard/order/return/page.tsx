"use client";

import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query"
import dynamic from "next/dynamic";
import { ConvertToDDMMYYYY } from "@/utils/DateHelper";
import { FormatCurrencyVND } from "@/utils/StringHelper";
import { toast } from "react-toastify";
import Toast from "@/components/Toast";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { OrderList } from "@/types/order";
import { useEffect, useState } from "react";



const StickyHeadTable = dynamic(() => import("@/components/Table"), { ssr: false });

interface Column {
    id: string | string[],
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: any) => string;
}

    const columns: Column[] = [
        { id: 'checkbox', label: '', minWidth: 100 },
        { id: ['user', 'fullName'], label: 'Tên người đặt', minWidth: 150 },
        { id: ['products','0','title'], label: 'Tên sản phẩm', minWidth: 150 },
        { id: ['products','0','urlImage'], label: 'Ảnh', minWidth: 150 },
        { id: ['products','0','price'], label: 'Giá', minWidth: 100, format: (value: string) => FormatCurrencyVND(value) },
        { id: 'quantity', label: 'Số lượng', minWidth: 100 },
        { id: 'totalPrice', label: 'Thành tiền', minWidth: 100, format: (value: string) => FormatCurrencyVND(value) },
        { id: 'status', label: 'Trạng thái', minWidth: 150 },
        { id: 'note', label: 'Chú thích', minWidth: 100 },
        { id: 'payment', label: 'Thanh toán', minWidth: 160 },
        { id: 'recipientName', label: 'Thông tin người nhận', minWidth: 160 },
        { id: 'addressShipping', label: 'Địa chỉ người nhận', minWidth: 200 },
        { id: 'createdTime', label: 'Thời gian', minWidth: 100, format: (value: string) => ConvertToDDMMYYYY(value) },
    ];
export default function OrderReturnPage()
{
    const axiosAuth = useAxiosAuth();
    const { data: session } = useSession();
    const [selectedRow, setSelectedRow] = useState<string>("");
    const queryClient = useQueryClient();
    const fetchData = async (): Promise<OrderList> => {
        try {
            const res = await axiosAuth.get(`/api/Order/GetAllBySeller?status=Yêu cầu trả hàng`)
            return res.data.data
        } catch (error) {
            console.log(error);
        }
    }
   
    const { data, status } = useQuery({
        queryKey: ['orderReturn'],
        queryFn: fetchData ,
        placeholderData: keepPreviousData,
        enabled: !!session?.user?.accessToken,
    })
    

    const onSelectRow = (rowId: string) => {
        setSelectedRow(rowId);
    }
    const handleConfirm = async () => {
        if (selectedRow.length < 1) {
            return;
        }
        try {
            const res = await axiosAuth.put(`/api/Order/UpdateStatus?status=Trả hàng&orderId=${selectedRow}`)
            queryClient.invalidateQueries({ queryKey: ['orderReturn']});
            toast.success("Cập nhật thành công", {
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
    };
    const handleNotConfirm = async () => {
        if (selectedRow.length < 1) {
            return;
        }
        try {
            const res = await axiosAuth.put(`/api/Order/UpdateStatus?status=Không trả hàng&orderId=${selectedRow}`)
            queryClient.invalidateQueries({ queryKey: ['orderReturn']});
            toast.success("Cập nhật thành công", {
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
    };
    return (
        <>
            <Toast />
            <div className="h-screen w-[85%] ">
                <div className="my-4 ml-4 flex items-center ">
                    
                    <button onClick={handleConfirm} className='bg-green-500 p-2 text-xs text-white flex items-center rounded ml-5'>
                        Xác nhận
                    </button>
                    <button onClick={handleNotConfirm} className='bg-red-500 p-2 text-xs text-white flex items-center rounded ml-5'>
                        Không xác nhận
                    </button>
                </div>
                {
                     <StickyHeadTable columns={columns} rows={data?.orderList} onSelect={onSelectRow} />
                }
            </div>
        </>
    )
}