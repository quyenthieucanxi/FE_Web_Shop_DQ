"use client";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CheckUrl } from "./Header";

function Footer() {
    return (
        CheckUrl()
        &&
        <footer className="bg-yellow-400 py-6 px-64 text-black-700 text-center fixed bottom-0 left-0 w-full">
            <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between">
                <div className="w-full lg:w-1/4">
                    <a href="#" className="block mb-1 font-semibold hover:text-gray-900 transition duration-300 ease-in-out text-left">Hỗ trợ khách hàng</a>
                    <a href="#" className="block mb-1 hover-text-gray-900 transition duration-300 ease-in-out text-left">Trung tâm trợ giúp</a>
                    <a href="#" className="block mb-1 hover-text-gray-900 transition duration-300 ease-in-out text-left">An toàn mua bán</a>
                    <a href="#" className="block mb-1 hover-text-gray-900 transition duration-300 ease-in-out text-left">Liên hệ hỗ trợ</a>
                </div>

                <div className="w-full lg:w-1/4">
                    <a href="#" className="block mb-1 font-semibold hover-text-gray-900 transition duration-300 ease-in-out text-left">Về chúng tôi</a>
                    <a href="#" className="block mb-1 hover-text-gray-900 transition duration-300 ease-in-out text-left">Quy chế hoạt động sản</a>
                    <a href="#" className="block mb-1 hover-text-gray-900 transition duration-300 ease-in-out text-left">Chính sách bảo mật</a>
                    <a href="#" className="block mb-1 hover-text-gray-900 transition duration-300 ease-in-out text-left">Giải quyết tranh chấp</a>
                </div>
                <div className="w-full lg:w-1/4">
                    <div className="mb-1 font-semibold text-left">Liên kết</div>
                    <div className="flex justify-start space-x-4 mt-2">
                        <a href="#" className="text-gray-500 hover:text-gray-900 transition duration-300 ease-in-out text-left"><FaFacebook className="text-2xl" /></a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 transition duration-300 ease-in-out text-left"><FaTwitter className="text-2xl" /></a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 transition duration-300 ease-in-out text-left"><FaInstagram className="text-2xl" /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
