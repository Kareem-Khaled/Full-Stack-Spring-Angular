import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { MyTranslateService } from '../../services/translate/my-translate.service';
import { LoadingComponent } from '../loading/loading.component';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../../shared/cart-item';
import { ProductResponse } from '../../shared/productsResponse';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth/auth.service';
import { ImageErrorDirective } from '../../directives/image-error.directive';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, LoadingComponent, NgbPaginationModule,
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
              public auth: AuthService) { }
  
  isLoading: boolean = true
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
      this.isLoading = true;
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
      this.productService.searchProducts(keyword, this.pageNumber - 1, this.pageSize).subscribe((data: ProductResponse) => this.handleData(data));
    }
    else{
      this.currentCategoryId = this.route.snapshot.paramMap.get('categoryId') || 'all';
      if(this.previousCategoryId !== this.currentCategoryId) {
        this.pageNumber = 1;
      }
      this.previousCategoryId = this.currentCategoryId;
      if (this.currentCategoryId === 'all') {
        this.productService.getProducts(this.pageNumber - 1, this.pageSize).subscribe((data: ProductResponse) => this.handleData(data));
        // this.productService.getProductsPaginated(this.pageNumber - 1, this.pageSize).subscribe((data: ProductResponse) => this.handleData(data));
      }
      else {
        this.productService.getProductsByCategory(+this.currentCategoryId, this.pageNumber - 1, this.pageSize).subscribe((data: ProductResponse) => this.handleData(data));
      }
      
    }
  }

  addToCart(theProduct: Product) {
    const cartItem = { product: theProduct, quantity: 1 };
    this.cartService.addToCart(cartItem);
  }

  handleData(data: ProductResponse) {
    console.log(data);
    this.isLoading = false;
    this.products = data._embedded.products;
    this.totalElements = data.page.totalElements;
    this.pageNumber = data.page.number + 1;
    this.pageSize = data.page.size;
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe(() => {
      this.listProducts();
      this.cartService.deleteCartItem(new CartItem(product));
      this.toastr.success('Product deleted successfully', 'Success');
    })
  }

  confirmDelete(product: Product): void {
    const result = window.confirm(`Are you sure you want to delete ${product.name}?`);
    if (result) {
      this.deleteProduct(product);
    }
  }

  updatePageSize(event: any) {
    this.isLoading = true;
    this.pageSize = event.value;
    this.listProducts();
  }

  updateProduct(product: Product) {
    this.productService.setUpdatedProduct(product);
    this.router.navigate(['/update']);
  }
}