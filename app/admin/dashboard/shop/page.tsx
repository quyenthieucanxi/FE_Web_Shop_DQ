"use client";

import Loading from "@/components/Loading";
import Toast from "@/components/Toast";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { ConvertToDDMMYYYY } from "@/utils/DateHelper";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
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
    { id: ['user', 'fullName'], label: 'Tên người tạo', minWidth: 150 },
    { id: ['user', 'phoneNumber'], label: 'SĐT người tạo', minWidth: 150 },
    { id: 'name', label: 'Tên cửa hàng', minWidth: 100 },
    { id: 'description', label: 'Mô tả', minWidth: 100 },
    { id: 'createdTime', label: 'Thời gian', minWidth: 100, format: (value: string) => ConvertToDDMMYYYY(value) },
    { id: 'confirm', label: '', minWidth: 100 },
    { id: 'cancel', label: '', minWidth: 100 },
];

export default function DashBoardShopPage() {
    const {data: session} = useSession();
    const axiosAuth = useAxiosAuth();
    const queryClient = useQueryClient();
    const fetchData = async () => {
        const { data: response }: { data: Response } = await axiosAuth.get(`/api/User/GetShopsPending`)
        return response.data as Array<Shop>
    }
    
    const { data ,status} = useQuery({
        queryKey: ['shops'],
        queryFn: fetchData,
        placeholderData: keepPreviousData,
        enabled: !!session?.user?.accessToken
    })
    const handleConfirmClick = async (rowId: string) => {
        try {
            
            const res = await axiosAuth.put(`/api/User/UpdateStatusShop/${rowId}?status=Đang hiển thị`);
            queryClient.invalidateQueries({queryKey: ['shops']});
            toast.success("Duyệt cửa hàng thành công thành công", {
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
            
            const res = await axiosAuth.put(`/api/User/UpdateStatusShop/${rowId}?status=Huỷ`);
            queryClient.invalidateQueries({queryKey: ['shops']});
            toast.success("Cửa hàng đã được huỷ", {
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
    return (
        <>
        <Toast />
        <div className="h-screen w-[85%] ">
            {
                status === "pending" ? <Loading /> : <StickyHeadTable  columns={columns} rows={data} handleConfirm={handleConfirmClick} handleDelete={handleCancelClick} />
            }
        </div>
    </>
    )

}