

"use client";
import { IoIosClose } from "react-icons/io";
import { useRef, useState } from 'react';
import Modal from 'react-modal';
import Order from "./Order";
import { Order as OrderType } from "@/types/order";
import Button, { SIZE_BUTTON } from "./Button";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { FormatCurrencyVND } from "@/utils/StringHelper";
import Star from "./Star";
import Toast from "./Toast";
import { toast } from "react-toastify";



const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(34, 34, 34, 0.3)',
    },
    content: {
        top: '55%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        zIndex: 100,
        padding: '-20px',
        maxWidth: '636px',
        width: '100%',

    },
};



interface Props {
    isModalOpen: boolean;
    isCloseModal: () => void;
    order: OrderType;
}
export default function ModalOrderReview({ isModalOpen, isCloseModal, order }: Props) {
    const axiosAuth = useAxiosAuth();
    const [rating, setRating] = useState(5);

    const handleClickStar = (star) => {
        setRating(star);
    };
    const inputReview = useRef(null)
    const handleReview = async (orderID: string) => {
        try {
            const { data: res }: { data: Response } = await axiosAuth.post(`/api/OrderReview/Create`, {
                orderId: orderID,
                rating: rating,
                reviewText: inputReview.current.value,
            })
            toast.success("Cập nhập thông tin thành công", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            isCloseModal()
        } catch (error) {
            console.error(error);
            toast.error("Đánh giá thất bại", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })  
        }

    }
    return (
        <div id="modalOrderReview">
            <Toast />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={isCloseModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="flex items-center justify-between h-10 bg-slate-100 ">
                    <button onClick={isCloseModal} className="ml-[10px]" >
                        <IoIosClose className="w-8 h-8" />
                    </button>
                    <h5 className="text-base font-bold">Đánh giá sản phẩm</h5>
                    <button className="invisible" ></button>
                </div>
                <div className="flex p-5">
                    <div className="w-[30%]">
                        <img src={order?.products[0]?.urlImage} alt="" className="h-full w-full rounded object-cover" />
                    </div>
                    <div className="ml-6">
                        <p>{order?.products[0]?.title}</p>
                        <div>
                            <span className="font-bold text-red-500 md:text-base ">Giá: {FormatCurrencyVND(order?.products[0]?.price)}</span>
                        </div>
                        <div className="hidden md:block">
                            <span className="text-xs text-gray-400 font-normal">Số lượng: {order?.quantity} </span>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className="flex p-4 items-center">
                    <p className=" min-w-[180px]">Chất lượng sản phẩm</p>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, index) => {
                            const starValue = index + 1;
                            return (
                                <Star starValue={starValue} rating={rating} handleClick={handleClickStar} height={12} weight={12} />
                            );
                        })}
                    </div>
                </div>
                <div className="py-6 px-4">
                    <div className="relative border border-solid border-[#c0c0c0] rounded-sm h-[76px]">
                        <div className="cursor-text h-[30px]"></div>
                        <textarea ref={inputReview} className="w-full rounded-sm px-3 pb-1 pt-[7px] border-none outline-none h-[40px] resize-none " name="review" id="review" ></textarea>
                        <label className="absolute top-[11px] left-[13px] cursor-text text-sm text-[#8c8c8c]" htmlFor="review">Nhập đánh gía cho người bán</label>
                    </div>
                </div>
                <div className="flex justify-end  p-4 space-x-4">
                    <Button type="primary" onClick={isCloseModal} className="mt-4 w-[20%] " childern={`Trở lại`} ></Button>
                    <Button onClick={() => handleReview(order.id)} className="mt-4 w-[20%]" childern={`Hoàn thành`} ></Button>
                </div>

            </Modal>
        </div>
    )
}