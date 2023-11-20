interface InputProps {
    label : string,
    type : string,
    text : string,
    placeholder? : string,
    className? : string,
    classNamelable ? : string,
    error?: string,
}
export default function Input({label, type,text, placeholder,className,classNamelable,error= null}: InputProps) {
    return (
        <div className="space-y-2">
            <label htmlFor={label} className={`block text-sm font-medium text-gray-600 ${classNamelable}` }>
                {text}
            </label>
            <input
                type={type}
                id={label}
                name={label}
                placeholder= {placeholder}
                min="1" max="100"
                required
                className={`w-full px-3 py-2 border border-solid border-gray-300 rounded-md focus:outline-none focus:border-blue-300 `} 
            />
            {
                error &&  <p className="text-[#e5193b] ml-3 text-[10px]">{error}</p>
            }
            
        </div>
    )

}