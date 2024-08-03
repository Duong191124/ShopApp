import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { enviroment } from '../../enviroment/enviroment';
import { ProductImage } from '../../common/product.image';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  currentImageIndex: number = 0;
  quantity: number = 1;
  productId: number = 0;


  constructor(private productService: ProductService,
    private cartService: CartService, private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id')!;
      this.loadProductDetails();
    });
  }

  loadProductDetails() {
    this.productService.getDetailProduct(this.productId).subscribe({
      next: (response: any) => {
        if (response.product_images && response.product_images.length > 0) {
          response.product_images.forEach((product_image: ProductImage) => {
            product_image.image_url = `${enviroment.apiBaseUrl}/products/images/${product_image.image_url}`;
          });
        }
        this.product = response;
        this.showImage(0);
      },
      error: (error: any) => {
        console.error("Error fetching detail: ", error);
      }
    });
  }

  showImage(index: number): void {
    debugger
    if (this.product && this.product.product_images && this.product.product_images.length > 0) {
      if (index < 0) {
        index = 0;
      } else if (index >= this.product.product_images.length) {
        index = this.product.product_images.length - 1
      }
    }
    this.currentImageIndex = index;
  }

  thumbnailClick(index: number) {
    debugger
    this.currentImageIndex = index;
  }

  nextImage(): void {
    debugger
    this.showImage(this.currentImageIndex + 1)
  }

  previousImage(): void {
    debugger
    this.showImage(this.currentImageIndex - 1)
  }

  addToCart(): void {
    debugger
    if (this.product) {
      this.cartService.addToCart(this.productId, this.quantity)
    } else {
      console.error('Can not add product because it null');
    }
  }

  buyNow(): void {
    this.router.navigate(['/orders']);
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

}


