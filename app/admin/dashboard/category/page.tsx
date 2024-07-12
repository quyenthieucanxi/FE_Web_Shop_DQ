"use client";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";
import { Delete, GetAllCategory } from "@/services/CategoryService";
import { ConvertToDDMMYYYY } from "@/utils/DateHelper";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";


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
    { id: 'cancel', label: '', minWidth: 100, },
];

export default function CategoryDashboard() {
    const router = useRouter()
    const fetchCategories = async () => {
        const res = await GetAllCategory();
        return res.data
    };
    const { data : dataCategories, status : statusCategories } = useQuery({
        queryKey: ['categoreies'],
        queryFn:  fetchCategories,
        placeholderData: keepPreviousData
    })
    const handleDeleteClick = async (rowId: string) => {
        try {
            await Delete(rowId);
            toast.success("Danh mục đã được huỷ", {
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
                <div className="my-3 w-[30%]">
                    <Button onClick={() => { router.push("/admin/dashboard/category/create") }} size="small" childern={"Tạo mới danh mục"} ></Button>
                </div>
                {
                    statusCategories !== "success" ? <Loading /> : <StickyHeadTable columns={columns} rows={dataCategories} handleDelete={handleDeleteClick} />
                }
            </div>
        </>
    )
}