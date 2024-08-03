import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../../common/category';
import { CategoryService } from '../../../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateCategoryDTO } from '../../../../../common/update.categories.dto';

@Component({
  selector: 'app-update-categories',
  templateUrl: 'update-categories.component.html',
  styleUrl: './update-categories.component.scss'
})
export class UpdateCategoriesComponent implements OnInit {
  categoryId: number;
  updatedCategory: Category;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    this.categoryId = 0;
    this.updatedCategory = {} as Category;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      debugger
      this.categoryId = Number(params.get('id'));
      this.getCategoryDetails();
    });

  }

  getCategoryDetails(): void {
    this.categoryService.getDetailCategory(this.categoryId).subscribe({
      next: (apiResponse: any) => {
        this.updatedCategory = { ...apiResponse.data };
      },
      complete: () => {

      },
      error: (error: any) => {
        debugger;
        console.log(error);
      }
    });
  }
  updateCategory() {
    // Implement your update logic here
    const updateCategoryDTO: UpdateCategoryDTO = {
      name: this.updatedCategory.name,
    };
    this.categoryService.updateCategory(this.updatedCategory.id, updateCategoryDTO).subscribe({
      next: (response: any) => {
        debugger
      },
      complete: () => {
        debugger;
        this.router.navigate(['/admin/categories']);
      },
      error: (error: any) => {
        debugger;
        console.log(error);
      }
    });
  }
}
