

export default  async function Product( Props: Product) {
    const {name, price,image, address, time} = Props;   
    return (
        <div className="flex flex-col hover:cursor-pointer hover:border p-3 hover:shadow-md rounded-lg">
            <a className="mb-2" href="">
                <img className="rounded-sm" src={image} alt={name} loading="lazy" />
                <span className="text-sm">{name}</span>
            </a>
            <span className="font-bold text-[15px] text-red-500">{price} đ</span>
            <div className="mt-2 flex items-center text-gray-500">
                <a href="">
                    <img src="https://static.chotot.com/storage/chotot-icons/next/shop.svg" alt="icon" />
                </a>
                <div className="relative after:inline-block after:content-['.'] after:bottom-1/4 after:-translate-y-1/4 after:ml-1">
                </div>
                <span className="text-[10px] mx-[3px] whitespace-nowrap">{time}</span>
                <div className="relative after:inline-block after:content-['.'] after:bottom-1/4 after:-translate-y-1/4 after:mr-1">
                </div>
                <span className="text-[10px] truncate ">{address}</span>
            </div>
            
        </div>
    )
}