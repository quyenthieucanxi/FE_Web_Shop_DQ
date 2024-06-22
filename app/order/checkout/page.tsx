"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdEventNote } from "react-icons/md";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import Button from "@/components/Button";
import ModalAddressOrder from "@/components/ModalAddressOrder";
import { GetPostById } from "@/services/PostService";
import { FormatCurrencyVND } from "@/utils/StringHelper";
import { useSession } from "next-auth/react";
import { getDistrist, getFeeShipping, getProvince } from "@/services/ProvincesService";
import { toast } from "react-toastify";
import Toast from "@/components/Toast";


export default function CheckoutOrderPage() {
    const axiosAuth = useAxiosAuth()
    const { data: session } = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()
    const itemsKeys = searchParams.get("itemKeys")
    const quantity = Number.parseInt(searchParams.get("quantity"))


    const [note, setNote] = useState("")
    const onChangeNote = (e) => {
        setNote(e.target.value)
    }
    const [isModalAddressOpen, setIsModalAddressOpen] = useState(false)
    const openModalAddress = () => {
        setIsModalAddressOpen(true);
    };

    const closeModalAddress = () => {
        setIsModalAddressOpen(false);
    };
    const [selectedAddress, setSelectedAddress] = useState(null);
    const onSubmitAddress = (address: string) => {
        setSelectedAddress(address);
        closeModalAddress();
    }
    const [provinces, setProvinces] = useState([]);
    useEffect(() => {
        const fetchProvinces = async () => {
            const res = await getProvince()
            setProvinces(res.data)
        }
        fetchProvinces()
    }, [])

    //get AddressShippingDefault 
    const [addressDefaut, setAddressDefaut] = useState(null);
    useEffect(() => {
        const fetchDataDefault = async () => {
            if (session) {
                try {
                    const res = await axiosAuth.get(`api/User/GetAddressShoppingDeFault`)
                    setAddressDefaut(res.data.data)
                }
                catch (error) {

                }
            }
        }
        fetchDataDefault()
    }, [session?.user?.accessToken])
    const province = provinces.find(province => province.ProvinceName === addressDefaut?.province)
    const [districtID, setDistrictID] = useState(0);
    useEffect(() => {
        const fetchdistristOfProvince = async () => {
            const distrist = await getDistrist(province?.ProvinceID)
            distrist.data.forEach(dis => {
                if (dis.DistrictName === addressDefaut?.distrist)
                    setDistrictID(Number.parseInt(dis.DistrictID));
            })
        }
        fetchdistristOfProvince()
    }, [addressDefaut])
    //Change the selected address
    const onSubmitAddressShipping = (addRessShipping: Object) => {
        setAddressDefaut(addRessShipping)
        closeModalAddress();
    }
    //get Items Order
    const [post, setPost] = useState(null);
    useEffect(() => {
        const fetchDataItem = async () => {
            const res = await GetPostById(itemsKeys);
            setPost(res.data)
        }
        fetchDataItem();
    }, [])
    //feeShipping
    const [fee, setFee] = useState(0);
    useEffect(() => {
        const fetchFeeShipping = async () => {
            try {
                if (districtID !== 0) {
                    const res = await getFeeShipping({ from_district_id: 3695, to_district_id: districtID });
                    setFee(res.data.total);
                }
            } catch (error) {
                console.error("Error fetching fee:", error);
            }
        };
        fetchFeeShipping();
    }, [districtID]);
    // handleOrder 
    const [selectedShip, setSelectedShip] = useState("Giao Hàng Nhanh");
    const onChangeShip = (e) => {
        setSelectedShip(e.target.value)
    }

    const [selectedPayment, setSelectedPayment] = useState("Thanh toán khi nhận hàng");
    const onChangePayment = (e) => {
        setSelectedPayment(e.target.value);
    }
    const totalPrice = quantity * Number.parseInt(post?.price) + fee;
    const handleOrder = async () => {
        const order = {
            productId: post?.id,
            addressShippingID: addressDefaut?.id,
            quantity: quantity,
            totalPrice: totalPrice,
            payment: "Chờ thanh toán",
            note: note,
        }
        if (selectedPayment === "Thanh toán khi nhận hàng") {
            try {
                const res = await axiosAuth.post(`/api/Order/Create`, order)
                toast.success("Đặt hàng thành công", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            } catch (error) {
                toast.error(error.response?.data.message, {
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
        else {
            try {
                const res = await axiosAuth.post(`/api/Order/CreateUrlPayment`,order)
                const response : Response = res.data
                router.push(response.data.toString())
            } catch (error) {   
                toast.error(error.response?.data.message, {
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
    }
    return (
        <div className="max-w-[636px] mt-20 mx-auto">
            <Toast />
            <div id="modal_AddressOrder">
                <ModalAddressOrder isModalOpen={isModalAddressOpen} isCloseModal={closeModalAddress} onSubmitAddress={onSubmitAddress} onSubmitAddressShipping={onSubmitAddressShipping} />
            </div>
            <div id="modal_address">

            </div>
            <div className="bg-white p-4">
                <h4 className="font-bold text-lg ">Xác nhận đơn hàng</h4>
                <div className="flex justify-between border-t py-4 mt-4">
                    <span className="text-base font-semibold flex items-center gap-1 "> <CiLocationOn className="font-bold" />Địa chỉ Người nhận</span>
                    <button onClick={openModalAddress} className=" text-blue-500 font-bold">
                        THAY ĐỔI
                    </button>
                </div>
                {
                    !!addressDefaut && <>
                        <div className="flex text-sm font-normal">
                            {addressDefaut?.recipientName} &nbsp;<p>| &nbsp;{addressDefaut?.phone}</p>
                        </div>
                        <div className="text-[#777] text-sm font-normal mt-2">
                            {`${addressDefaut?.addressDetail}, ${addressDefaut?.distrist}, ${addressDefaut?.province}`}
                        </div>
                    </>
                }
                {
                    !!!addressDefaut &&
                    <button onClick={openModalAddress} className="px-2 text-sm bg-slate-200 my-2">
                        Chọn địa chỉ nhận hàng
                    </button>
                }
            </div>
            <div className="bg-white mt-4 p-4">
                <div className="flex gap-3 items-center">
                    <div className="flex items-center rounded-[50%] h-6 w-6 border-1 border-slate-600">
                        <img className="w-full rounded-[50%]"
                            src={`${post?.user?.avatarUrl}`} alt="img" />
                    </div>
                    <div className="flex justify-between w-full">
                        <div className="text-sm font-bold">{post?.user?.fullName}</div>
                        <img className="w-[24px] h-[24px]" src="https://static.chotot.com/storage/chotot-icons/png/house.png" alt="" height="20px" />
                    </div>
                </div>
                <div className="flex mt-2 gap-2">
                    <div>
                        <img className="h-[64px] w-[64px] object-cover rounded-sm" src={post?.urlImage} alt="img" />
                    </div>
                    <div className="flex-col">
                        <p className="text-sm font-normal mb-1">{post?.title}</p>
                        <p className="text-[#d0021b] font-semibold text-sm ">{FormatCurrencyVND((quantity * Number.parseInt(post?.price)).toString())}</p>
                        <p className="text-sm font-normal mt-1">Số lượng: {quantity}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white mt-4 p-4">
                <div className="flex gap-2 mb-3">
                    <img src="https://static.chotot.com/storage/escrow/icons/delivery_dining_v2.svg" alt="" />
                    <span className="text-base font-bold">Phương thức Giao hàng</span>
                </div>
                <div className="flex justify-between items-center py-4 gap-2">
                    <div className="w-[20px]">
                        <label htmlFor="ship" className="relative w-full h-20px cursor-pointer">
                            <input onChange={onChangeShip} className=" w-0 h-0 invisible" type="radio" name="address" id="ship" value="Giao Hàng Nhanh" checked={selectedShip === "Giao Hàng Nhanh"} />
                            <span className={`text-[#f80] bg-[#f4f4f4] border-[#c0c0c0] border border-solid absolute top-0 rounded-[100%] h-[20px] w-[20px] ${selectedShip === "Giao Hàng Nhanh" ? "bg-current  after:content-[''] after:absolute after:top-[5px] after:left-[5px] after:w-[8px] after:h-2 after:bg-white after:rounded-[100%]" : ""} `} >
                            </span>
                        </label>
                    </div>
                    <div className="flex-1 text-sm">Giao Hàng Nhanh</div>
                    {/* <button className=" text-blue-500 font-bold">
                        THAY ĐỔI
                    </button> */}
                </div>
            </div>
            <div className="bg-white mt-4 p-4">
                <div className="flex gap-2 mb-3">
                    <img src="https://static.chotot.com/storage/escrow/icons/payment_method_v2.svg" alt="" />
                    <span className="text-base font-bold">Phương thức Thanh Toán</span>
                </div>
                <div className="py-4">
                    <div className="flex justify-between items-center gap-2 mb-3">
                        <div className="w-[20px]">
                            <label htmlFor="payment-delivery" className="relative w-full h-20px cursor-pointer">
                                <input onChange={onChangePayment} className=" w-0 h-0 invisible" type="radio" name="payment" id="payment-delivery" checked={selectedPayment === "Thanh toán khi nhận hàng"} value="Thanh toán khi nhận hàng" />
                                <span className={`text-[#f80] bg-[#f4f4f4] border-[#c0c0c0] border border-solid absolute top-0 rounded-[100%] h-[20px] w-[20px] ${selectedPayment === "Thanh toán khi nhận hàng" ? "bg-current  after:content-[''] after:absolute after:top-[5px] after:left-[5px] after:w-[8px] after:h-2 after:bg-white after:rounded-[100%]" : ""} `} >
                                </span>
                            </label>
                        </div>
                        <div className="flex-1 text-sm">Thanh toán khi nhận hàng</div>
                    </div>
                    <div className="flex justify-between items-center gap-2 mb-3">
                        <div className="w-[20px]">
                            <label htmlFor="payment-VNPay" className="relative w-full h-20px cursor-pointer">
                                <input onChange={onChangePayment} className=" w-0 h-0 invisible" type="radio" name="payment" id="payment-VNPay" checked={selectedPayment === "Thanh toán bằng VNPay"} value="Thanh toán bằng VNPay" />
                                <span className={`text-[#f80] bg-[#f4f4f4] border-[#c0c0c0] border border-solid absolute top-0 rounded-[100%] h-[20px] w-[20px] ${selectedPayment === "Thanh toán bằng VNPay" ? "bg-current  after:content-[''] after:absolute after:top-[5px] after:left-[5px] after:w-[8px] after:h-2 after:bg-white after:rounded-[100%]" : ""} `} >
                                </span>
                            </label>
                        </div>
                        <div className="flex-1 text-sm">Thanh toán bằng VNPay</div>
                    </div>

                    {/* <button className=" text-blue-500 font-bold">
                        THAY ĐỔI
                    </button> */}
                </div>
            </div>
            <div className="bg-white mt-4 p-4">
                <div className="text-base font-bold mb-3">Thông tin Thanh toán</div>
                <div className="mb-3 flex justify-between">
                    <p>Số tiền</p>
                    <p>{FormatCurrencyVND((quantity * Number.parseInt(post?.price)).toString())}</p>
                </div>
                <div className="mb-3 flex justify-between">
                    <p>Phí giao hàng</p>
                    <p>{FormatCurrencyVND(fee.toString())}</p>
                </div>
                <div className="h-[1px] w-full border border-dashed border-[#222222] my-3">
                </div>
                <div className="mb-6 flex justify-between">
                    <p>Tổng thanh toán</p>
                    <p>{FormatCurrencyVND(totalPrice.toString())}</p>
                </div>
                <div className="flex items-center gap-2 my-3 text-base font-semibold">
                    <MdEventNote />
                    Ghi chú
                </div>
                <div className="relative border border-solid border-[#c0c0c0] rounded-sm h-[76px]">
                    <div className="cursor-text h-[30px]"></div>
                    <textarea className="w-full rounded-sm px-3 pb-1 pt-[7px] border-none outline-none h-[40px] resize-none " name="" id="" value={note} onChange={onChangeNote}></textarea>
                    <label className="absolute top-[11px] left-[13px] cursor-text text-sm text-[#8c8c8c]" htmlFor="overview">Nhập ghi chú cho người bán</label>
                </div>
            </div>
            <div className="bg-white mt-4 p-4 flex items-center justify-between ">
                <div className=" w-full">
                    <p className="text-[10px] text-[#9b9b9b] font-bold">TỔNG CỘNG:<br /><b className="text-[18px] font-bold text-black">{FormatCurrencyVND(totalPrice.toString())}</b></p>
                </div>
                <Button onClick={handleOrder} size="medium" childern="ĐẶT HÀNG" />
            </div>
        </div>
    )
}