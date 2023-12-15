

interface Product {
    id: string,
    title: string,
    postPath: string,
    price: string,
    urlImage: string,
    description: string,
    categoryName: string,
    address: string,
    status: string,
    quantity: number,
    createdTime: string,
    modifiedTime?: string,
    user: User,
}