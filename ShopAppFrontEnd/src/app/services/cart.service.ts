import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cart: Map<number, number> = new Map(); //Dùng map để lưu trữ giỏ hàng, key là id sản phẩm, value là số lượng sản phẩm khi thêm vào

    constructor(private productService: ProductService) {
        //Lấy dữ liệu giỏ hàng từ localStorage khi khởi tạo service
        debugger
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
            this.cart = new Map(JSON.parse(storedCart));
        }
    }

    addToCart(productId: number, quantity: number = 1): void {
        debugger
        if (this.cart.has(productId)) {
            //Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên 'quantity'
            this.cart.set(productId, this.cart.get(productId)! + quantity);
        } else {
            //Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào với số lượng là 'quantity'
            this.cart.set(productId, quantity);
        }
        //Lưu thay đổi giỏ hàng và lưu vào localStorage
        this.saveCartToLocalStorage();
    }

    getCart(): Map<number, number> {
        return this.cart
    }

    private saveCartToLocalStorage(): void {
        debugger
        localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
    }

    //Hàm xóa giỏ hàng và cập nhật vào localStorage
    clearCart(): void{
        this.cart.clear(); //xóa toàn bộ dữ liệu trong giỏ hàng
        this.saveCartToLocalStorage();  //lưu vào localStorage
    }

}