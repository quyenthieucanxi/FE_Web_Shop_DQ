
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("@/components/Slider"), { ssr: false });


export default function SearchPage() {
    return (
        <>
            <section>
                <div className="mx-auto p-4 bg-white rounded-md max-w-[960px] mt-20">
                    < Slider />
                </div>
            </section>
        </>
    )
}