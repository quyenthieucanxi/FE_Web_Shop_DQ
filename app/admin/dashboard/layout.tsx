"use client";
import { BiSolidHelpCircle } from "react-icons/bi"
import { MdOutlineEventNote } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import Link from "next/link";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { CiUser } from "react-icons/ci";
import { useSession } from "next-auth/react";


export default function DashBoardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { data: session } = useSession();
    return (
        <div className="mt-16 flex">
            <div className="w-[15%] h-screen bg-white">
                <div className="flex w-full flex-col gap-3 bg-white p-3 text-black shadow-lg max-h-[350px] overflow-y-auto ">
                    <div className="border-t border-slate-500/30"></div>
                    <div className="flex flex-col hover:cursor-pointer">
                        {
                            session?.user?.role == "Admin" && (
                                <>
                                    <Link href="/admin/dashboard/user" className="flex items-center gap-3 rounded-md py-2 px-2 hover:bg-slate-300 border-b">
                                        <div className="rounded-full bg-gray-300 p-1">
                                            <CiUser className="text-gray-500" size="16px" />
                                        </div>
                                        <span className="text-sm font-medium">Danh sách người dùng</span>
                                    </Link>
                                    <Link href="/admin/dashboard" className="flex items-center gap-3 rounded-md py-2 px-2 hover:bg-slate-300 border-b">
                                        <div className="rounded-full bg-gray-300 p-1">
                                            <MdOutlineEventNote className="text-gray-500" size="16px" />
                                        </div>
                                        <span className="text-sm font-medium">Duyệt bài đăng</span>
                                    </Link>
                                    <Link href="/admin/dashboard/postTrend" className="flex items-center gap-3 rounded-md py-2 px-2 hover:bg-slate-300 border-b">
                                        <div className="rounded-full bg-gray-300 p-1">
                                            <MdOutlineEventNote className="text-gray-500" size="16px" />
                                        </div>
                                        <span className="text-sm font-medium">Duyệt tin nổi bật</span>
                                    </Link>
                                    <Link href="/admin/dashboard/shop" className="flex items-center gap-3 rounded-md py-2 px-2 hover:bg-slate-300 border-b">
                                        <div className="rounded-full bg-gray-300 p-1">
                                            <MdOutlineEventNote className="text-gray-500" size="16px" />
                                        </div>
                                        <span className="text-sm font-medium">Duyệt cửa hàng</span>
                                    </Link>
                                    <Link href="/admin/dashboard/category" className="flex items-center gap-3 rounded-md py-2 px-2 hover:bg-slate-300 border-b">
                                        <div className="rounded-full bg-gray-300 p-1">
                                            <BiCategoryAlt className="text-gray-500" size="16px" />
                                        </div>
                                        <span className="text-sm font-medium">Danh sách danh mục</span>
                                    </Link>
                                    
                                </>
                            )
                        }
                        {
                            session?.user?.role == "Seller" &&
                            <>
                                <Link href="/admin/dashboard/post" className="flex items-center gap-3 rounded-md py-2 px-2 hover:bg-slate-300">
                                    <CiViewList className="text-gray-500" size="24px" />
                                    <span className="text-sm font-medium">Đanh sách sản phẩm</span>
                                </Link>
                                <Link href="/admin/dashboard/order" className="flex items-center gap-3 rounded-md py-2 px-2 hover:bg-slate-300">
                                    <HiOutlineShoppingBag className="text-gray-500" size="24px" />
                                    <span className="text-sm font-medium">Đanh sách đơn hàng</span>
                                </Link>
                                <Link href="/admin/dashboard/order/return" className="flex items-center gap-3 rounded-md py-2 px-2 hover:bg-slate-300">
                                    <HiOutlineShoppingBag className="text-gray-500" size="24px" />
                                    <span className="text-sm font-medium">Đanh sách đơn hàng hoàn trả</span>
                                </Link>
                            </>
                        }

                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}