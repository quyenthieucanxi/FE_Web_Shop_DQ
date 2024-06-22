"use client";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";
import { GetAllCategory } from "@/services/CategoryService";
import { ConvertToDDMMYYYY } from "@/utils/DateHelper";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";


const StickyHeadTable = dynamic(() => import("@/components/Table"), { ssr: false });

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: any) => string;
}
const columns: Column[] = [
    { id: 'categoryName', label: 'Tên', minWidth: 100 },
    { id: 'urlImg', label: 'Ảnh', minWidth: 180 },
    { id: 'createdTime', label: 'Thời gian', minWidth: 100, format: (value: string) => ConvertToDDMMYYYY(value) },
    { id: 'modifiedTime', label: 'Thời gian', minWidth: 100, format: (value: string) => ConvertToDDMMYYYY(value) },
    { id: 'update', label: '', minWidth: 130, },
];

export default function CategoryDashboard() {
    const fetchCategories = async () => {
        const res = await GetAllCategory();
        return res.data
    };
    const { data : dataCategories, status : statusCategories } = useQuery({
        queryKey: ['categoreies'],
        queryFn:  fetchCategories,
        placeholderData: keepPreviousData
    })
    return (
        <>
            <Toast />
            <div className="h-screen w-[85%] ">
                {
                    statusCategories !== "success" ? <Loading /> : <StickyHeadTable columns={columns} rows={dataCategories}  />
                }
            </div>
        </>
    )
}