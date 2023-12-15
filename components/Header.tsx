'use client';
import { IoMenuSharp } from 'react-icons/io5';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdNotificationsOutline, IoMdChatbubbles, IoMdSettings } from 'react-icons/io';
import { BiMessageAltDetail, BiSolidHelpCircle } from 'react-icons/bi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { MdLogout, MdOutlineShoppingBag } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { CgList } from 'react-icons/cg';
import { LuPenSquare } from 'react-icons/lu';
import { VscAccount } from 'react-icons/vsc';
import { BsChevronDown } from 'react-icons/bs';
import { MdDashboard } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import useAxiosAuth from '@/libs/hooks/useAxiosAuth';
import { CheckUrl } from '@/utils/TestHelper';
import { useRouter } from 'next/navigation';
import { GetAllCategory } from '@/services/CategoryService';
import { useQuery } from '@tanstack/react-query';
import { makeSlug } from '@/utils/StringHelper';



const Header = () => {
    const router = useRouter();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isAccountDropdownOpen, setAccountDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const { data: session, update } = useSession();
    const containerRef = useRef();
    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };
    const toggleAccountDropdown = (): void => {

        setAccountDropdownOpen(!isAccountDropdownOpen)
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await GetAllCategory();
            setCategories(res.data)
        };
        fetchCategories()
    }, []);
    useEffect(() => {
        const handleAccountDropdownOutsideClick = (event: MouseEvent) => {
            const accountDropdown = document.getElementById('menu-account');
            const accountToggle = document.getElementById('account');
            if (accountDropdown && accountToggle && !accountDropdown.contains(event.target as Node) && !accountToggle.contains(event.target as Node)) {
                setAccountDropdownOpen(false);
            }
        };
        // Attach the event listener when the component mounts
        document.addEventListener('click', handleAccountDropdownOutsideClick);
        // Detach the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleAccountDropdownOutsideClick);
        };
    }, []);
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
        fetchData();
    }, [session?.user?.accessToken]);
    useEffect(() => {
        const updateSession = async () => {
            if (session) {
                const res = await update({
                    ...session,
                    user: {
                        ...session?.user,
                        role: user.data.role,
                        email: user.data.email,
                        name: user.data.fullName,
                        image: user.data.avatarUrl,
                        phone: user.data.phoneNumber,
                        address: user.data.address,
                        introduce: user.data.introduce,
                    }
                })
            }
        };
        updateSession();
    }, [user])
    //Search
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search')
        const searchSlug = makeSlug(search?.toString());
        const matchedCategory = categories.find((category) =>
            category.categoryPath.toLowerCase().includes(searchSlug)
        ) ?? categories.find((category) =>
            category.categoryName.toLowerCase().includes(searchSlug)
        );
        matchedCategory ? router.push(`/${matchedCategory.categoryPath}?search=${search}`) : router.push(`/${categories[0].categoryPath}?search=${search}`) 
        console.log(matchedCategory)
    }
    return (
        CheckUrl()
        &&
        <header className="bg-yellow-400 px-6 h-[66px] flex items-center max-md:px-2 max-lg:px-4 fixed top-0 w-full z-[1000]">
            <div className="flex w-[160px] min-w-[120px]">
                <Link href="/">
                    <img className="w-full h-[40px] hover:cursor-pointer" src="/images/logo.png" alt="logo" />
                </Link>
            </div>
            <div
                ref={containerRef}
                onMouseMove={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative inline-block py-5"
            >
                <div className="flex items-center cursor-pointer">
                    <button className="flex items-center space-x-2 cursor-pointer mr-2">
                        <span><IoMenuSharp size={20} /></span>
                    </button>
                    <span className='text-sm mr-1 max-md:text-xs max-md:hidden'>Danh mục</span>
                    <BsChevronDown className="max-md:hidden" size={12} />
                </div>
                <ul
                    id='menu-cat'
                    className={`z-[1000] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box absolute w-[158px] top-14 ${isDropdownOpen ? '' : 'hidden'}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {categories?.map((cat, i) => (
                        <li key={i} className="text-[14px] h-[32px] flex items-center hover:bg-gray-300 cursor-pointer">
                            <a className="w-full text-center" href={`/${cat.categoryPath}`}>{cat.categoryName}</a>
                        </li>
                    ))}
                </ul>
            </div>

            <form onSubmit={handleSearch} className="flex items-center space-x-4 ml-4 relative h-[36px] w-[450px] max-md:hidden">
                <input name='search'
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="bg-white text-gray-800 px-2 py-1 rounded  w-full h-full text-sm max-md:text-xs "
                />
                <div className="text-gray-500 absolute right-3  cursor-pointer hover:cursor-pointer">
                    <button type='submit' className='bg-orange-300 w-[40px] h-[26px] flex justify-center items-center rounded-md max-md:w-[24px] max-md:h-[18px]'>
                        <AiOutlineSearch className=" text-white  " size={20} />
                    </button>
                </div>
            </form>
            <div className="flex items-center space-x-6 ml-6 hover:cursor-pointer">
                <IoMdNotificationsOutline size={20} />
                <BiMessageAltDetail size={20} />
                <div className="relative group">
                    <Link  href="/order" className="relative cursor-pointer">
                        <HiOutlineShoppingBag size={20} />
                    </Link>
                </div>
            </div>
            <div className="relative flex items-center hover:cursor-pointer ml-6">
                <a className='text-sm flex justify-center items-center max-md:text-xs max-md:space-x-1' href="/mypost">
                    <CgList className="mr-2" size={20} />
                    Quản lý tin
                </a>
            </div>
            <div className="relative ml-6">
                {
                    session ? (
                        <>
                            <div id='account' onClick={toggleAccountDropdown} className='flex items-center hover:cursor-pointer'>
                                <img src={session.user?.sub === "google" ? session.user.image : user?.data?.avatarUrl ?? `https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=top&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=100&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2Mjk2MTgwNw&amp;ixlib=rb-1.2.1&amp;q=80&amp;utm_campaign=api-credit&amp;utm_medium=referral&amp;utm_source=unsplash_source&amp;w=100`} alt="img-profile" className="w-6 h-6 rounded-[50%] mr-2   max-md:w-5 max-md:h-5" />
                                <span className="text-sm max-md:hidden ">{session.user?.sub === "google" ? session.user.name : user?.data?.fullName}</span>
                                <BsChevronDown className="w-[16px] h-[16px] max-md:w-[32px] ml-[2px]" />
                            </div>
                            {isAccountDropdownOpen && (
                                <div id='menu-account' >
                                    <div className="absolute right-0 top-10 mt-3 flex w-60 flex-col gap-3 rounded-xl bg-white p-3 text-black shadow-lg max-h-[350px] overflow-y-auto ">
                                        <div className="flex gap-3 items-center">
                                            <div className="flex items-center justify-center rounded-lg h-12 w-12 overflow-hidden border-2 border-slate-600">
                                                <img className="w-full object-cover"
                                                    src={session.user?.sub === "google" ? session.user.image : user?.data?.avatarUrl ?? `https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=top&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=100&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2Mjk2MTgwNw&amp;ixlib=rb-1.2.1&amp;q=80&amp;utm_campaign=api-credit&amp;utm_medium=referral&amp;utm_source=unsplash_source&amp;w=100`} 
                                                    alt="Profile" />
                                            </div>
                                            <div>
                                                <div className="flex gap-1 text-sm font-semibold">
                                                    <span></span>
                                                </div>
                                                <div className="text-xs text-slate-400">{session.user?.sub === "google" ? session.user.name : user?.data?.fullName}</div>
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
                                            <Link href="/order" className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-slate-300">
                                                <div className="rounded-full bg-blue-400 p-1">
                                                    <MdOutlineShoppingBag className="text-white" size="16px" />
                                                </div>
                                                <span className="text-sm">Đơn mua</span>
                                            </Link>
                                            <a href="#" className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-slate-300">
                                                <div className="rounded-full bg-green-400 p-1">
                                                    <FaMoneyCheckDollar className="text-white" size="16px" />
                                                </div>
                                                <span className="text-sm">Đơn bán</span>
                                            </a>
                                        </div>
                                        <div className="bg-gray-100 py-1 pl-2 text-sm font-bold text-gray-500">Tiện ích</div>
                                        <div className="flex flex-col hover:cursor-pointer">
                                            <Link href="/myLikePost" className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-slate-300" >
                                                <div className="rounded-full bg-gray-300 p-1">
                                                    <FcLike className="text-gray-500" size="16px" />
                                                </div>
                                                <span className="text-sm">Tin đã được lưu</span>
                                            </Link>
                                        </div>
                                        <div className="bg-gray-100 py-1 pl-2 text-sm font-bold text-gray-500">Khác</div>
                                        <div className="flex flex-col hover:cursor-pointer">
                                            {
                                                session?.user?.role === "User"
                                                && <Link href="/admin/dashboard" className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-slate-300">
                                                    <div className="rounded-full bg-gray-300 p-1">
                                                        <MdDashboard className="text-gray-500" size="16px" />
                                                    </div>
                                                    <span className="text-sm">DashBoard</span>
                                                </Link>
                                            }
                                            <Link href="/settings/profile" className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-slate-300">
                                                <div className="rounded-full bg-gray-300 p-1">
                                                    <IoMdSettings className="text-gray-500" size="16px" />
                                                </div>
                                                <span className="text-sm">Cài đặt</span>
                                            </Link>
                                            <div className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-slate-300">
                                                <BiSolidHelpCircle className="text-gray-500" size="24px" />
                                                <span className="text-sm">Trợ giúp</span>
                                            </div>
                                            <div className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-slate-300">
                                                <div className="rounded-full bg-gray-300 p-1">
                                                    <IoMdChatbubbles className="text-gray-500" size="16px" />
                                                </div>
                                                <span className="text-sm">Đóng góp ý kiến</span>
                                            </div>
                                            <div onClick={() => signOut()} className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-slate-300">
                                                <div className="rounded-full bg-gray-300 p-1">
                                                    <MdLogout className="text-gray-500" size="16px" />
                                                </div>
                                                <span className="text-sm">Đăng xuất</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )
                        :
                        <>
                            <div id='account' onClick={toggleAccountDropdown} className='flex items-center hover:cursor-pointer'>
                                <button
                                    className={`flex items-center space-x-2 cursor-pointer ${session?.user ? "mr-2" : "mr-4"}`}
                                >
                                    <span><VscAccount size={20} /></span>
                                </button>
                                <span className="text-sm mr-1">Tài Khoản</span>
                                <BsChevronDown size={12} />
                            </div>
                            {isAccountDropdownOpen && (
                                <div className="absolute right-0 top-10 mt-3 flex w-60 flex-col gap-3 rounded-xl bg-white p-3 text-black shadow-lg max-h-[350px] overflow-y-auto">
                                    <div className="flex gap-3 items-center">
                                        <div className="flex items-center justify-center rounded-lg h-12 w-12 overflow-hidden border-2 border-slate-600">
                                            <img className="w-full object-cover"
                                                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=top&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=100&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2Mjk2MTgwNw&amp;ixlib=rb-1.2.1&amp;q=80&amp;utm_campaign=api-credit&amp;utm_medium=referral&amp;utm_source=unsplash_source&amp;w=100" alt="Profile" />
                                        </div>
                                        <div className='gap-2 hover:cursor-pointer'>
                                            <div onClick={() => signIn()} className="flex gap-1 text-base font-bold">
                                                <span>Đăng nhập</span>
                                            </div>
                                            <Link href='/signUp' className="text-base  font-bold">Đăng kí</Link>
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
                                        <Link href="/order" className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-slate-300">
                                            <div className="rounded-full bg-blue-400 p-1">
                                                <MdOutlineShoppingBag className="text-white" size="16px" />
                                            </div>
                                            <span className="text-sm">Đơn mua</span>
                                        </Link>
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
                <button onClick={() => { router.push("/post") }} className="bg-orange-400 text-white px-6 py-2 rounded ml-6 flex items-center space-x-2 w-full">
                    <span><LuPenSquare size={18} /></span>
                    <span className='text-sm max-md:text-xs'>ĐĂNG TIN</span>
                </button>
            </div>

        </header>
    );
};

export default Header;
