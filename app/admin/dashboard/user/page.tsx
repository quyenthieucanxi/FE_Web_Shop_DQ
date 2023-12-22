"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query"
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import { ConvertToDDMMYYYY } from "@/utils/DateHelper";
import { FormatCurrencyVND } from "@/utils/StringHelper";
import { GetAll, UpdateStatus } from "@/services/PostService"
import Toast from "@/components/Toast";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";


const StickyHeadTable = dynamic(() => import("@/components/Table"), { ssr: false });

interface Column {
    id: string;
    label: string;
    minWidth?: number;  
    align?: 'right';
    format?: (value: any) => string;
}
const columns: Column[] = [
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'fullName', label: 'Họ tên', minWidth: 100 },
    { id: 'phoneNumber', label: 'Số điện thoại', minWidth: 100 },
    { id: 'introduce', label: 'Giới thiệu', minWidth: 100, },
    { id: 'address', label: 'Địa chỉ', minWidth: 100 },
    { id: 'createdTime', label: 'Thời gian', minWidth: 100, format: (value: string) => ConvertToDDMMYYYY(value) },
];
export default function DashBoardUser() {
    const axiosAuth = useAxiosAuth();
    const {data: session} = useSession();
    const fetchData = async () : Promise<UserList> => {
        const res = await axiosAuth.get(`/api/User/GetAll`)
        return res.data.data;
    }
    const { data, status } = useQuery({
        queryKey: ['Users'],
        queryFn: fetchData,
        enabled: !!session?.user.accessToken
    })

    return (
        <>
            <Toast />
            <div className="h-screen w-[85%] ">
                {
                    status === "pending" ? <Loading /> : <StickyHeadTable  columns={columns} rows={data.userList} />
                }
            </div>
        </>
            
        
    )
}


