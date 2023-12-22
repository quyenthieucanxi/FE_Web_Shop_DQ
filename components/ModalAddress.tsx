"use client";
import { IoIosClose } from "react-icons/io";
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useSession } from "next-auth/react";
import Modal from 'react-modal';
import { FaCaretDown } from "react-icons/fa6";
import Input from "./Input";
import { getDistrist, getProvince, getProvinces } from "@/services/ProvincesService";
import Button from "./Button";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";


// Modal.setAppElement('#modal_address');

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
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        zIndex: 9999,
        padding: '-20px',
        maxWidth: '500px',
        width: '100%',

    },
};

interface Props {
    isModalOpen: boolean;
    isCloseModal: () => void;
    onSubmitAddress?: (address: string) => void;
    title: string;
    isShipping?: boolean;
    initData?: any;
    onSubmitAdressByAddOrUpdate?: (address: object) => void;
}
export default function ModalAddress({ isModalOpen, isCloseModal, onSubmitAddress, title, isShipping = false, initData, onSubmitAdressByAddOrUpdate }: Props) {
    const axiosAuth = useAxiosAuth();
    const { data: session } = useSession();
    const [provinces, setProvinces] = useState(null);
    const [districts, setDistricts] = useState(null);
    const provinceSelectRef = useRef<HTMLSelectElement>(null);
    useEffect(() => {
        const fetchProvinces = async () => {
            const res = await getProvince();
            setProvinces(res.data);
        };
        fetchProvinces();
    }, []);
    const [receiptNameText, setReceiptNameText] = useState((session?.user?.name || ""))
    const [phone, setPhone] = useState((session?.user?.phone || ""))
    const [provinceText, setProvinceText] = useState("");
    const [districtText, setDistrictText] = useState("");
    const [addressDetailText, setAddressDetailText] = useState("");
    useEffect(() => {
        setReceiptNameText(initData?.recipientName ?? (session?.user?.name || ""));
        setPhone(initData?.phone ?? (session?.user?.phone || ""));
        setProvinceText(initData?.province ?? "");
        setDistrictText(initData?.distrist ?? "");
        setAddressDetailText(initData?.addressDetail ?? "");
    }, [initData, session]);
    const handleChangeProvince = async (e) => {
        // const selectedOption = e.target.value;
        //const districts = await getDistrist(Number.parseInt(selectedOption));
        setProvinceText(provinceSelectRef.current.options[provinceSelectRef.current.selectedIndex].text)
        //setDistricts(districts.data);
    }
    useEffect(() => {
        const fetchDistrict = async () => {
            const districts = await getDistrist(Number.parseInt(provinceSelectRef.current?.value));
            setDistricts(districts.data);
        }
        fetchDistrict();
    }, [provinceSelectRef.current?.value])
    const handleChangeDistrict = (e) => {
        setDistrictText(e.target.value)
    }
    const handleAddressClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const province = provinceText
        const district = districtText
        const addressDetail = addressDetailText
        const fullAddress = `${addressDetail}, ${district}, ${province}`
        onSubmitAddress(fullAddress)
    }
    const [isDefault, setIsDefault] = useState(true)
    const handleDefault = () => {
        setIsDefault(!isDefault)
    }

    const handleAddressShippingClick = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const receiptName = receiptNameText;
        const phoneNumber = phone;
        const province = provinceText
        const district = districtText
        const addressDetail = addressDetailText

        const body = {
            recipientName: receiptName,
            phone: phoneNumber,
            province: province,
            distrist: district,
            addressDetail: addressDetail,
            isDefault: isDefault,
        }
        onSubmitAdressByAddOrUpdate(body);
    }
    return (
        <div id="modal_address">
            <Modal
                isOpen={isModalOpen}
                onRequestClose={isCloseModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className="flex items-center justify-between h-10 bg-slate-100 ">
                    <button onClick={isCloseModal} className="ml-[10px]" >
                        <IoIosClose className="w-8 h-8" />
                    </button>
                    <h5 className="text-base font-bold">{title}</h5>
                    <button className="invisible" ></button>
                </div>
                <form onSubmit={isShipping ? handleAddressShippingClick : handleAddressClick} className="p-6 max-h-[480px] overflow-y-scroll">
                    <div className="h-[380px]">
                        {
                            isShipping ?
                                <>
                                    <p className="text-sm mb-2">Vui lòng điền đúng thông tin để người bán liên hệ được với bạn</p>
                                    <div className="mb-3">
                                        <Input label="name" type="text" text="Tên người nhận" classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" value={receiptNameText} onChange={(e) => setReceiptNameText(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <Input label="phone" type="text" text="Số điện thoại" classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                </> : <></>

                        }
                        <div className="border-[#cacaca] w-full h-12  rounded border border-solid mt-6 relative cursor-pointer ">
                            <label className={` absolute top-[12px] left-[12px] cursor-text text-[#8c8c8c] text-sm capitalize after:content-['*'] after:ml-2 after:text-[#e5193b] ${provinces ? "scale(.7143) translate-y-[-10px]" : ""} `} htmlFor="province">Tỉnh, Thành Phố</label>
                            <select name="province" id="province" onChange={handleChangeProvince} ref={provinceSelectRef}
                                className="w-full h-full text-[#222] text-sm appearance-none px-3 pt-4" >
                                <option hidden value=""></option>
                                <option value={""} disabled >Chọn Tỉnh/Thành phố</option>
                                {
                                    provinces?.map((province, i) => <option key={i} value={province.ProvinceID} selected={provinceText === province?.ProvinceName}>{province?.ProvinceName}</option>)
                                }

                            </select>
                            <FaCaretDown className="absolute right-[12px] text-[#8c8c8c] h-12 top-[-1px] " />
                        </div>
                        <div className="border-[#cacaca] w-full h-12  rounded border border-solid mt-6 relative cursor-pointer ">
                            <label className={` absolute top-[12px] left-[12px] cursor-text text-[#8c8c8c] text-sm capitalize after:content-['*'] after:ml-2 after:text-[#e5193b] ${districts ? "scale(.7143) translate-y-[-10px]" : ""} `} htmlFor="district">Quận, Huyện</label>
                            <select name="district" id="district" onChange={handleChangeDistrict} className="w-full h-full text-[#222] text-sm appearance-none  px-3 pt-4" >
                                <option hidden value=""></option>
                                <option value={""} disabled >Chọn Quận/Huyện</option>
                                {
                                    districts?.map((district, i) => <option key={i} value={district.DistrictName} selected={districtText === district?.DistrictName}>{district.DistrictName}</option>)
                                }
                            </select>
                            <FaCaretDown className="absolute right-[12px] text-[#8c8c8c] h-12 top-[-1px] " />
                        </div>
                        <div className="mt-3 mb-3">
                            <Input label="addressdetail" type="text" text="Địa chỉ chi tiết" classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" value={addressDetailText} onChange={(e) => setAddressDetailText(e.target.value)} />
                        </div>
                        {
                            isShipping ?
                                <>
                                    <label htmlFor="default" className="relative w-full h-20px cursor-pointer pl-[32px] text-sm font-normal">
                                        <input onChange={handleDefault} className=" w-0 h-0 invisible" type="checkbox" name="default" id="default" value={`${isDefault}`} checked={isDefault} />
                                        <span className={`text-[#f80] bg-[#f4f4f4] border-[#c0c0c0] border border-solid rounded absolute top-0 left-0  h-[20px] w-[20px] ${isDefault ?
                                            `bg-current after:content-[''] after:absolute after:top-[2px] after:left-[6px] after:w-[7px] after:h-[11px] after:transform  after:rotate-45  after:border-r-2  after:border-solid after:border-[#fff] after:border-b-2` : ""} `}>
                                        </span>
                                        Đặt làm địa chỉ mặc định
                                    </label>
                                    <div className="flex justify-end gap-2 mt-4 pb-4">
                                        <Button onClick={isCloseModal} type="primary" typeProp="submit" childern="ĐÓNG" />
                                        <Button typeProp="submit" childern="XÁC NHẬN" />
                                    </div>
                                </>
                                :
                                <Button typeProp="submit" className="mt-4" childern="XONG" />
                        }
                    </div>
                </form>
            </Modal>
        </div>
    )
}