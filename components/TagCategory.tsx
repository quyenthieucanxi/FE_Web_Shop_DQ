

interface Props  {
    text: string,
    urlImg: string
}

export default function TagCategory ({urlImg,text}: Props) {
    return (
        <div className="relative">
            <a className="flex flex-col justify-center " href="">
                <img className="rouded-md w-full h-full" src={urlImg} alt={text} loading="lazy" />
                <span className="text-sm text-center mt-2 w-28 absolute left-[-12px] top-[76px]">{text}</span>
            </a>
        </div>
    )
}