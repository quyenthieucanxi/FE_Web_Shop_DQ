"use client";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import TagCategory from "@/components/TagCategory";
import { GetAllCategory } from "@/services/CategoryService";
import { makeSlug } from "@/utils/StringHelper";


export default  function TabCategory() {
    const [currentPageCat, setCurrentPageCat] = useState(0);
    const [listCategory,setListCategory] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await GetAllCategory();
            setListCategory(res.data);
        };
        fetchCategories();
    }, [GetAllCategory]);
    const ITEMSPAGE = 14;
    const startIndex = currentPageCat * ITEMSPAGE;
    const endIndex = startIndex + ITEMSPAGE;
    const displayedCategories = listCategory.slice(startIndex, endIndex);
    const handleNext = () => {
        setCurrentPageCat((prevPage) => (prevPage + 1) % Math.ceil(listCategory.length / ITEMSPAGE));
    };

    const handlePrevious = () => {
        setCurrentPageCat(
            (prevPage) => (prevPage - 1 + Math.ceil(listCategory.length / ITEMSPAGE)) % Math.ceil(listCategory.length / ITEMSPAGE)
        );
    };
    return (
        <>
            <div className="grid grid-cols-7 max-sm:grid-cols-4 gap-12 my-6 px-6">
                {
                    displayedCategories.map((cat, i) => (
                        <TagCategory key={i} catName={cat.categoryName} urlImg={cat.urlImg} catPath={cat.categoryPath} />
                    ))
                }
            </div>
            <div className="pagination-buttons">
                <button onClick={handlePrevious} disabled={currentPageCat === 0} className="border rounded-[50%] hover:scale-125 absolute top-[50%] left-[0] hover:cursor-pointer hover:border shadow-md font-light p-1" >
                    <FaAngleLeft className="w-[32px] h-[32px]" />
                </button>
                <button onClick={handleNext} disabled={currentPageCat === Math.ceil(listCategory.length / ITEMSPAGE) - 1} className="border rounded-[50%] hover:scale-125 absolute top-[50%] right-0 hover:cursor-pointer hover:border shadow-md font-light p-1" >
                    <FaAngleRight className="w-[32px] h-[32px]" />
                </button>
            </div>
        </>
    )
}