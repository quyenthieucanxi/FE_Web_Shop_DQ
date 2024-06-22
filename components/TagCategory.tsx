import Link from "next/link"

interface Props  {
    urlImg: string,
    catName: string,
    catPath: string,
}

export default function TagCategory ({urlImg,catName,catPath}: Props) {
    return (
        <div className="relative h-[90px]">
            <Link className="flex flex-col justify-center items-center" href={`/${catPath}`}>
                <img className="rouded-md w-full h-full" src={urlImg} alt={catName} loading="lazy" />
                <span className="text-sm text-center mt-2 w-28 absolute left-[-12px] top-[76px]">{catName}</span>
            </Link>
        </div>
    )
}