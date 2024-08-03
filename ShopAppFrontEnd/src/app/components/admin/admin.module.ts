import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminRouterModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OrdersAdminComponent } from './orders-admin/orders-admin.component';
import { OrdersDetailAdminComponent } from './orders-detail-admin/orders-detail-admin.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { UserComponent } from './user/user.component';
import { InsertCategoriesComponent } from './categories/insert/insert-categories/insert-categories.component';
import { UpdateCategoriesComponent } from './categories/update/update-categories/update-categories.component';
import { InsertProductsComponent } from './products/insert/insert-products/insert-products.component';
import { UpdateProductsComponent } from './products/update/update-products/update-products.component';



@NgModule({
    declarations: [
        AdminComponent,
        OrdersAdminComponent,
        OrdersDetailAdminComponent,
        CategoriesComponent,
        ProductsComponent,
        UserComponent,
        InsertCategoriesComponent,
        UpdateCategoriesComponent,
        InsertProductsComponent, 
        UpdateProductsComponent
    ],
    imports: [
        AdminRouterModule,
        CommonModule,
        FormsModule
    ],
})
export class AdminModule{}