import { Component, OnInit } from '@angular/core';
import { enviroment } from '../../../enviroment/enviroment';
import { OrderDetail } from '../../../common/order.detail';
import { OrderService } from '../../../services/order.service';
<<<<<<<< HEAD:src/app/components/admin/orders-detail-admin/orders-detail-admin.component.ts
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetail } from '../../../common/order.detail';
import { enviroment } from '../../../enviroment/enviroment';
import { OrderDTO } from '../../../common/order.dto';
import { ApiResponse } from '../../../response/api.response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-orders-detail-admin',
  templateUrl: './orders-detail-admin.component.html',
  styleUrl: './orders-detail-admin.component.scss'
})
export class OrdersDetailAdminComponent implements OnInit {
  orderId: number = 0;
========
import { ActivatedRoute } from '@angular/router';
import { OrderResponse } from '../../../response/order/order.response';

@Component({
  selector: 'app-order-detail-admin',
  templateUrl: './order-detail-admin.component.html',
  styleUrl: './order-detail-admin.component.scss'
})
export class OrderDetailAdminComponent implements OnInit {
>>>>>>>> 93e6e0f28eabff23bac49d360cfaebe95221f26f:src/app/components/admin/order-detail-admin/order-detail-admin.component.ts
  orderResponse: OrderResponse = {
    id: 0,
    user_id: 0,
    fullname: '',
    phone_number: '',
    email: '',
    address: '',
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0,
    shipping_method: '',
    shipping_address: '',
    shipping_date: new Date(),
    payment_method: '',
    order_details: []
  }

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    debugger
    this.getOrderDetails()
  }

  getOrderDetails(): void {
    debugger
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
<<<<<<<< HEAD:src/app/components/admin/orders-detail-admin/orders-detail-admin.component.ts
    this.orderId = orderId;
========
>>>>>>>> 93e6e0f28eabff23bac49d360cfaebe95221f26f:src/app/components/admin/order-detail-admin/order-detail-admin.component.ts
    this.orderService.getOrderById(orderId).subscribe({
      next: (response: any) => {
        debugger
        this.orderResponse.id = response.id;
        this.orderResponse.user_id = response.user_id;
        this.orderResponse.fullname = response.fullname;
        this.orderResponse.email = response.email;
        this.orderResponse.phone_number = response.phone_number;
        this.orderResponse.address = response.address;
        this.orderResponse.note = response.note
        this.orderResponse.order_date = new Date(
          response.order_date[0],
          response.order_date[1] - 1,
          response.order_date[2]
        );
        this.orderResponse.status = response.status;
        this.orderResponse.total_money = response.total_money;
        this.orderResponse.shipping_address = response.shipping_address;
        this.orderResponse.shipping_method = response.shipping_method;
        this.orderResponse.shipping_date = new Date(
          response.shipping_date[0],
          response.shipping_date[1] - 1,
          response.shipping_date[2]
        );
        this.orderResponse.payment_method = response.payment_method;
        this.orderResponse.order_details = response.order_details.map((order_detail: OrderDetail) => {
          order_detail.product.thumbnail = `${enviroment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
          return order_detail;
        })
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error("Error fetching orderDetail: ", error);
      }
    })
  }

  saveOrder(): void {
    debugger
    this.orderService
      .updateOrder(this.orderId, new OrderDTO(this.orderResponse))
      .subscribe({
        next: (response: ApiResponse) => {
          debugger
          console.log(response);
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        complete: () => {
          debugger;
        },
        error: (error: HttpErrorResponse) => {
          debugger;
          console.log(error);
          this.router.navigate(['../'], { relativeTo: this.route });
        }
      });
  }

}
