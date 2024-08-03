import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { enviroment } from '../../enviroment/enviroment';
import { OrderDTO } from '../../common/order.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup; //Đối tượng FormGroup để quản lý dữ liệu của form
  cartItems: { product: Product, quantity: number }[] = [];
  couponCode: string = '';
  totalAmount: number = 0;
  orderData: OrderDTO = {
    user_id: 1,
    fullName: '',
    email: '',
    phone_number: '',
    address: '',
    note: '',
    total_money: 0,
    payment_method: '',
    shipping_method: '',
    coupon_code: '',
    cart_items: []
  };

  constructor(private cartService: CartService, private router: Router, private productService: ProductService, private fb: FormBuilder, private orderService: OrderService, private tokenService: TokenService) {
    //Tạo FormGroup và các FormControl tương ứng
    this.orderForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      note: [''],
      shipping_method: [''],
      payment_method: ['']
    });
  }

  ngOnInit(): void {
    //Lấy danh sách sản phẩm từ giỏ hàng
    debugger
    //this.cartService.clearCart();
    this.orderData.user_id = this.tokenService.getUserId();
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys()); //Chuyển danh sách ID từ map giỏ hàng

    //Gọi service để lấy thông tin sản phẩm dựa trên danh sách ID
    debugger
    if(productIds.length === 0){
      return;
    }
    this.productService.getProductByIds(productIds).subscribe({
      next: (products) => {
        debugger
        //Lấy thông tin sản phẩm và số lượng từ danh sách sản phẩm và giỏ hàng
        this.cartItems = productIds.map((productId) => {
          debugger
          const product = products.find((p) => p.id === productId)
          if (product) {
            product.thumbnail = `${enviroment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }
          return {
            product: product!,
            quantity: cart.get(productId)!
          };
        });
      },
      complete: () => {
        debugger
        this.calculatorTotal();
      },
      error: (error: any) => {
        debugger
        console.error("Error fetching orderConfirm: ", error);
      }
    })
  }

  calculatorTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity, 0
    )
  }

  placeOrder() {
    debugger
    if (this.orderForm.valid) {
      //Sử dụng toán tử spread (...) để sao chép giá trị từ form vào orderData
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value
      }

      this.orderData.cart_items = this.cartItems.map(cartItem => ({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity
      }))
      //Dữ liệu hợp lệ, có thể gửi đơn hàng đi
      this.orderService.getOrder(this.orderData).subscribe({
        next: (response) => {
          debugger
          alert('Đặt hàng thành công');
          this.cartService.clearCart();
          this.router.navigate(['/']);
        },
        complete: () => {
          debugger;
          this.calculatorTotal();
        },
        error: (error:any) => {
          debugger;
          alert(`Lỗi khi đặt hàng ${error}`)
        }
      })
    }else{
      //Hiển thị thông báo lỗi
      alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại')
    }
  }

}
