import React, {MouseEvent} from "react";
export const SIZE_BUTTON  = {
   small : "px-2 py-1",
   medium: "px-3 py-2",
   large: "px-4 py-3",
}

export const TYPE_BUTTON = {
    default : "bg-orange-400 text-white hover:bg-white hover:text-[#f80]",
    primary : "bg-white text-[#f80] hover:bg-orange-400 hover:text-white",
    secondary : "bg-red-500 hover:bg-red-600"
}

interface Props {
    typeProp? : 'button' | 'submit' | 'reset' ;
    type?: string;
    size?: string;
    className?: string;
    childern: React.ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
        
}

export default function Button ( { typeProp = "button", type="default", size="medium",className,childern,onClick } : Props) {
    return (
        <>
            <button type={typeProp} className={`w-full flex justify-center border border-solid text-base border-[#f80] rounded ${SIZE_BUTTON[size]} ${TYPE_BUTTON[type]} ${className}`} 
            onClick={onClick} >{childern}
            </button>
        </>
    )
}