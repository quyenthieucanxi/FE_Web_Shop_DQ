"use client";

import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query"
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import { ConvertToDDMMYYYY } from "@/utils/DateHelper";
import { FormatCurrencyVND } from "@/utils/StringHelper";
import { GetAll, UpdateStatus } from "@/services/PostService"
import { toast } from "react-toastify";
import Toast from "@/components/Toast";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { OrderList } from "@/types/order";



const StickyHeadTable = dynamic(() => import("@/components/Table"), { ssr: false });

interface Column {
    id: string | string[],
    label: string;
    minWidth?: number;  
    align?: 'right';
    format?: (value: any) => string;
}
export default function DashBoardPage() {
    const axiosAuth = useAxiosAuth();
    const {data: session} = useSession();
    const queryClient = useQueryClient();
        const fetchData  = async () : Promise<OrderList> => {
            try {
                const res  = await axiosAuth.get(`/api/Order/GetAll`)
                return res.data.data
            } catch (error) {
                console.log(error);
            }
        }
    const { data  , status } = useQuery({
        queryKey: ['order'],
        queryFn: fetchData,
        placeholderData: keepPreviousData,
        enabled: !!session?.user?.accessToken,
    })
    
    const columns: Column[] = [
        { id: ['user','fullName'], label: 'Tên người đặt', minWidth: 150 },
        { id: ['product','title'], label: 'Tên sản phẩm', minWidth: 150 },
        { id: ['product','urlImage'], label: 'Ảnh', minWidth: 150 },
        { id: ['product','price'], label: 'Giá', minWidth: 100, format: (value: string) => FormatCurrencyVND(value) },
        { id: 'quantity', label: 'Số lượng', minWidth: 100 },
        { id: 'totalPrice', label: 'Thành tiền', minWidth: 100,format: (value: string) => FormatCurrencyVND(value) },
        { id: 'status', label: 'Trạng thái', minWidth: 100 },
        { id: 'note', label: 'Chú thích', minWidth: 100 },
        { id: 'payment', label: 'Thanh toán', minWidth: 160 },
        { id: 'recipientName', label: 'Thông tin người nhận', minWidth: 160 },
        { id: 'addressShipping', label: 'Địa chỉ người nhận', minWidth: 200 },
        { id: 'createdTime', label: 'Thời gian', minWidth: 100, format: (value: string) => ConvertToDDMMYYYY(value) },
    ];
    const handleCancelClick = async (rowId: string) => {
        try {
            const res = await UpdateStatus(rowId, "Huỷ");
            queryClient.invalidateQueries({queryKey: ['post']});
        }
        catch (err) {

        }
        finally {
            toast.success("Tin đã được huỷ", {
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
                {
                    status === "pending" ? <Loading /> : <StickyHeadTable  columns={columns} rows={data?.orderList}  />
                }
            </div>
        </>
            
        
    )
}