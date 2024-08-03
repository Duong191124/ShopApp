import { Injectable } from "@angular/core";
import { enviroment } from "../enviroment/enviroment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { OrderDTO } from "../common/order.dto";
import { Observable } from "rxjs";
import { OrderResponse } from "../response/order/order.response";
import { ApiResponse } from "../response/api.response";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiGetOrder = `${enviroment.apiBaseUrl}/orders`;
    private apiGetOrderDetail = `${enviroment.apiBaseUrl}/orders`;
    private apiGetAllOrders = `${enviroment.apiBaseUrl}/orders/get-orders-by-keyword`;

    constructor(private http: HttpClient) { }

    getOrder(orderDTO: OrderDTO) {
        return this.http.post(this.apiGetOrder, orderDTO);
    }

    getOrderById(orderId: number): Observable<any> {
        const url = `${enviroment.apiBaseUrl}/orders/${orderId}`;
        return this.http.get(url);
    }

    getAllOrders(keyword: string, page: number, limit: number): Observable<OrderResponse[]> {
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('page', page.toString())
            .set('limit', limit.toString())
        return this.http.get<any>(this.apiGetAllOrders, { params })
    }

    updateOrder(orderId: number, orderData: OrderDTO): Observable<ApiResponse> {
        const url = `${enviroment.apiBaseUrl}/orders/${orderId}`;
        return this.http.put<ApiResponse>(url, orderData);
    }
    deleteOrder(orderId: number): Observable<ApiResponse> {
        const url = `${enviroment.apiBaseUrl}/orders/${orderId}`;
        return this.http.delete<ApiResponse>(url);
    }
}