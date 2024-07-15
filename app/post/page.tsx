"use client";
import ModalCat from "@/components/ModalCat"
import { CiCamera } from "react-icons/ci";
import { BsPlus } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { useState, useRef, FormEvent } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import useAxiosAuth from "@/libs/hooks/useAxiosAuth";
import { ValidateInput, ValidateInputPrice, ValidateInputQuantity } from "@/utils/TestHelper";
import Toast from "@/components/Toast";
import { toast } from "react-toastify";
import axios from "@/libs/axios";
import { convertToVND, makeSlug } from "@/utils/StringHelper";
import ModalAddress from "@/components/ModalAddress";
import { useSession } from "next-auth/react";

export default function PostPage() {
    const axiosAuth = useAxiosAuth();
    const {data: session} = useSession();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [selectedCategory, setSelectedCategory] = useState(null);
    const onSelectCategory = (category: any) => {
        setSelectedCategory(category);
        closeModal();
    };
    const inputFileRef = useRef(null);
    const HandleSubmitImg = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    }
    const [selectedImage, setSelectedImage] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (session?.user?.phone?.length  < 1)
        {
            toast.info("Vui lòng cập nhập đầy đủ thông tin cá nhân", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })  
            return ;
        }
        const formData = new FormData(e.currentTarget);
        
        try {
            const imageFile = inputFileRef.current.files[0];
            const formDataImg = new FormData();
            formDataImg.append("formFile", imageFile);
            const res = await axios.post("/api/File/Upload", formDataImg, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            const body = {
                categoryId: selectedCategory?.id,
                title: formData.get("name"),
                postPath: makeSlug(formData.get("name").toString()),
                description: formData.get("description"),
                urlImage: res.data.data.url,
                price: formData.get("price"),
                quantity: formData.get("quantity"),
                address: formData.get("address"),
            }
            try {
                await axiosAuth.post("/api/Post/Create", body);
                setTimeout(() => {
                }, 1500);
                toast.success("Tin đã đăng thành công", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setErrors([])
                setSelectedImage(null)
            }
            catch (error) {
                toast.error(error.response.data.message, {
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
        catch (error) {
            console.error("Loi", error.response)
        }

    }
    const [errors, setErrors] = useState([]);
    const HandleViewPrevious = () => {
        const error = []
        const formDataValues = {
            title: document.querySelector<HTMLInputElement>('input[name="name"]')?.value,
            description: document.querySelector<HTMLInputElement>('textarea[name="description"]')?.value,
            price: document.querySelector<HTMLInputElement>('input[name="price"]')?.value,
            quantity: document.querySelector<HTMLInputElement>('input[name="quantity"]')?.value,
            address: selectedAddress,
            image: inputFileRef.current.value,
            categoryId: selectedCategory?.id ?? "",
        }
        const errorName = ValidateInput(formDataValues["title"], "Tên sản phẩm")
        error.push(errorName)
        const errorDescription = ValidateInput(formDataValues["description"], "Mô tả sản phẩm")
        error.push(errorDescription)
        const errorPrice = ValidateInput(formDataValues["price"], "Giá") ?? ValidateInputPrice(formDataValues["price"], "Giá")
        error.push(errorPrice)
        const errorQuantity = ValidateInput(formDataValues["quantity"], "Số lượng") ?? ValidateInputQuantity(formDataValues["quantity"], "Số lượng")
        error.push(errorQuantity)
        const errorAddress = ValidateInput(selectedAddress, "Địa chỉ")
        error.push(errorAddress)
        const errorImg = ValidateInput(formDataValues["image"], "Hình ảnh")
        error.push(errorImg)
        const errorCat = ValidateInput(formDataValues["categoryId"], "Danh mục")
        error.push(errorCat)
        setErrors(error)
    }
    const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);
    const openModalAddress = () => {
        setIsModalAddressOpen(true);
    };

    const closeModalAddress = () => {
        setIsModalAddressOpen(false);
    };
    const [selectedAddress, setSelectedAddress] = useState("");
    const onSubmitAddress = (address: string) => {
        setSelectedAddress(address);
        closeModalAddress();
    }
    return (
        <>
            <Toast />
            <div id="modal_cat">
                <ModalCat isModalOpen={isModalOpen} isCloseModal={closeModal} onSelectCategory={onSelectCategory} />
            </div>
            <div id="modal_address">
                <ModalAddress isModalOpen={isModalAddressOpen} isCloseModal={closeModalAddress} onSubmitAddress={onSubmitAddress} title="Địa chỉ" />
            </div>
            <div className="max-w-[960px] mx-auto bg-white my-12 flex md:flex-row flex-col mt-28">
                <div className="py-8 px-4 basis-1/3 ">
                    <h5 className="font-bold mb-8 text-center">Hình ảnh sản phẩm</h5>
                    <div onClick={HandleSubmitImg} className=" flex items-center justify-center flex-col bg-slate-100 p-3 border-2 border-dotted border-[#fe9900] cursor-pointer h-[225px] relative">
                        <input ref={inputFileRef} name="imageUrl" className="hidden" type="file" accept="image/*" multiple onChange={handleFileChange} />
                        <div >
                            <BsPlus className="fill-orange-300 w-4 h-4 absolute left-[55%] top-[35%]" />
                            <CiCamera className="w-[53px] h-[39px] fill-orange-300" />
                        </div>
                        <span className="text-sm font-bold text-[10px] text-[#8c8c8c]">Chọn hình ảnh</span>
                        {selectedImage && <img className="absolute top-0 bottom-0 left-0 right-0 w-full h-[225px] object-cover" src={selectedImage} alt="Selected" />}
                    </div>
                    {
                        errors[5] && <p className="text-[#e5193b] text-center mt-2" >{errors[5]}</p>
                    }
                </div>
                <div className="grow px-4 mb-12">
                    <div onClick={openModal} className="border-[#cacaca] w-full h-12  rounded border border-solid mt-6 relative cursor-pointer ">
                        <label className={` absolute top-[12px] left-[12px] cursor-text text-[#8c8c8c] text-sm capitalize after:content-['*'] after:ml-2 after:text-[#e5193b] ${selectedCategory?.categoryName ? "scale(.7143) translate-y-[-10px]" : ""}`} htmlFor="Danh mục tin đăng">Danh mục tin đăng</label>
                        <select className="w-full h-full text-[#222] text-sm appearance-none pointer-events-none px-3 pt-4" >
                            <option value={selectedCategory?.id}>{selectedCategory?.categoryName}</option>
                        </select>
                        <FaCaretDown className="absolute right-[12px] text-[#8c8c8c] h-12 top-[-1px] pointer-events-none" />
                    </div>
                    {
                        errors[6] && <p className="text-[#e5193b] ml-3 text-[10px] mt-2">{errors[6]}</p>
                    }
                    <div className="font-bold mb-8 text-lg mt-10">Thông tin chi tiết</div>
                    <form onSubmit={HandleSubmit} className="space-y-6">
                        <Input label="name" type="text" text="Tên sản phẩm" error={errors[0]} classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" />
                        <Input label="description" type="text" text="Mô tả sản phẩm" error={errors[1]} textarea={true} className="h-[110px]" classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" />
                        <Input label="price" type="text" text="Giá" error={errors[2]}  classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" />
                        <Input label="quantity" type="text" text="Số lượng" placeholder="0" error={errors[3]} classNamelable="after:content-['*'] after:ml-2 after:text-[#e5193b]" />
                        <div onClick={openModalAddress} className="border-[#cacaca] w-full h-12  rounded border border-solid relative cursor-pointer ">
                            <label className={` absolute top-[12px] left-[12px] cursor-text text-[#8c8c8c] text-sm capitalize after:content-['*'] after:ml-2 after:text-[#e5193b] ${selectedAddress ? "scale(.7143) translate-y-[-10px]" : ""} `} htmlFor="Địa chỉ">Địa chỉ</label>
                            <select name="address" className="w-full h-full text-[#222] text-sm appearance-none pointer-events-none px-3 pt-4" >
                                <option value={selectedAddress}>{selectedAddress}</option>
                            </select>
                            <FaCaretDown className="absolute right-[12px] text-[#8c8c8c] h-12 top-[-1px] pointer-events-none" />
                            {
                                errors[4] && <p className="text-[#e5193b] ml-3 text-[10px] mt-1">{errors[4]}</p>
                            }
                        </div>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <Button onClick={HandleViewPrevious} className="font-normal" type="primary" childern="XEM TRƯỚC" />
                            <Button disabled={errors.length > 0 && !!!errors[0] ? false : true} typeProp="submit" className={`font-normal`} childern="ĐĂNG TIN" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
