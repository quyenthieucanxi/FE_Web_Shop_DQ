
"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query"
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import { ConvertToDDMMYYYY } from "@/utils/DateHelper";
import { FormatCurrencyVND } from "@/utils/StringHelper";
import { GetAll, GetPostByStatus } from "@/services/PostService"
import Toast from "@/components/Toast";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";

const StickyHeadTable = dynamic(() => import("@/components/Table"), { ssr: false });

interface Column {
    id: 'title' | 'description' | 'urlImage' | 'price' | 'address' | 'quantity' | 'createdTime'| 'confirm' | 'cancel';
    label: string;
    minWidth?: number;  
    align?: 'right';
    format?: (value: any) => string;
}
export default function DashBoardPost() {
    const axiosAuth = useAxiosAuth();
    const {data: session} = useSession()
    const fetchData = async (status : string) => {
        const res = await axiosAuth.get(`/api/Post/GetByStatus?status=${status}`)
        return res.data.data.postList;
    }
    const Status = "Đang hiển thị";
    const { data, status } = useQuery({
        queryKey: ['post',Status],
        queryFn: () =>  fetchData(Status),
        placeholderData: keepPreviousData,
        enabled: !!session?.user.accessToken
    })

    const columns: Column[] = [
        { id: 'title', label: 'Tên', minWidth: 100 },
        { id: 'description', label: 'Mô tả', minWidth: 100 },
        { id: 'urlImage', label: 'Ảnh', minWidth: 100 },
        { id: 'price', label: 'Giá', minWidth: 100, format: (value: string) => FormatCurrencyVND(value) },
        { id: 'address', label: 'Địa chỉ', minWidth: 100 },
        { id: 'quantity', label: 'Số lượng', minWidth: 100 },
        { id: 'createdTime', label: 'Thời gian', minWidth: 100, format: (value: string) => ConvertToDDMMYYYY(value) },
    ];
    return (
        <>
            <Toast />
            <div className="h-screen w-[85%] ">
                {
                    status !== "success" ? <Loading /> : <StickyHeadTable  columns={columns} rows={data}  />
                }
            </div>
        </>
            
        
    )
}
