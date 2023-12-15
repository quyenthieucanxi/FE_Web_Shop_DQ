"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query"
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import { ConvertToDDMMYYYY } from "@/utils/DateHelper";
import { FormatCurrencyVND } from "@/utils/StringHelper";
import { GetAll, UpdateStatus } from "@/services/PostService"
import Toast from "@/components/Toast";
import { toast } from "react-toastify";


const StickyHeadTable = dynamic(() => import("@/components/Table"), { ssr: false });

interface Column {
    id: 'title' | 'description' | 'urlImage' | 'price' | 'address' | 'quantity' | 'createdTime'| 'confirm' | 'cancel';
    label: string;
    minWidth?: number;  
    align?: 'right';
    format?: (value: any) => string;
}
export default function DashBoardPage() {
    const queryClient = useQueryClient();
    const fetchData = async () => {
        const res = await GetAll()
        return res.data
    }

    const { data, isPlaceholderData, status } = useQuery({
        queryKey: ['post'],
        queryFn: fetchData,
    })

    const columns: Column[] = [
        { id: 'title', label: 'Tên', minWidth: 100 },
        { id: 'description', label: 'Mô tả', minWidth: 100 },
        { id: 'urlImage', label: 'Ảnh', minWidth: 100 },
        { id: 'price', label: 'Giá', minWidth: 100, format: (value: string) => FormatCurrencyVND(value) },
        { id: 'address', label: 'Địa chỉ', minWidth: 100 },
        { id: 'quantity', label: 'Số lượng', minWidth: 100 },
        { id: 'createdTime', label: 'Thời gian', minWidth: 100, format: (value: string) => ConvertToDDMMYYYY(value) },
        { id: 'confirm', label: '', minWidth: 100 },
        { id: 'cancel', label: '', minWidth: 100 },
    ];
    const handleConfirmClick = async (rowId: string) => {
        try {
            const res = await UpdateStatus(rowId, "Đang hiển thị");
            queryClient.invalidateQueries({queryKey: ['post']});
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
                    status === "pending" ? <Loading /> : <StickyHeadTable  columns={columns} rows={data} handleConfirm={handleConfirmClick} handleDelete={handleCancelClick} />
                }
            </div>
        </>
            
        
    )
}


