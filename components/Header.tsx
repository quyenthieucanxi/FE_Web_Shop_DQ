'use client';
import { usePathname } from 'next/navigation'
import { IoMenuSharp } from 'react-icons/io5';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdNotificationsOutline, IoMdChatbubbles, IoMdSettings } from 'react-icons/io';
import { BiMessageAltDetail, BiSolidHelpCircle } from 'react-icons/bi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { CgList } from 'react-icons/cg';
import { LuPenSquare } from 'react-icons/lu';
import { VscAccount } from 'react-icons/vsc';
import { BsChevronDown } from 'react-icons/bs';
import { MdLogout, MdOutlineShoppingBag } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import Link from 'next/link';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useAxiosAuth from '@/libs/hooks/useAxiosAuth';

export const CheckUrl = (): boolean => {
    const pathname = usePathname();
    const checkURL = (pathname !== options.pages?.signIn && pathname !== "/signUp" && pathname != "/forgetPassword") ? true : false;
    return checkURL;
}
const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isCartDropdownOpen, setCartDropdownOpen] = useState(false);
    const [isAccountDropdownOpen, setAccountDropdownOpen] = useState(false);

    const [user, setUser] = useState(null);
    const { data: session } = useSession();

    const toggleDropdown = (): void => {
        setDropdownOpen(!isDropdownOpen);
    };

    const toggleCartDropdown = (): void => {
        setCartDropdownOpen(!isCartDropdownOpen);
    };

    const toggleAccountDropdown = (): void => {
        setAccountDropdownOpen(!isAccountDropdownOpen);
    };

    console.log("render");
    const axiosAuth = useAxiosAuth();
    useEffect(() => {
        const fetchData = async () => {
            if (session) {
                try {
                    const res = await axiosAuth.get("/api/User/GetMyInfo");
                    setUser(res.data);
                    console.log(res);
                } catch (error) {
                    console.error('Error fetching data from the API', error);
                }
            }
        };
        fetchData();
    }, [session?.user?.accessToken]);
    return (
        CheckUrl()
        &&
        <header className="bg-yellow-400 px-6 py-4 flex items-center max-md:px-2 max-lg:px-4">
            <div className="flex">
                <Link href="/">
                    <img className="w-full h-[40px] hover:cursor-pointer" src="/images/logo.png" alt="logo" />
                </Link>
            </div>

            <div onClick={toggleDropdown} className="relative flex items-center hover:cursor-pointer">
                <button
                    className="flex items-center space-x-2 cursor-pointer mr-2 "
                >
                    <span><IoMenuSharp size={20} /></span>
                </button>
                <span className='text-sm mr-1 max-md:text-xs max-md:hidden'>Danh mục</span>
                <BsChevronDown className="max-md:hidden" size={12} />
                {isDropdownOpen && (
                    <ul
                        className="z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#D2E0FB] rounded-box absolute w-[158px] top-12"
                    >
                        <li className="text-[14px] h-[32px] flex justify-center items-center hover:bg-[#c1d2f6] cursor-pointer hover:text-white">
                            <Link href="/user/:id">Con mèo</Link>
                        </li>
                        <li className="text-[14px] h-[32px] flex justify-center items-center hover:bg-[#c1d2f6] cursor-pointer hover:text-white">
                            <Link href="/user/:id">Con chó</Link>
                        </li>
                    </ul>
                )}
            </div>
            <div className="flex items-center space-x-4 ml-4 relative h-[36px] w-[500px]">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="bg-white text-gray-800 px-2 py-1 rounded  w-full h-full text-sm max-md:text-xs "
                />
                <div className="text-gray-500 absolute right-3  cursor-pointer hover:cursor-pointer">
                    <button className='bg-orange-300 w-[40px] h-[26px] flex justify-center items-center rounded-md max-md:w-[24px] max-md:h-[18px]'>
                        <AiOutlineSearch className=" text-white  " size={20} />
                    </button>
                </div>
            </div>
            <div className="flex items-center space-x-6 ml-6 hover:cursor-pointer">
                <IoMdNotificationsOutline size={20} />
                <BiMessageAltDetail size={20} />

                <div className="relative group">
                    <div className="relative cursor-pointer" onClick={toggleCartDropdown}>
                        <HiOutlineShoppingBag size={20} />
                    </div>
                    {isCartDropdownOpen && (
                        <div className="z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#D2E0FB] rounded-box absolute w-[120px] top-12 left-1/2 transform -translate-x-1/2">
                            <ul>
                                <li className="text-[14px] h-[32px] flex justify-center items-center hover:bg-[#c1d2f6] cursor-pointer hover:text-white">
                                    <Link href="">Đơn mua</Link>
                                </li>
                                <li className="text-[14px] h-[32px] flex justify-center items-center hover:bg-[#c1d2f6] cursor-pointer hover:text-white">
                                    <Link href="">Đơn bán</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="relative flex items-center hover:cursor-pointer ml-6">
                <a className='text-sm flex justify-center items-center max-md:text-xs max-md:space-x-1' href="">
                    <CgList className="mr-2" size={20} />
                    Quản lý tin
                </a>
            </div>
            <div onClick={toggleAccountDropdown} className="relative flex items-center hover:cursor-pointer ml-6">
                {
                    session ? (
                        <>
                            <img src={session.user?.sub === "google" ? session.user.image : user?.data?.avatarUrl} alt="img-profile" className="w-6 h-6 rounded-[50%] mr-2   max-md:w-5 max-md:h-5" />
                            <span className="text-sm max-md:hidden ">{session.user?.sub === "google" ? session.user.name : user?.data?.fullName}</span>
                            <BsChevronDown className="w-[16px] h-[16px] max-md:w-[32px] ml-[2px]" />
                        </>
                    )
                        :
                        <>
                            <button
                                className={`flex items-center space-x-2 cursor-pointer ${session?.user ? "mr-2" : "mr-4"}`}
                            >
                                <span><VscAccount size={20} /></span>
                            </button>
                            <span className="text-sm mr-1">Tài Khoản</span>
                            <BsChevronDown size={12} />
                            {isAccountDropdownOpen && (
                                <div className="absolute right-0 top-10 mt-3 flex w-60 flex-col gap-3 rounded-xl bg-white p-3 text-black shadow-lg max-h-[350px] overflow-y-auto">
                                    <div className="flex gap-3 items-center">
                                        <div className="flex items-center justify-center rounded-lg h-12 w-12 overflow-hidden border-2 border-slate-600">
                                            <img className="w-full object-cover"
                                                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=top&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=100&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2Mjk2MTgwNw&amp;ixlib=rb-1.2.1&amp;q=80&amp;utm_campaign=api-credit&amp;utm_medium=referral&amp;utm_source=unsplash_source&amp;w=100" alt="Profile" />
                                        </div>
                                        <div>
                                            <div className="flex gap-1 text-sm font-semibold">
                                                <span>User Name</span>
                                            </div>
                                            <div className="text-xs text-slate-400">abc@gmail.com</div>
                                        </div>
                                    </div>
                                    <div className="border-t border-slate-500/30"></div>
                                    <div className="flex justify-around">
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="text-base font-semibold">268</span>
                                            <span className="text-xs text-slate-400">Người theo dõi</span>
                                        </div>
                                        <div className="border-l border-slate-500/30 h-8 mx-3"></div>
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="text-base font-semibold">897</span>
                                            <span className="text-xs text-slate-400">Đang theo dõi</span>
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 py-1 pl-2 text-sm font-bold text-gray-500">Quản lý đơn hàng</div>
                                    <div className="flex flex-col">
                                        <a href="#" className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-slate-300">
                                            <div className="rounded-full bg-blue-400 p-1">
                                                <MdOutlineShoppingBag className="text-white" size="16px" />
                                            </div>
                                            <span className="text-sm">Đơn mua</span>
                                        </a>
                                        <a href="#" className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-slate-300">
                                            <div className="rounded-full bg-green-400 p-1">
                                                <FaMoneyCheckDollar className="text-white" size="16px" />
                                            </div>
                                            <span className="text-sm">Đơn bán</span>
                                        </a>
                                    </div>
                                    <div className="bg-gray-100 py-1 pl-2 text-sm font-bold text-gray-500">Khác</div>
                                    <div className="flex flex-col">
                                        <a href="#" className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-slate-300">
                                            <div className="rounded-full bg-gray-300 p-1">
                                                <IoMdSettings className="text-gray-500" size="16px" />
                                            </div>
                                            <span className="text-sm">Cài đặt</span>
                                        </a>
                                        <a href="#" className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-slate-300">
                                            <BiSolidHelpCircle className="text-gray-500" size="24px" />
                                            <span className="text-sm">Trợ giúp</span>
                                        </a>
                                        <a href="#" className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-slate-300">
                                            <div className="rounded-full bg-gray-300 p-1">
                                                <IoMdChatbubbles className="text-gray-500" size="16px" />
                                            </div>
                                            <span className="text-sm">Đóng góp ý kiến</span>
                                        </a>
                                        <a href="#" className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-slate-300">
                                            <div className="rounded-full bg-gray-300 p-1">
                                                <MdLogout className="text-gray-500" size="16px" />
                                            </div>
                                            <span className="text-sm">Đăng xuất</span>
                                        </a>
                                    </div>
                                </div>
                            )}
                        </>
                }
            </div>
            <div className='flex justify-center'>
                <button className="bg-orange-400 text-white px-6 py-2 rounded ml-6 flex items-center space-x-2 w-full">
                    <span><LuPenSquare size={18} /></span>
                    <span className='text-sm max-md:text-xs'>ĐĂNG TIN</span>
                </button>
            </div>

        </header>
    );
};

export default Header;
