import { Component, OnInit } from '@angular/core';
import { InsertCategoryDTO } from '../../../../../common/insert.category.dto';
import { Category } from '../../../../../common/category';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../../services/category.service';
import { ProductService } from '../../../../../services/product.service';

@Component({
  selector: 'app-insert-categories',
  templateUrl: './insert-categories.component.html',
  styleUrl: './insert-categories.component.scss'
})
export class InsertCategoriesComponent implements OnInit {
  insertCategoryDTO: InsertCategoryDTO = {
    name: '',    
  };
  categories: Category[] = []; // Dữ liệu động từ categoryService
  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService   
  ) {
    
  } 
  ngOnInit() {
    
  }   

  insertCategory() {    
    this.categoryService.insertCategory(this.insertCategoryDTO).subscribe({
      next: (response) => {
        debugger
        this.router.navigate(['/admin/categories']);        
      },
      error: (error: any) => {
        debugger;
        console.log(error);
      }        
    });    
  }
}
