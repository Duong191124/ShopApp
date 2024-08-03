import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderResponse } from '../../../response/order/order.response';
import { OrderService } from '../../../services/order.service';
import { ApiResponse } from '../../../response/api.response';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrl: './orders-admin.component.scss'
})
export class OrdersAdminComponent implements OnInit {
  orders: OrderResponse[] = [];
  currentPage: number = 1;
  itemPerPage: number = 9;
  page: number[] = []
  totalPages: number = 0
  keyword: string = ""
  visiblePages: number[] = []

  constructor(private orderService: OrderService, private router: Router){}

  ngOnInit(): void {
    this.getAllOrders(this.keyword, this.currentPage, this.itemPerPage)
  }
  getAllOrders(keyword: string, page: number, limit: number){
    debugger
    this.orderService.getAllOrders(keyword, page, limit).subscribe({
      next: (response: any) => {
        debugger
        this.orders = response.orders;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages)
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger
        console.error("Error fetching products: ", error);
      }
    })
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getAllOrders(this.keyword, this.currentPage, this.itemPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1)
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }

  deleteOrder(id:number) {
    const confirmation = window
      .confirm('Are you sure you want to delete this order?');
    if (confirmation) {
      debugger
      this.orderService.deleteOrder(id).subscribe({
        next: (response: ApiResponse) => {
          debugger 
          location.reload();          
        },
        complete: () => {
          debugger;          
        },
        error: (error: any) => {
          debugger;
          console.log(error);
        }
      });    
    }
  }

  OnOrderClick(order: OrderResponse): void {
    debugger
    this.router.navigate(['/admin/orders', order.id]);
  }
}
