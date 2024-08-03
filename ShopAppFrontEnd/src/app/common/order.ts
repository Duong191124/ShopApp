import { OrderResponse } from "../response/order/order.response"

export interface Order{
    id: number
    user_id: number
    fullname: string
    email: string
    phone_number: string
    address: string
    note: string
    order_date: Date
    status: string
    total_money: number
    shipping_method: string
    shipping_address: string
    shipping_date: Date
    payment_method: string
}