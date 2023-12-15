import { Order } from "@/types/order";
import { ConvertToDDMMYYYY } from "@/utils/DateHelper";
import { FormatCurrencyVND } from "@/utils/StringHelper";


interface Props {
    order: Order,
}

export default function Order(props: Props) {
    return (
        <div className='mx-auto max-w-[960px] bg-white border rounded-md p-3 gap-3 mb-2'>
            <div className="flex items-center mb-2">
                <div className="flex items-center rounded-[50%] h-6 w-6 border-1 border-slate-600">
                    <img className="w-full rounded-[50%]"
                        src={props.order?.product?.user?.avatarUrl} alt="img" />
                </div>
                <div className="flex justify-between w-full ml-2">
                    <div className="text-sm font-bold">{props.order?.product?.user?.fullName}</div>
                </div>
            </div>
            <div className="flex gap-3 w-full">
                <div className=" h-20 w-32 min-w-[80px] rounded md:h-36 md:w-[250px] md:min-w-[250px]">
                    <img src={props.order?.product?.urlImage} alt="" className="h-full w-full rounded object-cover" />
                </div>
                <div className="ml-12 overflow-hidden flex w-full">
                    <div className='w-[60%]'>
                        <div className="overflow-hidden text-ellipsis whitespace-nowrap md:font-bold ">{props.order?.product?.title}</div>
                        <div>
                            <span className="font-bold text-red-500 md:text-base ">Giá: {FormatCurrencyVND(props.order?.product?.price)}</span>
                        </div>
                        <div className="hidden md:block">
                            <span className="text-xs text-gray-400">Số lượng: {props.order?.quantity} </span>
                        </div>
                        <div>
                            <span className="text-xs leading-5 text-gray-500">Ngày đặt hàng: <span className="text-gray-900">{ConvertToDDMMYYYY(props.order?.createdTime)}</span>
                            </span>
                        </div>
                    </div>
                    <div className='w-[40%]'>
                        <div>Địa chỉ nhận hàng</div>
                        <div className="flex text-sm font-normal">
                            {props.order?.recipientName} &nbsp;<p>| &nbsp;{props.order?.phone}</p>
                        </div>
                        <div className="text-[#777] text-sm font-normal mt-2">
                            {props.order?.addressShipping} 
                        </div>
                        <div>Thành tiền: {FormatCurrencyVND(props.order?.totalPrice.toString())}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}