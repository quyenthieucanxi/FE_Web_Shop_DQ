import React, {MouseEvent} from "react";
export const SIZE_BUTTON  = {
   small : "px-2 py-1",
   medium: "px-3 py-2",
   large: "px-4 py-3",
}

export const TYPE_BUTTON = {
    default : "bg-orange-400 text-white ",
    primary : "bg-white text-[#f80] ",
    secondary : "bg-green-600 hover:bg-white hover:text-green-600",
}

interface Props {
    typeProp? : 'button' | 'submit' | 'reset' ;
    type?: string;
    size?: string;
    className?: string;
    childern: React.ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    disabled? : boolean;
        
}

export default function Button ( { typeProp = "button", type="default", size="medium",className,childern,onClick,disabled= false } : Props) {
    return (
        <>
            <button  type={typeProp} className={`w-full flex justify-center border border-solid text-base border-[#f80] rounded ${SIZE_BUTTON[size]} ${TYPE_BUTTON[type]} ${className}`} 
            onClick={onClick} disabled={disabled} >{childern}
            </button>
        </>
    )
}