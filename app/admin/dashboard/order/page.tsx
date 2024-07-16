"use client";

import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query"
import dynamic from "next/dynamic";
import { ConvertToDDMMYYYY } from "@/utils/DateHelper";
import { FormatCurrencyVND } from "@/utils/StringHelper";
import { toast } from "react-toastify";
import Toast from "@/components/Toast";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { Order, OrderList } from "@/types/order";
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
export default function DashBoardPage() {
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [selectedRow, setSelectedRow] = useState<string>("");
    const [orderFilter, setOrderFilter] = useState<OrderList>(null)
    const axiosAuth = useAxiosAuth();
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    const fetchData = async (): Promise<OrderList> => {
        try {
            const res = await axiosAuth.get(`/api/Order/GetAllBySeller`)
            return res.data.data
        } catch (error) {
            console.log(error);
        }
    }
    const fetchDataByStatus = async (status?: string) => {
        try {

                const res = await axiosAuth.get(`/api/Order/GetAllBySeller?status=${status}`)
                setOrderFilter(res.data.data as OrderList)
    
        } catch (error) {
            console.log(error);
        }
    }
   
    const { data, status } = useQuery({
        queryKey: ['order'],
        queryFn:  fetchData  ,
        placeholderData: keepPreviousData,
        enabled: !!session?.user?.accessToken,
    })
    

    const onSelectRow = (rowId: string) => {
        setSelectedRow(rowId);
    }

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value.trim()
        setSelectedStatus(value);
    };
    const handleUpdateStatus = async () => {
        if (!selectedStatus || selectedRow.length < 1) {
            return;
          }
        try {
            const res = await axiosAuth.put(`/api/Order/UpdateStatus?status=${selectedStatus}&orderId=${selectedRow}`)
            queryClient.invalidateQueries({queryKey: ['order']});
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
            // queryClient.setQueryData<OrderList>(['order'], oldData => {
            //     console.log("Old data: ", oldData); // Thêm log để kiểm tra dữ liệu cũ
            //     if (!oldData) return oldData;
            
            //     const updatedOrderList = oldData.orderList.map(order => {
            //         if (order.id === selectedRow) {
            //             return { ...order, status: selectedStatus };
            //         }
            //         return order;
            //     });
            
            //     const newData = {
            //         ...oldData,
            //         orderList: updatedOrderList,
            //     };
                
            //     console.log("New data: ", newData); // Thêm log để kiểm tra dữ liệu mới
            //     return newData;
            // });
            
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
    const handleFilterStatus = async () => {
        if (data &&  selectedStatus )
        {
            fetchDataByStatus(selectedStatus)
        }
    }
    const handleFilterAll = async () => {
        if (data &&  selectedStatus )
        {
            const res =  await fetchData()
            setOrderFilter(res)
        }
    }
    
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
                        <option value="Xác nhận">XÁC NHẬN</option>
                        <option value="Đang xử lý">ĐANG XỬ LÝ</option>
                        <option value="Đang giao">ĐANG GIAO</option>
                        <option value="Đã giao">ĐÃ GIAO</option>
                        <option value="Huỷ">HUỶ</option>
                    </select>
                    <button onClick={handleUpdateStatus} className='bg-green-500 p-2 text-xs text-white flex items-center rounded ml-5'>
                        Xác nhận
                    </button>
                    <button onClick={handleFilterStatus} className='bg-green-500 p-2 text-xs text-white flex items-center rounded ml-5'>
                        Lọc
                    </button>
                    <button onClick={handleFilterAll} className='bg-green-500 p-2 text-xs text-white flex items-center rounded ml-5'>
                        Lọc Tất cả
                    </button>
                </div>
                { data && status === 'success' &&
                     <StickyHeadTable columns={columns} rows={orderFilter?.orderList || data?.orderList} onSelect={onSelectRow} />
                }
            </div>
        </>
    )
}