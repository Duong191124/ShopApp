import { Component, OnInit } from '@angular/core';
import { Category } from '../../../common/category';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import { ApiResponse } from '../../../response/api.response';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = []; // Dữ liệu động từ categoryService
  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCategories(0, 100);
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

  insertCategory() {
    debugger
    // Điều hướng đến trang detail-category với categoryId là tham số
    this.router.navigate(['/admin/categories/insert']);
  }

  // Hàm xử lý sự kiện khi sản phẩm được bấm vào
  updateCategory(categoryId: number) {
    debugger
    this.router.navigate(['/admin/categories/update', categoryId]);
  }

  deleteCategory(category: Category) {
    const confirmation = window
      .confirm('Are you sure you want to delete this category?');
    if (confirmation) {
      debugger
      this.categoryService.deleteCategory(category.id).subscribe({
        next: (apiResponse: any) => {
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
}
