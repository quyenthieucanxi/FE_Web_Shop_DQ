"use client";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CheckUrl } from "@/utils/TestHelper";
function Footer() {
    return (
        CheckUrl()
        &&
        <footer className="bg-yellow-400 py-6 lg:px-32 md:px-28 sm:px-24 max-sm:flex max-sm:justify-center text-black-700  bottom-0 left-0 w-full ">
            <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between">
                <div className="w-full lg:w-1/4 md:w-1/3 sm:w-1/2 sm:p-4 max-sm:w-full  max-sm:p-2 max-sm:text-center">
                    <a href="#" className="block mb-1 font-semibold hover:text-gray-900 transition duration-300 ease-in-out ">Hỗ trợ khách hàng</a>
                    <a href="#" className="block mb-1 hover-text-gray-900 transition duration-300 ease-in-out ">Trung tâm trợ giúp</a>
                    <a href="#" className="block mb-1 hover-text-gray-900 transition duration-300 ease-in-out ">An toàn mua bán</a>
                    <a href="#" className="block mb-1 hover-text-gray-900 transition duration-300 ease-in-out ">Liên hệ hỗ trợ</a>
                </div>

                <div className="w-full lg:w-1/4 md:w-1/3 sm:w-1/2 sm:p-4 max-sm:w-full  max-sm:p-2 max-sm:text-center">
                    <a href="#" className="block mb-1 font-semibold hover-text-gray-900 transition duration-300 ease-in-out ">Về chúng tôi</a>
                    <a href="#" className="block mb-1 hover-text-gray-900 transition duration-300 ease-in-out ">Quy chế hoạt động sản</a>
                    <a href="#" className="block mb-1 hover-text-gray-900 transition duration-300 ease-in-out ">Chính sách bảo mật</a>
                    <a href="#" className="block mb-1 hover-text-gray-900 transition duration-300 ease-in-out ">Giải quyết tranh chấp</a>
                </div>
                <div className="w-full lg:w-1/4 md:w-1/3 sm:w-1/2 sm:p-4 max-sm:w-full max-sm:p-2 max-sm:text-center">
                    <div className="mb-1 font-semibold ">Liên kết</div>
                    <div className="flex justify-start space-x-4 mt-2 max-sm:justify-center">
                        <a href="#" className="text-gray-500 hover:text-gray-900 transition duration-300 ease-in-out "><FaFacebook className="fill-blue-500 text-2xl" /></a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 transition duration-300 ease-in-out "><FaTwitter className="text-2xl fill-blue-300" /></a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 transition duration-300 ease-in-out "><FaInstagram className="text-2xl fill-pink-500" /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
