import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../../shared/product';
import { ProductCategory } from '../../shared/product-category';
import { Language } from '../../shared/language';
import { MyTranslateService } from '../translate/my-translate.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private productsUrl = 'http://localhost:8080/api/products';
  private productCategoryUrl = 'http://localhost:8080/api/productCategories';
  private language: Language = new Language('en', 'ltr');
  constructor(private http: HttpClient,
              private translate: MyTranslateService) { }

  getProducts(): Observable<Product[]> {
    this.language = this.translate.getLanguage();
    return this.http.get<Product[]>(this.productsUrl).pipe(map((data: any) => 
    data._embedded.products.map((product: Product) => {
      return {
        ...product,
        name: product.name[this.language.code],
        description: product.description[this.language.code]
      }
    })));
  }
  
  getproductCategories(): Observable<ProductCategory[]> {
    this.language = this.translate.getLanguage();
    console.log(this.language);
    return this.http.get<ProductCategory[]>(this.productCategoryUrl).pipe(map((data: any) => 
      data._embedded.productCategories.map((productCategory: ProductCategory) => {
        return {
          ...productCategory,
          name: productCategory.name[this.language.code]
        }
      })
    ));
  }
  
  getProductsByCategory(currentCategoryId: number): Observable<Product[]> {
    this.language = this.translate.getLanguage();
    return this.http.get<Product[]>(this.productsUrl + `/search/findByCategoryId?id=${currentCategoryId}`).pipe(map((data: any) => 
      data._embedded.products.map((product: Product) => {
        return {
          ...product,
          name: product.name[this.language.code],
          description: product.description[this.language.code]
        }
      })
    ));
  }
  
  getProduct(productId: number): Observable<Product> {
    this.language = this.translate.getLanguage();
    return this.http.get<Product>(this.productsUrl + `/${productId}`).pipe(map((data: any) => {
      return {
        ...data,
        name: data.name[this.language.code],
        description: data.description[this.language.code]
      }
     }
    ));
  }

  searchProducts(keyword: string): Observable<Product[]> {
    this.language = this.translate.getLanguage();
    return this.http.get<Product[]>(this.productsUrl + `/search/findByNameContainingIgnoreCase?name=${keyword}`).pipe(map((data: any) => 
      data._embedded.products.map((product: Product) => {
        return {
          ...product,
          name: product.name[this.language.code],
          description: product.description[this.language.code]
        }
      })
    ));
  }
  addProduct(productData: any): Observable<Product> {
    productData = {
      ...productData,
      category: {
        id: productData.category
      }
    }
    return this.http.post<Product>(this.productsUrl + `/add`, productData);
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(this.productsUrl + `/${product.id}`);
  }
}
