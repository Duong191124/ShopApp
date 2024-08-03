import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { enviroment } from '../../enviroment/enviroment';
import { ProductService } from '../../services/product.service';
import { Category } from '../../common/category';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  productResponseList: Product[] = [];
  categories: Category[] = [];
  selectedCategoryId: number = 0;
  keyword: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 9;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router) {
  }

  ngOnInit() {
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage)
    this.getCategories(1, 100);
  }

  getCategories(page: number, limit: number) {
    this.categoryService.getAllCategories(page, limit).subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        console.error("Error fetching categories", error);
      }
    })
  }

  searchProducts() {
    this.currentPage = 1;
    this.itemsPerPage = 9;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage)
  }

  getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
    this.productService.getAllProducts(keyword, selectedCategoryId, page, limit).subscribe({
      next: (response: any) => {
        response.productResponseList.forEach((product: Product) => {
          product.url = `${enviroment.apiBaseUrl}/products/images/${product.thumbnail}`;
        })
        this.productResponseList = response.productResponseList;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        console.error('error fetching products: ', error);
      }
    })
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
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

  onProductClick(productId: number): void {
    debugger
    this.router.navigate(['/products', productId]);
  }

}
