


interface Response {
    status: string;
    message: string;
    data: object | string;
    code: number;
}
interface PaymentResponseData {
    rspCode: string;
    message: string;
}