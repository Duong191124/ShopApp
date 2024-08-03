import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { OrdersAdminComponent } from "./orders-admin/orders-admin.component";
import { OrdersDetailAdminComponent } from "./orders-detail-admin/orders-detail-admin.component";
import { CategoriesComponent } from "./categories/categories.component";
import { UpdateCategoriesComponent } from "./categories/update/update-categories/update-categories.component";
import { InsertCategoriesComponent } from "./categories/insert/insert-categories/insert-categories.component";
import { ProductsComponent } from "./products/products.component";
import { UserComponent } from "./user/user.component";
import { UpdateProductsComponent } from "./products/update/update-products/update-products.component";
import { InsertProductsComponent } from "./products/insert/insert-products/insert-products.component";

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'orders',
                component: OrdersAdminComponent
            },
            {
                path: 'orders/:id',
                component: OrdersDetailAdminComponent
            },
            {
                path: 'categories',
                component: CategoriesComponent
            },
            {
                path: 'categories/update/:id',
                component: UpdateCategoriesComponent
            },
            {
                path: 'categories/insert',
                component: InsertCategoriesComponent
            },
            {
                path: 'products',
                component: ProductsComponent
            },
            {
                path: 'products/update/:id',
                component: UpdateProductsComponent
            },
            {
                path: 'products/insert',
                component: InsertProductsComponent
            },
            {
                path: 'users',
                component: UserComponent
            }
        ]
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [RouterModule]
})
export class AdminRouterModule { }