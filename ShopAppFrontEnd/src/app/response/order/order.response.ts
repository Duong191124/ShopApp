import { OrderDetail } from "../../common/order.detail";

export class OrderResponse{
    id: number;
    user_id: number;
    fullname: string;
    phone_number: string;
    email: string;
    address: string;
    note: string;
    order_date: Date
    status: string;
    total_money: number;
    shipping_method: string;
    shipping_address: string;
    shipping_date: Date;
    payment_method: string;
    order_details: OrderDetail[];

    constructor(data: any){
        this.id = data.id
        this.user_id = data.user_id
        this.fullname = data.fullname
        this.phone_number = data.phone_number
        this.email = data.email
        this.address = data.address
        this.note = data.note
        this.order_date = data.order_date
        this.status = data.status
        this.total_money = data.total_money
        this.shipping_method = data.shipping_method
        this.shipping_address = data.shipping_address
        this.shipping_date = data.shipping_date
        this.payment_method = data.payment_method
        this.order_details = data.order_details
    }
}