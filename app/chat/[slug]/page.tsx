"use client";
import { LuSendHorizonal } from "react-icons/lu";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';
import { useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import ItemChat from "@/components/ItemChat";
import Link from "next/link";
import { ConvertToDDMMYYYY, ConvertToHourMinute, isSameDate, parseDate } from "@/utils/DateHelper";
import { useHub } from "@/app/context/HubProvider";
import axios from "@/libs/axios";
import { time } from "console";

export default function ChatDirectPage({ params }: { params: { slug: string } }) {
    const { data: session } = useSession()
    const { connection } = useHub()
    const axiosAuth = useAxiosAuth()
    const queryClient = useQueryClient();
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [totalMessagesIsNotRead, setTotalMessagesIsNotRead] = useState(0)

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
        const { data: response }: { data: Response } = await axiosAuth.get(`/api/Chats/GetChats${status !== null ? `?status=${status}` : ""}`)
        return response.data
    }
    const { data }: { data: Array<Chat> } = useQuery({
        queryKey: ["fetchChats", status, messages, totalMessagesIsNotRead],
        queryFn: () => fetchChats(status),
        placeholderData: keepPreviousData,
        enabled: !!session?.user?.accessToken
    })
    const countChatsIsNotRead = async () => {
        const { data: response }: { data: Response } = await axiosAuth.get(`/api/Chats/CountChatsNotIsRead`)
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
        setTotalMessagesIsNotRead(countChats)
    }, [countChats])
    const fetchHistoryChats = async () => {
        const { data: response }: { data: Response } = await axiosAuth.get(`/api/Chats/GetHistoryChat/${params.slug}`)
        return response.data
    }
    const { data: historyChat }: { data: Array<GroupChatByTime> } = useQuery({
        queryKey: ["fetchHistoryChats", messages],
        queryFn: fetchHistoryChats,
        placeholderData: keepPreviousData,
        enabled: !!session?.user?.accessToken
    }
    )
    const fetchUser = async () => {
        const { data: response }: { data: Response } = await axios.get(`/api/User/GetProfile?url=${params.slug}`)
        const user: User = response.data as User
        return user
    }
    const { data: infoUser }: { data: User } = useQuery({
        queryKey: ["userInfo"],
        queryFn: fetchUser,
        placeholderData: keepPreviousData,
    }
    )
    useEffect(() => {
        if (historyChat) {
            setMessages(historyChat);
        }
    }, [historyChat]
    ) 
    const addToGroupChatByTime =  (url : string , message: string)  => {
        const currentDate = new Date();
        let found = false;
        const updatedHistoryChat = messages?.map(item  => {
            const groupDate = parseDate(item.time)
            if (isSameDate(groupDate, currentDate)) {
                found = true;
                return {
                    ...item,
                    messages: [...item.messages, {url: url , message: message }]
                };
            }
            return item;
        }
        )
        if (!found) {
            updatedHistoryChat.push({
                time: currentDate.toLocaleDateString('en-GB'), // Chuyển đổi ngày hiện tại về chuỗi "dd/MM/yyyy"
                messages: [{
                    url: url,
                    message: message
                }]
            });
        }
        console.log('Updated History Chat:', updatedHistoryChat);
        return updatedHistoryChat
        
    }

    useEffect(() => {
        if (connection && session?.user?.accessToken) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                })
                .catch(e => console.log('Connection failed:', e));
            connection.on("ReceiveMessage",  (url, message) => {
                queryClient.invalidateQueries({ queryKey: ["countChatsIsNotRead", data] });
                //setMessages(prevMessages => [...prevMessages, { messages: message, url: url }]);
                const updateMesssagrs =  addToGroupChatByTime(url,message)
                setMessages(updateMesssagrs)
            });
        }
    }, [connection, session?.user?.accessToken]);
    const sendMessage = async () => {
        if (!messageInput) return;
        try {
            const chat = {
                urlSender: session?.user?.url,
                urlReceiver: params.slug,
                message: messageInput
            };
            await connection.invoke("SendMessage", chat)
            
            setMessages(prevMessages => [...prevMessages, { messages: chat.message, url: chat.urlSender }])
            setMessageInput('');
        } catch (e) {
            console.error(e.toString());
        }
    };
    

    const textareaRef = useRef(null);

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
            textarea.style.overflowY = 'auto'
        }
    };

    const handleFocus = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
            textarea.style.overflowY = 'auto'
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Ngăn chặn xuống dòng
            sendMessage();
        }
    };
    const messagesContainerRef = useRef(null);
    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
                <div className="h-[100%] flex flex-col border-r-[1px] ">
                    <div className=' py-[6px] pl-[3px] pr-[12px] cursor-pointer border-b-[1px]'>
                        {
                            <Link className="flex" href={`/user/${infoUser?.url}`}>
                                <div className='mr-3'>
                                    <img className='rounded-[50%] w-[30px] h-[30px] ml-[5px]' src={infoUser?.avatarUrl}
                                        alt={infoUser?.fullName} />
                                </div>
                                <div className=''>
                                    <span className='text-sm font-bold'>{infoUser?.fullName}</span>
                                </div>
                            </Link>
                        }

                    </div>
                    <div className=' h-[100%] overflow-x-hidden'>
                        <div className="h-[510px] flex-grow flex-shrink pt-[10px] w-[100%] overflow-x-hidden overflow-y-auto"
                            ref={messagesContainerRef}>
                            {
                                // messages && Object.entries(groupedMessages).map(([date, msgs]) => (
                                //     <div key={date}>
                                //         <div className="text-center font-medium text-gray-400 text-sm my-4">
                                //             {date}
                                //         </div>
                                //         {
                                //             Array.isArray(msgs) &&
                                //             msgs.map((msg, index) => (
                                //                 <div key={index} className={`flex ${msg.url === session?.user?.url ? 'text-right justify-end' : 'text-left justify-start'}`}>
                                //                     <div className="m-w-[70%] mx-[10px] mb-1 py-[6px] px-3 rounded-[8px] bg-slate-200">
                                //                         <div className="text-sm">{msg.messages}</div>
                                //                         <div className="text-[10px] font-extralight">{ConvertToHourMinute(msg.time)}</div>
                                //                     </div>
                                //                 </div>
                                //             ))

                                //         }
                                //     </div>
                                // ))
                                messages?.map((item,index) => (
                                    <div key={index}>
                                        <div className="text-center font-medium text-gray-400 text-sm my-4">
                                            {item.time}
                                        </div>
                                        {
                                            Array.isArray(item?.messages) && 
                                            item?.messages?.map((msg, index) => 
                                            {
                                                return (
                                                    <div key={index} className={`flex ${msg?.receiver !== null ? 'text-right justify-end' : 'text-left justify-start'}`}>
                                                        <div className="m-w-[70%] mx-[10px] mb-1 py-[6px] px-3 rounded-[8px] bg-slate-200">
                                                            <div className="text-sm">{msg.messages}</div>
                                                            <div className="text-[10px] font-extralight">{ConvertToHourMinute(msg.createdTime)}</div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            )

                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex items-center pt-[6px] pr-2 pl-3">

                            <textarea ref={textareaRef} className=' font-light text-sm flex-grow flex-shrink  bg-slate-200 max-h-[70px] overflow-x-hidden  overflow-y-hidden  break-words py-1 px-3 rounded-[20px] border-none outline-none resize-none'
                                name="inputMessage" id="inputMessage" placeholder='Nhập tin nhắn' rows={1}
                                onInput={handleInput}
                                onFocus={handleFocus}
                                value={messageInput} onChange={e => setMessageInput(e.target.value)}
                                onKeyDown={handleKeyDown} />

                            <div onClick={sendMessage}>
                                <LuSendHorizonal className="fill-yellow-400 w-[25px] h-[20px]" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}