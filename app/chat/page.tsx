"use client";
import { LuSendHorizonal } from "react-icons/lu";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useEffect, useRef, useState } from "react";
import { HubConnectionBuilder } from '@microsoft/signalr'
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { CalculateTimePassedAsync } from "@/utils/DateHelper";
import ItemChat from "@/components/ItemChat";
import { useHub } from "../context/HubProvider";

export default function ChatPage() {
    const { data: session } = useSession()
    const { connection} = useHub()
    const axioAuth = useAxiosAuth()
    const queryClient = useQueryClient();
    const options = [
        { value: null, label: 'Tất cả' },
        { value: "false", label: 'Tin chưa đọc' },
    ];
    const [status, setStatus] = useState(null)
    const [defaultOption, setDefaultOpion] = useState(options[0]);
    const handleChangeDrop = (selectedOption) => {
        setDefaultOpion(selectedOption)
        setStatus(selectedOption.value)
    }
    const fetchChats = async (status?: boolean) => {
        const { data: response }: { data: Response } = await axioAuth.get(`/api/Chats/GetChats${status !== null ? `?status=${status}` : ""}`)
        return response.data
    }
    const { data }: { data: Array<Chat> } = useQuery({
        queryKey: ["fetchChats", status],
        queryFn: () => fetchChats(status),
        placeholderData: keepPreviousData,
        enabled: !!session?.user?.accessToken
    }
    )
    const countChatsIsNotRead = async () => {
        const { data: response }: { data: Response } = await axioAuth.get(`/api/Chats/CountChatsNotIsRead`)
        return response.data
    }
    const { data: countChats }: { data: number } = useQuery({
        queryKey: ["countChatsIsNotRead", data],
        queryFn: countChatsIsNotRead,
        placeholderData: keepPreviousData,
        enabled: !!session?.user?.accessToken
    }
    )
    useEffect(() => {
        if (connection && session?.user?.accessToken) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                })
                .catch(e => console.log('Connection failed:', e));
            connection.on("ReceiveMessage", (url, message) => {
                queryClient.invalidateQueries({ queryKey: ["countChatsIsNotRead", data] });
            });
        }
    }, [connection, session?.user?.accessToken]);
    return (
        <div className="mx-auto bg-white max-w-[960px] mt-16 p-4 h-[100%] flex">
            <div className="w-[40%] h-[100%] float-left border-r-[1px] ">
                <div className='relative inline-block'>
                    <Dropdown className="relative py-[6px] pr-3 pl-2 text-sm font-medium cursor-pointer" menuClassName=""
                        options={options} onChange={handleChangeDrop} value={defaultOption} placeholder="Select an option" />
                    {
                        countChats > 0 &&
                        <div className=" absolute right-[0px] top-[0px] bg-red-500 text-white text-[10px] font-bold leading-[18px] rounded-[50%] w-[20px] h-[20px] text-center border-[0.5px] border-solid border-white">
                            {countChats}
                        </div>
                    }

                </div>
                <div className='overflow-y-auto h-[530px]'>
                    {
                        data?.map((chat, index) => {
                            return (
                                <ItemChat key={index} chat={chat}
                                    user={chat?.receiver?.url === session?.user?.url ? chat?.sender : chat?.receiver} />
                            )
                        })
                    }
                </div>
            </div>
            <div className="w-[60%] h-[100%] float-left ">

            </div>
        </div>
    )
}


