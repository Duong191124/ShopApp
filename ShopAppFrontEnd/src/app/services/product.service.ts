import { Injectable } from "@angular/core";
import { enviroment } from "../enviroment/enviroment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../common/product";
import { ApiResponse } from "../response/api.response";
import { UpdateProductDTO } from "../common/update.products.dto";
import { InsertProductDTO } from "../common/insert.products.dto";

 @Injectable({
    providedIn: 'root'
 })
 export class ProductService{
    private apiGetProducts = `${enviroment.apiBaseUrl}/products`;

    constructor(private http: HttpClient) {}

    getAllProducts(keyword: string, categoryId: number, page: number, limit: number): Observable<Product[]>{
        const params = new HttpParams()
        .set('keyword', keyword)
        .set('category_id', categoryId)
        .set('page', page.toString())
        .set('limit', limit.toString());
        return this.http.get<Product[]>(this.apiGetProducts, {params});
    }

    getDetailProduct(productId: number): Observable<Product>{
      return this.http.get<Product>(`${enviroment.apiBaseUrl}/products/${productId}`);
    }

    getProductByIds(productIds: number[]): Observable<Product[]>{
      //Chuyển danh sách ID thành 1 chuỗi và truyền vào params
      debugger
      const params = new HttpParams()
       .set('ids', productIds.join(','));
      return this.http.get<Product[]>(`${this.apiGetProducts}/ids`, {params}); 
    }
    deleteProduct(productId: number): Observable<ApiResponse> {
      debugger
      return this.http.delete<ApiResponse>(`${enviroment.apiBaseUrl}/products/${productId}`);
    }
    updateProduct(productId: number, updatedProduct: UpdateProductDTO): Observable<ApiResponse> {
      return this.http.put<ApiResponse>(`${enviroment.apiBaseUrl}/products/${productId}`, updatedProduct);
    }  
    insertProduct(insertProductDTO: InsertProductDTO): Observable<ApiResponse> {
      // Add a new product
      return this.http.post<ApiResponse>(`${enviroment.apiBaseUrl}/products`, insertProductDTO);
    }
    uploadImages(productId: number, files: File[]): Observable<ApiResponse> {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
      // Upload images for the specified product id
      return this.http.post<ApiResponse>(`${enviroment.apiBaseUrl}/products/uploads/${productId}`, formData);
    }
    deleteProductImage(id: number): Observable<any> {
      debugger
      return this.http.delete<string>(`${enviroment.apiBaseUrl}/product_images/${id}`);
    }

 }