"use client";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import TagCategory from "@/components/TagCategory";

const TAG_CATEGORY = [
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
    {
        text: "Bất động sản",
        urlImg: "https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95"
    },
]
export default function TabCategory() {
    const [currentPageCat, setCurrentPageCat] = useState(0);
    const itemsPerPage = 14;
    const startIndex = currentPageCat * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedCategories = TAG_CATEGORY.slice(startIndex, endIndex);
    const handleNext = () => {
        setCurrentPageCat((prevPage) => (prevPage + 1) % Math.ceil(TAG_CATEGORY.length / itemsPerPage));
    };

    const handlePrevious = () => {
        setCurrentPageCat(
            (prevPage) => (prevPage - 1 + Math.ceil(TAG_CATEGORY.length / itemsPerPage)) % Math.ceil(TAG_CATEGORY.length / itemsPerPage)
        );
    };
    return (
        <>
            <div className="grid grid-cols-7 gap-12 my-6 px-6">
                {
                    displayedCategories.map((cat, i) => (
                        <TagCategory key={i} text={cat.text} urlImg={cat.urlImg} />
                    ))
                }
            </div>
            <div className="pagination-buttons">
                <button onClick={handlePrevious} disabled={currentPageCat === 0} className="border rounded-[50%] hover:scale-125 absolute top-[50%] left-[0] hover:cursor-pointer hover:border shadow-md font-light p-1" >
                    <FaAngleLeft className="w-[32px] h-[32px]" />
                </button>
                <button onClick={handleNext} disabled={currentPageCat === Math.ceil(TAG_CATEGORY.length / itemsPerPage) - 1} className="border rounded-[50%] hover:scale-125 absolute top-[50%] right-0 hover:cursor-pointer hover:border shadow-md font-light p-1" >
                    <FaAngleRight className="w-[32px] h-[32px]" />
                </button>
            </div>
        </>
    )
}