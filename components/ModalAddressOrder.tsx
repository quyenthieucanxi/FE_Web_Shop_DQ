"use client";
import { IoIosClose } from "react-icons/io";
import { FormEvent, Fragment, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { FaCaretDown } from "react-icons/fa6";

import Button from "./Button";
import ModalAddress from "./ModalAddress";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";



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
        zIndex: 100,
        padding: '-20px',
        maxWidth: '500px',
        width: '100%',

    },
};

interface Props {
    isModalOpen: boolean;
    isCloseModal: () => void;
    onSubmitAddress: (address: string) => void;
    onSubmitAddressShipping? : (address: Object) => void;
}
export default function ModalAddressOrder({ isModalOpen, isCloseModal, onSubmitAddress, onSubmitAddressShipping }: Props) {
    const axiosAuth = useAxiosAuth();
    const { data: session } = useSession();
    const [addRessShipping, setAddressShipping] = useState(null);
    const [isAction, setIsAction] = useState(false);
    const handleAction = () => {
        setIsAction(!isAction)
    }
    const [isOpenModalAddresses, setIsOpenModalAddresses] = useState(false);
    const [openOptionsMap, setOpenOptionsMap] = useState({});
    const optionsRef = useRef(null);
    const toggleList = (addressId) => {
      setOpenOptionsMap((prevMap) => ({
        ...prevMap,
        [addressId]: !prevMap[addressId],
      }));
    };
    const openModalAddress = () => {
        setIsOpenModalAddresses(true);
    };

    const closeModalAddress = () => {
        setIsOpenModalAddresses(false);
    };
    useEffect(() => {
        const getAddressShipping = async () => {
            if (session) {
                const res = await axiosAuth.get(`/api/User/GetAddressShopping`)
                setAddressShipping(res.data.data)
                setAddressSelect(res.data.data?.listAddressShipping?.find(address => address.isDefault))
            }
        }
        getAddressShipping()
    }, [session?.user?.accessToken,isAction])

    const removeAddressShipping = async (addressId: string) => {
        try {
            await axiosAuth.delete(`/api/User/RemoveAddressShopping?addressShippingId=${addressId}`)
            handleAction()
        }
        catch (err) {

        }
    }
    const [addressUpdate,setAddressUpdate] = useState(null)
    const updateAddressShippingClick =  (addressId : string) => {
        const addr = addRessShipping?.listAddressShipping.find(addr => addr.id === addressId)
        setAddressUpdate(addr)
        openModalAddress(); 
    }
    const onSubmitAdressByAddOrUpdate = async (address : object) => {
        try {
            if (addressUpdate )
            {
                await axiosAuth.put(`/api/User/UpdateAddressShopping?addressShippingId=${addressUpdate?.id}`,address)
            }
            else {
                await axiosAuth.post(`/api/User/AddAddressShipping`,address)
            } 
            closeModalAddress()
            setAddressUpdate(null)
            handleAction()
        } catch (error) {
            console.error(error)
        }

    }
    const setAddressDefault =  async (addressId: string) => {
        try {
            await axiosAuth.put(`/api/User/SetAddressShopping?addressShippingId=${addressId}`)
            handleAction()
        }
        catch (error) {

        }
    }
    const [addressSelect, setAddressSelect] = useState(null);
    const handleRadioChange = (event, address) => {
        setAddressSelect(address);
    };
    const handleSelectClick = (e) => {
        onSubmitAddressShipping(addressSelect)
    }
    useEffect(() => {
        const closeOptions = () => {
            setOpenOptionsMap({});
          };
        const handleClickOutside = (event) => { 
          if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            closeOptions();
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={isCloseModal}
            style={customStyles}    
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div id="modal_address">
                <ModalAddress isModalOpen={isOpenModalAddresses} isCloseModal={closeModalAddress} onSubmitAddress={onSubmitAddress} title="Địa chỉ nhận hàng" isShipping={true} initData={addressUpdate} onSubmitAdressByAddOrUpdate={onSubmitAdressByAddOrUpdate}/>
            </div>
            <div className="flex items-center justify-between h-10 bg-slate-100 ">
                <button onClick={isCloseModal} className="ml-[10px]" >
                    <IoIosClose className="w-8 h-8" />
                </button>
                <h5 className="text-base font-bold">Địa chỉ nhận hàng</h5>
                <button className="invisible" ></button>
            </div>
            <div className="max-h-[480px] px-6">
                <div className="py-3 rounded h-[320px] overflow-y-scroll">
                    {
                        addRessShipping?.listAddressShipping?.map((address, i) => {
                            const isOpen = openOptionsMap[address.id] || false;
                            return (
                                <Fragment key={i}>
                                    <div className="flex items-start mb-[14px]">
                                        <div className="w-[20px]">
                                            <label htmlFor={`address_${address.id}`} className="relative w-full h-20px cursor-pointer">
                                                <input onChange={(e) => handleRadioChange(e, address)} className=" w-0 h-0 invisible" type="radio" name="address" id={`address_${address.id}`} value={address.id} checked={addressSelect && addressSelect.id === address.id} />
                                                <span className={`text-[#f80] bg-[#f4f4f4] border-[#c0c0c0] border border-solid absolute top-0 rounded-[100%] h-[20px] w-[20px] ${ ( addressSelect && addressSelect?.id === address.id ) ? `bg-current  after:content-[''] after:absolute after:top-[5px] after:left-[5px] after:w-[8px] after:h-2 after:bg-white after:rounded-[100%]` : ""} `} >
                                                </span>
                                            </label>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm mb-[12px]"><b>&nbsp;&nbsp;{address.recipientName}</b>&nbsp;&nbsp;{address.phone}</p>
                                            <p className="text-sm mb-[12px]">
                                                {`${address.addressDetail}, ${address.distrist}, ${address.province}`}
                                            </p>
                                            {
                                                address.isDefault && <span className="bg-[#eff6ff] text-[#2275d3] text-sm py-[6px] px-[10px]">Địa chỉ mặc định</span>
                                            }
                                            
                                        </div>
                                        <div className="relative">
                                            <button onClick={() => toggleList(address.id)}>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="2" r="2" transform="rotate(90 8 2)" fill="#222222"></circle><circle cx="8" cy="8" r="2" transform="rotate(90 8 8)" fill="#222222"></circle><circle cx="8" cy="14" r="2" transform="rotate(90 8 14)" fill="#222222"></circle></svg>
                                            </button>
                                            {
                                                isOpen &&
                                                <ul ref={optionsRef} className=" list-none bg-white shadow absolute min-w-[160px] z-[1] right-[10px] cursor-pointer">
                                                    <li onClick={() => updateAddressShippingClick(address.id)} className="py-3 px-4 text-[#000] no-underline text-sm font-normal hover:bg-[#f8f8f8]"><button>Chỉnh sửa</button></li>
                                                    {   
                                                        !address.isDefault &&
                                                        <>
                                                            <li onClick={() => setAddressDefault(address.id)} className="py-3 px-4 text-[#000] no-underline text-sm font-normal hover:bg-[#f8f8f8]"><button>Đặt làm mặc định</button></li>
                                                            <li onClick={() => removeAddressShipping(address.id)} className="py-3 px-4 text-[#000] no-underline text-sm font-normal hover:bg-[#f8f8f8]"><button>Xoá</button></li>
                                                        </>
                                                    }
                                                </ul>
                                            }

                                        </div>
                                    </div>
                                    <hr className="my-[14px] h-[1px]"></hr>
                                </Fragment>
                            )
                        })
                    }
                    <Button type="primary" className="flex items-center" onClick={openModalAddress}
                        childern={(
                            <>
                                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.5 8H8.5V13C8.5 13.55 8.05 14 7.5 14C6.95 14 6.5 13.55 6.5 13V8H1.5C0.95 8 0.5 7.55 0.5 7C0.5 6.45 0.95 6 1.5 6H6.5V1C6.5 0.45 6.95 0 7.5 0C8.05 0 8.5 0.45 8.5 1V6H13.5C14.05 6 14.5 6.45 14.5 7C14.5 7.55 14.05 8 13.5 8Z" fill="#FE9900"></path>
                                </svg>&nbsp;
                                {' Thêm địa chỉ mới'}
                            </>
                        )} />
                </div>
            </div>
            <div className="px-6 mb-4">
                <Button onClick={handleSelectClick} typeProp="button" className="mt-4" childern="Chọn" />
            </div>
            
            
        </Modal>
    )
}