import { ClassNames } from "@emotion/react";
import { ChangeEventHandler } from "react";

interface InputProps {
    label: string,
    type: string,
    text: string,
    placeholder?: string,
    className?: string,
    classNamelable?: string,
    error?: string,
    textarea?: boolean,
    value?: string,
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
}
export default function Input({ label, type, text, placeholder, className, classNamelable, error = null, textarea = false, value, onChange }: InputProps) {
    return (
        <div className="space-y-2 w-full">
            <label htmlFor={label} className={`block text-sm font-medium text-gray-600 ${classNamelable}`}>
                {text}
            </label>
            {
                textarea ? <textarea
                    id={label}
                    name={label}
                    placeholder={placeholder}
                    value={value}
                    required
                    onChange={onChange}
                    className={`w-full px-3 py-2 border border-solid border-gray-300 rounded-md focus:outline-none focus:border-blue-300 ${className ?? ""}`}
                /> : <input
                    type={type}
                    name={label}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    min="1" max="100"
                    required
                    className={`w-full px-3 py-2 border border-solid border-gray-300 rounded-md focus:outline-none focus:border-blue-300 ${className ?? ""} `}
                />
            }

            {
                error && <p className="text-[#e5193b] ml-3 text-[10px]">{error}</p>
            }

        </div>
    )

}