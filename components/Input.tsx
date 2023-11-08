interface InputProps {
    label : string,
    type : string,
    text : string
}
export default function Input({label, type,text}: InputProps) {
    return (
        <div className="space-y-2">
            <label htmlFor={label} className="block text-sm font-medium text-gray-600">
                {text}
            </label>
            <input
                type={type}
                id={label}
                name={label}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
        </div>
    )

}