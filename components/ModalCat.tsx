"use client";
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { GetAllCategory } from "@/services/CategoryService";



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
    onSelectCategory : (cat) => void;
  }
export default function ModalCat ( {isModalOpen, isCloseModal, onSelectCategory } : Props ) {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await GetAllCategory();
            setCategories(res.data);
        };
        fetchCategories();
    }, []);
    return (
            <Modal
                isOpen={isModalOpen}
                onRequestClose={isCloseModal}
                style={customStyles}
                contentLabel="Example Modal"
                appElement={document.getElementById('modal_cat')}
            >
                <div className="flex items-center justify-between h-10 bg-slate-100 ">
                    <button onClick={isCloseModal} className="ml-[10px]" >
                        <IoIosClose className="w-8 h-8" />
                    </button>
                    <h5 className="text-base font-bold">Đăng tin</h5>
                    <button className="invisible" ></button>
                </div>
                <div className="p-5 max-h-[586px] overflow-y-auto ">
                    <div className="font-bold my-2"> CHỌN DANH MỤC</div>                    
                    <ul className="border border-solid border-slate-300 cursor-pointer">
                    {
                        categories?.map((cat,i)=> (
                            <li key={i} onClick={() => onSelectCategory(cat)} className="w-full text-sm px-4 h-11  border-b border-b-solid border-b-slate-300 flex items-center hover:bg-[#f5f5f5]">
                                <label htmlFor={cat.categoryName}>{cat.categoryName}</label>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            </Modal>
    )
}