import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { MyTranslateService } from '../../services/translate/my-translate.service';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../../shared/cart-item';
import { ProductResponse } from '../../shared/productsResponse';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth/auth.service';
import { ImageErrorDirective } from '../../directives/image-error.directive';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, NgbPaginationModule,
    ImageErrorDirective],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})

export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: string = '*';
  previousCategoryId: string = '*';
  previousKeyword: string = '';

  constructor(private productService: ProductService, 
              private route : ActivatedRoute, 
              private cartService: CartService,
              public translate: MyTranslateService,
              private toastr: ToastrService,
              private router: Router,
              public auth: AuthService,
              public loading: LoadingService) { }
  
  pageNumber: number = 1
  pageSize: number = 8
  totalElements: number = 0

  ngOnInit() {
    // this.translate.languageSubject.subscribe((language: Language) => {
    //   this.isLoading = true;  
    //   this.listProducts();
    // })
    this.cartService.getCartItems();

    this.route.paramMap.subscribe(() => {
      this.loading.isLoading.next(true);
      this.listProducts();
    })

   
  }

  listProducts() {
    if(this.route.snapshot.paramMap.has('keyword')) {
      const keyword: string = this.route.snapshot.paramMap.get('keyword') || '';
      if(this.previousKeyword !== keyword) {
        this.pageNumber = 1;
      }
      this.previousKeyword = keyword;
      this.productService.searchProducts(keyword, this.pageNumber - 1, this.pageSize).subscribe(
        (data: ProductResponse) => this.handleData(data), 
        (err) => this.handleError(err));
    }
    else{
      this.currentCategoryId = this.route.snapshot.paramMap.get('categoryId') || 'all';
      if(this.previousCategoryId !== this.currentCategoryId) {
        this.pageNumber = 1;
      }
      this.previousCategoryId = this.currentCategoryId;
      if (this.currentCategoryId === 'all') {
        this.productService.getProducts(this.pageNumber - 1, this.pageSize).subscribe(
          (data: ProductResponse) => this.handleData(data), 
          (err) => this.handleError(err));
        // this.productService.getProductsPaginated(this.pageNumber - 1, this.pageSize).subscribe((data: ProductResponse) => this.handleData(data));
      }
      else {
        this.productService.getProductsByCategory(+this.currentCategoryId, this.pageNumber - 1, this.pageSize).subscribe(
          (data: ProductResponse) => this.handleData(data), 
          (err) => this.handleError(err));
      }
      
    }
  }

  addToCart(theProduct: Product) {
    const cartItem = { product: theProduct, quantity: 1 };
    this.cartService.addToCart(cartItem);
  }

  handleData(data: ProductResponse) {
    this.products = data._embedded.products;
    this.totalElements = data.page.totalElements;
    this.pageNumber = data.page.number + 1;
    this.pageSize = data.page.size;
    this.loading.isLoading.next(false);
  }

  handleError(err: any): void {
    console.log(err);
    // this.isLoading = false;
    this.toastr.error("You can't view products", 'Error');
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe(() => {
      this.listProducts();
      // this.cartService.deleteCartItem(new CartItem(product));
      this.toastr.success('Product deleted successfully', 'Success');
    })
  }

  confirmDelete(product: Product): void {
    const result = window.confirm(`Are you sure you want to delete ${product.name[this.translate.getLanguage().code]}?`);
    if (result) {
      this.deleteProduct(product);
    }
  }

  updatePageSize(event: any) {
    this.pageSize = event.value;
    this.listProducts();
    this.loading.isLoading.next(true);
  }

  updateProduct(product: Product) {
    this.productService.setUpdatedProduct(product);
    this.router.navigate(['/update']);
  }
}