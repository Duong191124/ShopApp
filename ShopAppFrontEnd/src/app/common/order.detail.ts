import { OrderDTO } from "./order.dto";
import { Product } from "./product";

export interface OrderDetail{
    id: number;
    order: OrderDTO;
    product: Product;
    price: number;
    number_of_products: number;
    total_money: number;
}