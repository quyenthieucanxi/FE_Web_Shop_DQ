'use client';
import { IoMenuSharp } from 'react-icons/io5';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BiMessageAltDetail } from 'react-icons/bi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { CgList } from 'react-icons/cg';
import { LuPenSquare } from 'react-icons/lu';
import { VscAccount } from 'react-icons/vsc';
import { BsChevronDown } from 'react-icons/bs';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState} from 'react';
import useAxiosAuth from '@/libs/hooks/useAxiosAuth';
import { CheckUrl } from '@/utils/TestHelper';
import { useRouter } from 'next/navigation';


const Header = () => {
    const router = useRouter();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const { data: session } = useSession();
    const toggleDropdown = (): void => {
        setDropdownOpen(!isDropdownOpen);
    };
    const axiosAuth = useAxiosAuth();
    useEffect(() => {
        const fetchData = async () => {
            if (session) {
                try {
                    const res = await axiosAuth.get("/api/User/GetMyInfo");
                    setUser(res.data);
                } catch (error) {
                    console.error('Error fetching data from the API', error);
                }
            }
        };
        const delay = setTimeout(() => {
            fetchData();
          }, 1500);
        return () => clearTimeout(delay);
    }, [session?.user?.accessToken]);
    return (
        CheckUrl()
        &&
        <header className="bg-yellow-400 px-6 py-4 flex items-center max-md:px-2 max-lg:px-4 fixed top-0 w-full z-[1000]">
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
                        className="z-[1000] p-2 shadow menu menu-sm dropdown-content bg-[#D2E0FB] rounded-box absolute w-[158px] top-12"
                    >
                        <li className="text-[14px] h-[32px] flex justify-center items-center hover:bg-[#c1d2f6] cursor-pointer hover:text-white">
                            <Link href="/user/:id">Tài khoản của tôi</Link>
                        </li>
                        <li className="text-[14px] h-[32px] flex justify-center items-center hover:bg-[#c1d2f6] cursor-pointer hover:text-white">
                            <Link href="bill/user?status='Đã đặt'">Đơn mua</Link>
                        </li>
                        <li className="text-[14px] h-[32px] flex justify-center items-center hover:bg-[#c1d2f6] cursor-pointer hover:text-white">
                            <button onClick={() => signOut()} >Đăng xuất</button>
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
                    <div className="relative cursor-pointer">
                        <HiOutlineShoppingBag size={20} />
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
            </div>
            <div className="relative flex items-center hover:cursor-pointer ml-6">
                <a className='text-sm flex justify-center items-center max-md:text-xs max-md:space-x-1' href="">
                    <CgList className="mr-2" size={20} />
                    Quản lý tin
                </a>
            </div>
            <div className="relative flex items-center hover:cursor-pointer ml-6">
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
                            <button onClick={toggleDropdown}
                                className={`flex items-center space-x-2 cursor-pointer ${session?.user ? "mr-2" : "mr-4"}`}
                            >
                                <span><VscAccount size={20} /></span>
                            </button>
                            <span className="text-sm mr-1">Tài Khoản</span>
                            <BsChevronDown size={12} />
                        </>
                }
            </div>
            <div className='flex justify-center'>
                <button onClick={() => { router.push("/post") }} className="bg-orange-400 text-white px-6 py-2 rounded ml-6 flex items-center space-x-2 w-full">
                    <span><LuPenSquare size={18} /></span>
                    <span className='text-sm max-md:text-xs'>ĐĂNG TIN</span>
                </button>
            </div>

        </header>
    );
};

export default Header;
