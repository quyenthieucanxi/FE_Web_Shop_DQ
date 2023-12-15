import { List } from "postcss/lib/list";



interface Order {
    id: string;
    quantity: number;
    totalPrice: number;
    status: string;
    payment: string;
    note: string;
    recipientName: string;
    phone: string;
    addressShipping: string;
    user?: User;
    product: Product;
    createdTime: string;
    modifiedTime: string;
}
interface OrderList {
    totalOrder: number;
    orderList : List<Order> ;
}