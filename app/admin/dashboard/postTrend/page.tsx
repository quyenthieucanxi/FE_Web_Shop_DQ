
"use client";

import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query"
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import { ConvertToDDMMYYYY } from "@/utils/DateHelper";
import { FormatCurrencyVND } from "@/utils/StringHelper";
import { GetAll, GetPostByStatus, UpdateStatus } from "@/services/PostService"
import Toast from "@/components/Toast";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const StickyHeadTable = dynamic(() => import("@/components/Table"), { ssr: false });

interface Column {
    id: string | string[];
    label: string;
    minWidth?: number;  
    align?: 'right';
    format?: (value: any) => string;
}
const columns: Column[] = [
    { id: ['user', 'fullName'], label: 'Tên người yêu cầu', minWidth: 100 },
    { id: 'title', label: 'Tên', minWidth: 100 },
    { id: 'description', label: 'Mô tả', minWidth: 100 },
    { id: 'urlImage', label: 'Ảnh', minWidth: 180 },
    { id: 'price', label: 'Giá', minWidth: 100, format: (value: string) => FormatCurrencyVND(value) },
    { id: 'address', label: 'Địa chỉ', minWidth: 160 },
    { id: 'quantity', label: 'Số lượng', minWidth: 100 },
    { id: 'createdTime', label: 'Thời gian', minWidth: 100, format: (value: string) => ConvertToDDMMYYYY(value) },
    { id: 'confirm', label: '', minWidth: 130,  },
    { id: 'cancel', label: '', minWidth: 100, },
];
export default function DashBoardPost() {
    const axiosAuth = useAxiosAuth();
    const queryClient = useQueryClient();
    const {data: session} = useSession();
    const fetchData = async () => {
        const res = await axiosAuth.get(`/api/Post/GetAllRequestTrend`)
        return res.data.data;
    }
    const Trend = "Nổi bật";
    const NotTrend = "Hủy duyệt lên nổi bật";
    const { data, status } = useQuery({
        queryKey: ['postsTrend'],
        queryFn: fetchData,
        enabled: !!session?.user.accessToken
    })
    const handleConfirmClick = async (rowId: string) => {
        try {
            const res = await axiosAuth.put(`/api/Post/UpdateRequestTrend/${rowId}?status=${Trend}`)
            queryClient.invalidateQueries({queryKey: ['postsTrend']});
            toast.success("Duyệt thành công", {
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

        }
    };
    const handleCancelClick = async (rowId: string) => {
        try {
            const res = await axiosAuth.put(`/api/Post/UpdateRequestTrend/${rowId}?status=${NotTrend}`)
            queryClient.invalidateQueries({queryKey: ['postsTrend']});
            toast.success("Yêu cầu duyệt đã được huỷ", {
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
        
    };
    return (
        <>
            <Toast />
            <div className="h-screen w-[85%] ">
                {
                    status === "pending" ? <Loading /> : <StickyHeadTable  columns={columns} rows={data}  handleConfirm={handleConfirmClick} handleDelete={handleCancelClick} />
                }
            </div>
        </>
            
        
    )
}
