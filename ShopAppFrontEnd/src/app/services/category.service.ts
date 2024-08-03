import { Injectable } from "@angular/core";
import { enviroment } from "../enviroment/enviroment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../common/category";
import { ApiResponse } from "../response/api.response";
import { UpdateCategoryDTO } from "../common/update.categories.dto";
import { InsertCategoryDTO } from "../common/insert.category.dto";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiGetCategory = `${enviroment.apiBaseUrl}/categories`;

    constructor(private http: HttpClient) { }

    getAllCategories(page: number, limit: number): Observable<Category[]> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<Category[]>(this.apiGetCategory, { params });
    }
    getDetailCategory(id: number): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${enviroment.apiBaseUrl}/categories/${id}`);
    }
    deleteCategory(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${enviroment.apiBaseUrl}/categories/${id}`);
    }
    updateCategory(id: number, updatedCategory: UpdateCategoryDTO): Observable<ApiResponse> {
        return this.http.put<ApiResponse>(`${enviroment.apiBaseUrl}/categories/${id}`, updatedCategory);
    }
    insertCategory(insertCategoryDTO: InsertCategoryDTO): Observable<ApiResponse> {
        // Add a new category
        return this.http.post<ApiResponse>(`${enviroment.apiBaseUrl}/categories`, insertCategoryDTO);
    }

}