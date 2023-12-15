"use client";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";

import ListProducts from "@/components/ListProducts";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import Toast from "@/components/Toast";
import { Metadata } from "next/types";
import { getBefore, getBeforeLast } from "@/utils/StringHelper";
import { useEffect, useState } from "react";


const Slider = dynamic(() => import("@/components/Slider"), { ssr: false });



export default function SearchPage({ params }: { params: { products: string } }) {
    const router = useRouter();
    const searchParams = useSearchParams()
    const page = searchParams.get("page")
    const search = searchParams.get("search")
    const catPath = params.products;
    const orderByDirection = searchParams.get("orderByDirection")
    const [url,setUrl] = useState("")
    useEffect(() => {
        setUrl(window.location.href)
    }, []);
    const handleSortASC = () => {
        if (url.includes('?')) {
            if (url.includes('orderByDirection')) {
                router.push(`${getBeforeLast(url, '=')}=ASC`)
            }
            else {
                router.push(`${url}&orderByDirection=ASC`)
            }
            router.refresh()
        }
        else {
            router.push(`${url}?orderByDirection=ASC`)
            router.refresh()
        }
    }
    const handleSortDESC = () => {
        if (url.includes('?')) {
            if (url.includes('orderByDirection')) {
                router.push(`${getBeforeLast(url, '=')}=DESC`)
            }
            else {
                router.push(`${url}&orderByDirection=DESC`)
            }
            router.refresh()
        }
        else {
            router.push(`${url}?orderByDirection=DESC`)
            router.refresh()
        }
    }
    return (
        <>
            <Toast />
            <section>
                <div className="mx-auto p-4 bg-white rounded-md max-w-[960px] mt-20">
                    < Slider />
                </div>
            </section>
            <section>
                <div className="mx-auto max-w-[960px] bg-white mt-10 p-4">
                    <h2 className="text-sm font-bold text-[#222]">Gợi ý khu vực</h2>
                    <div className="flex gap-8 p-3 flex-wrap overflow-x-auto">
                        <a className="text-sm  bg-[#f4f4f4] gap-4 rounded-full  py-[8px] px-3 hover:bg-[#ffefd6] hover:text-[#fe9900]" href="">Tp Hồ Chí Minh</a>
                        <a className="text-sm  bg-[#f4f4f4] gap-4 rounded-full  py-[8px] px-3 hover:bg-[#ffefd6] hover:text-[#fe9900]" href="">Hà Nội</a>
                        <a className="text-sm  bg-[#f4f4f4] gap-4 rounded-full  py-[8px] px-3 hover:bg-[#ffefd6] hover:text-[#fe9900]" href="">Đà Nẵng</a>
                    </div>
                </div>
            </section>
            <section>
                <div className="mx-auto max-w-[960px] bg-white mt-10 p-4">
                    <div className="flex justify-between">
                        <div className="gap-8 inline-flex">
                            <a className="w-full " href=""><div className="relative px-3 py-2 text-sm font-bold text-[#f80] after:content-[''] after:w-full after:h-[3px] after:absolute after:bottom-0 after:left-0 after:bg-[#ffba00] ">Tất cả</div></a>
                        </div>
                        <div className="text-sm flex items-center gap-2 ">
                            Xếp theo giá
                            <button onClick={handleSortASC} className="border border-solid">
                                <IoIosArrowRoundUp className="w-[22px] h-[22px]" />
                            </button>
                            <button onClick={handleSortDESC} className="border border-solid">
                                <IoIosArrowRoundDown className="w-[22px] h-[22px]" />
                            </button>
                        </div>
                    </div>

                    <div>
                        <ListProducts pagination={true} page={page} catPath={catPath} search={search} orderByDirection={orderByDirection} />
                    </div>

                </div>
            </section>
        </>
    )
}

function useRouterEffect(arg0: () => void, arg1: any[]) {
    throw new Error("Function not implemented.");
}
