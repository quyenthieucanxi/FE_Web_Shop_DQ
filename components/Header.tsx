'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { IoMenuSharp } from 'react-icons/io5';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BiMessageAltDetail } from 'react-icons/bi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { CgList } from 'react-icons/cg';
import { LuPenSquare } from 'react-icons/lu';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { signOut } from 'next-auth/react';

export const CheckUrl  = () : boolean => {
    const pathname = usePathname();
    const checkURL = (pathname !== options.pages?.signIn && pathname !== "/signUp") ?  true : false;
    return checkURL;
}
const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = (): void => {
        setDropdownOpen(!isDropdownOpen);
    };
    return (
        CheckUrl()
        &&
        <header className="bg-yellow-400 px-6 py-4 flex">
            <div className="flex">
                <Link href="/">
                    <img className="w-[125px] h-[40px] hover:cursor-pointer" src="/images/logo.png" alt="logo" />
                </Link>
            </div>

            <div className="relative flex items-center hover:cursor-pointer">
                <button onClick={toggleDropdown}
                    className="flex items-center space-x-2 cursor-pointer mr-1 "

                >
                    <span><IoMenuSharp size={24} /></span>
                </button>
                <span>Danh mục</span>
                {isDropdownOpen && (
                    <ul
                        className="z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#D2E0FB] rounded-box absolute w-[158px] top-16"
                    >
                        <li className="text-[14px] h-[32px] flex justify-center items-center hover:bg-[#c1d2f6] cursor-pointer hover:text-white">
                            <Link href="/user/:id">Tài khoản của tôi</Link>
                        </li>
                        <li className="text-[14px] h-[32px] flex justify-center items-center hover:bg-[#c1d2f6] cursor-pointer hover:text-white">
                            <Link href="bill/user?status='Đã đặt'">Đơn mua</Link>
                        </li>
                        <li className="text-[14px] h-[32px] flex justify-center items-center hover:bg-[#c1d2f6] cursor-pointer hover:text-white">
                            <Link href="auth/logout">Đăng xuất</Link>
                        </li>
                    </ul>
                )}
            </div>

            <div className="flex items-center space-x-4 ml-6 relative">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="bg-white text-gray-800 px-2 py-1 rounded w-[650px]"
                />
                <div className="text-gray-500 absolute right-3 top-2 cursor-pointer hover:cursor-pointer">
                    <AiOutlineSearch size={24} />
                </div>
            </div>


            <div className="flex items-center space-x-6 ml-12 hover:cursor-pointer">
                <IoMdNotificationsOutline size={24} />
                <BiMessageAltDetail size={24} />

                <div className="relative group" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                    <div className="relative cursor-pointer">
                        <HiOutlineShoppingBag size={24} />
                        {/* {isDropdownOpen && (
                        <div className="z-10 p-2 shadow menu menu-sm dropdown-content bg-white rounded-box top-10 right-0">
                            <ul>
                                <li className='h-[100px] w-[100px]'>
                                    <Link href="bill/user?status='Đã đặt'">Đơn mua</Link>
                                </li>
                                <li>
                                    <Link href="bill/user?status='Đã bán'">Đơn bán</Link>
                                </li>
                            </ul>
                        </div>
                    )} */}
                    </div>
                </div>
                <CgList size={24} />
                <img src="/profile.png" alt="profile" className="w-10 h-10 rounded-full" />
                <button onClick={() => signOut()}>Logout</button>
            </div>
            <button className="bg-orange-400 text-white px-5 py-2 rounded ml-auto flex items-center space-x-2">
                <span><LuPenSquare size={20} /></span>
                <span>ĐĂNG TIN</span>
            </button>
        </header>
    );
};

export default Header;
