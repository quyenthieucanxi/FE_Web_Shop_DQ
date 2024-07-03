
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { CalculateTimePassedAsync, ConvertToDDMMYYYY } from "@/utils/DateHelper";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";



interface Props {
    notify: Notity;
    innerRef?: React.Ref<HTMLParagraphElement>;

}

export default function Notify({ notify, innerRef, }: Props) {
    const queryClient = useQueryClient()
    const axiosAuth = useAxiosAuth()
    const [isRead,setIsRead ] =  useState(notify?.isRead)
    const handleUpdateIsReadNotify = async (notifyId : string) => {
        if (notify?.isRead == true)
        {
            return
        }
        try {
            const { data: response }: { data: Response } = await axiosAuth.put(`/api/Notify/UpdateIsRead/${notifyId}`)
            queryClient.invalidateQueries({ queryKey: ["countNotifysIsNotRead"] });
            setIsRead(true)
        } catch (error) {
            
        }
    }
    return (
        <div onClick={() => handleUpdateIsReadNotify(notify?.id)} className={`flex items-center border-solid border-b p-2 ${!notify.isRead ? "bg-[#fff0d9]" : ""}`} ref={innerRef}>
            <img className='rounded-[50%] w-[60px] h-[60px]' src={notify?.userSender?.avatarUrl} alt="img" />
            <div className='ml-2'>
                <p className="">{notify.notifyText}</p>
                <span className="text-xs leading-5 text-gray-500">{CalculateTimePassedAsync(notify?.createdTime)}</span>
                
            </div>
        </div>
    )
}