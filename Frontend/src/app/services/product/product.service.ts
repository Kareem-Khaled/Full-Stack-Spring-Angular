import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Product } from '../../shared/product';
import { ProductCategory } from '../../shared/product-category';
import { Language } from '../../shared/language';
import { MyTranslateService } from '../translate/my-translate.service';
import { ProductResponse } from '../../shared/productsResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private productsUrl = 'http://localhost:8080/api/products';
  private productCategoryUrl = 'http://localhost:8080/api/productCategories';
  currentProduct = new Subject<Product | null>();
  // private language: Language = new Language('en', 'ltr');
  constructor(private http: HttpClient,
              private router: Router) { }

  getProducts(page: number, size: number): Observable<ProductResponse> {
    // this.language = this.translate.getLanguage();
    return this.http.get<ProductResponse>(this.productsUrl + `?page=${page}&size=${size}`);
  }

  // getProducts(): Observable<ProductResponse> {
  //   // this.language = this.translate.getLanguage();
  //   return this.http.get<ProductResponse>(this.productsUrl);
  // }
  
  getproductCategories(): Observable<ProductCategory[]> {
    // this.language = this.translate.getLanguage();
    // console.log(this.language);
    return this.http.get<ProductCategory[]>(this.productCategoryUrl).pipe(map((data: any) => 
      data._embedded.productCategories
    ));
  }
  
  getProductsByCategory(currentCategoryId: number, page: number, size: number): Observable<ProductResponse> {
    // this.language = this.translate.getLanguage();
    return this.http.get<ProductResponse>(this.productsUrl + `/search/findByCategoryId?id=${currentCategoryId}&page=${page}&size=${size}`);
  }
  
  getProduct(productId: number): Observable<Product> {
    // this.language = this.translate.getLanguage();
    return this.http.get<Product>(this.productsUrl + '/custom' + `/${productId}`);
  }

  searchProducts(keyword: string, page: number, size: number): Observable<ProductResponse> {
    // this.language = this.translate.getLanguage();
    return this.http.get<ProductResponse>(this.productsUrl + `/search/findByNameContainingIgnoreCase?name=${keyword}&page=${page}&size=${size}`);
  }
  addProduct(productData: any): Observable<Product> {
    productData = {
      ...productData,
      category: {
        id: productData.category
      }
    }
    console.log(productData);
    return this.http.post<Product>(this.productsUrl + `/custom`, productData);
  }

  getProductCategory(id: number): Observable<ProductCategory> {
    return this.http.get<ProductCategory>(this.productsUrl + `/${id}` + `/category`);
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(this.productsUrl + `/${product.id}`);
  }

  // getUpdatedProduct(): Product | null {
  //   // return this.currentProduct
  //   return null;
  // }

  setUpdatedProduct(product: Product | null) {
    if(product){
      this.getProduct(product.id).subscribe(
        data => this.currentProduct.next(data)
      )
    }
    else
      this.currentProduct.next(null);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.productsUrl + `/${product.id}`, product);
  }
}


// .pipe(map((data: any) => 
//       data._embedded.products.map((product: Product) => {
//         return {
//           ...product,
//           name: product.name[this.language.code],
//           description: product.description[this.language.code]
//         }
//       })
//     ));