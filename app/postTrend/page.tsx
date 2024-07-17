


import LabTabsProductTrend from "@/components/LabsTabsProductTrend";
import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"




export default async function MyPost() {
    const session = await  getServerSession(options);
    return (
        <div>
            <div className="mx-auto max-w-[960px] bg-white mt-20 py-3 px-6">
                <div className="flex gap-3 items-center">
                    <div className="flex items-center rounded-[100%] h-12 w-12 border-1 border-slate-600">
                        <img className="w-full h-full rounded-[100%]"
                            src={session?.user?.image ?? `https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=top&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=100&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2Mjk2MTgwNw&amp;ixlib=rb-1.2.1&amp;q=80&amp;utm_campaign=api-credit&amp;utm_medium=referral&amp;utm_source=unsplash_source&amp;w=100`} alt={session?.user?.name} />
                    </div>
                    <div className="flex justify-between w-full">
                        <div className="text-sm font-bold">{session?.user?.name}</div>
                        <img className="w-[24px] h-[24px]" src="https://static.chotot.com/storage/chotot-icons/png/house.png" alt="" height="20px" />
                    </div>
                </div>
            </div>
            <div className='mx-auto max-w-[960px] bg-white border-t mb-5 h-screen max-h-[900px]  overflow-y-auto'>
                <LabTabsProductTrend tabs={["Chờ duyệt lên nổi bật","Nổi bật","Hủy duyệt lên nổi bật"]} typeDisplay="col" ByUrl={session?.user?.url} />
            </div>
        </div>
    )
}