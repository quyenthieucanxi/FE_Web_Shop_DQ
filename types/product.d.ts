

interface Product {
    id: string,
    title: string,
    postPath: string,
    price: string,
    urlImage: string,
    description: string,
    categoryName: string,
    categoryPath: string,
    address: string,
    status: string,
    quantity: number,
    isTrend: boolean,
    requestTrend: string,
    createdTime: string,
    modifiedTime?: string,
    user: User,
}