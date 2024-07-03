import useAxiosAuth from "@/libs/hooks/useAxiosAuth"
import { CalculateTimePassedAsync } from "@/utils/DateHelper"
import { useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"



interface Props {
    user: User,
    chat: Chat
}

export default function ItemChat({ user, chat }: Props) {
    const { data : session} = useSession()
    const queryClient = useQueryClient()
    const axiosAuth = useAxiosAuth()
    const [isRead,setIsRead ] =  useState(chat?.isReceiverRead)
    const hanldeIsRead = async () => {
        if (chat?.isReceiverRead == true)
        {
            return
        }
        try {
            const res = await axiosAuth.put(`/api/Chats/UpdateIsRead/${chat?.id}`)
            queryClient.invalidateQueries({ queryKey: ["countChatsIsNotRead"] })
            setIsRead(true)
        } catch (error) {
            
        }
    }
    return (
        <Link href={`/chat/${user?.url}`} className='flex hover:bg-gray-200 py-3 cursor-pointer' onClick={hanldeIsRead}>
            <div className='mr-3 relative'>
                <img className='rounded-[50%] w-[48px] h-[48px]' src={user?.avatarUrl} alt={user?.fullName} />
                {   
                    !isRead && session?.user.url !== chat?.sender?.url ? 
                    <span className="flex justify-center items-center rounded-[50%] text-xs text-white absolute bg-red-500 w-[20px] h-[20px] right-[6px] top-[-4px] border-[0.5px] border-solid border-white">1</span>
                    : ""
                }
            </div>
            <div className=''>
                <span className='text-sm font-medium'>{user?.fullName}</span>
                <span className='text-xs'> -  {CalculateTimePassedAsync(chat?.createdTime)} </span>
                <p className='font-bold text-gray-400 text-xs mt-1'>{chat?.messages}</p>
            </div>
        </Link>
    )
}