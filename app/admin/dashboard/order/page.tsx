"use client";

import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query"
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import { ConvertToDDMMYYYY } from "@/utils/DateHelper";
import { FormatCurrencyVND } from "@/utils/StringHelper";
import { toast } from "react-toastify";
import Toast from "@/components/Toast";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { OrderList } from "@/types/order";
import { useState } from "react";


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
    { id: ['product', 'title'], label: 'Tên sản phẩm', minWidth: 150 },
    { id: ['product', 'urlImage'], label: 'Ảnh', minWidth: 150 },
    { id: ['product', 'price'], label: 'Giá', minWidth: 100, format: (value: string) => FormatCurrencyVND(value) },
    { id: 'quantity', label: 'Số lượng', minWidth: 100 },
    { id: 'totalPrice', label: 'Thành tiền', minWidth: 100, format: (value: string) => FormatCurrencyVND(value) },
    { id: 'status', label: 'Trạng thái', minWidth: 100 },
    { id: 'note', label: 'Chú thích', minWidth: 100 },
    { id: 'payment', label: 'Thanh toán', minWidth: 160 },
    { id: 'recipientName', label: 'Thông tin người nhận', minWidth: 160 },
    { id: 'addressShipping', label: 'Địa chỉ người nhận', minWidth: 200 },
    { id: 'createdTime', label: 'Thời gian', minWidth: 100, format: (value: string) => ConvertToDDMMYYYY(value) },
];
export default function DashBoardPage() {
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [selectedRow, setSelectedRow] = useState<string>("");
    const axiosAuth = useAxiosAuth();
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    const fetchData = async (): Promise<OrderList> => {
        try {
            const res = await axiosAuth.get(`/api/Order/GetAll`)
            return res.data.data
        } catch (error) {
            console.log(error);
        }
    }
    const { data, status } = useQuery({
        queryKey: ['order'],
        queryFn: fetchData,
        enabled: !!session?.user?.accessToken,
    })

    const onSelectRow = (rowId: string) => {
        setSelectedRow(rowId);
    }

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(event.target.value);
    };

    const handleUpdateStatus = async () => {
        if (!selectedStatus) {
            return;
          }
        try {
            const res = await axiosAuth.put(`/api/Order/UpdateStatus?status=${selectedStatus}&orderId=${selectedRow}`)
            queryClient.invalidateQueries({ queryKey: ['order']});
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
            toast.error("Cập nhật thất bại", {
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
                    <span className="text-sm font-normal mr-2 ">
                        Trạng thái
                    </span>
                    <select onChange={handleStatusChange}
                        className="text-[#222] text-sm  px-3 py-2" >
                        <option hidden value=""></option>
                        <option value={""} disabled >Chọn trạng thái</option>
                        <option value="XÁC NHẬN">XÁC NHẬN</option>
                        <option value="ĐANG XỬ LÝ">ĐANG XỬ LÝ</option>
                        <option value="ĐANG GIAO">ĐANG GIAO</option>
                        <option value="ĐÃ GIAO">ĐÃ GIAO</option>
                        <option value="HUỶ">HUỶ</option>
                    </select>
                    <button onClick={handleUpdateStatus} className='bg-green-500 p-2 text-xs text-white flex items-center rounded ml-5'>
                        Xác nhận
                    </button>
                </div>
                {
                    status === "pending" ? <Loading /> : <StickyHeadTable columns={columns} rows={data?.orderList} onSelect={onSelectRow} />
                }
            </div>
        </>


    )
}