import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { MyTranslateService } from '../../services/translate/my-translate.service';
import { Language } from '../../shared/language';
import { LoadingComponent } from '../loading/loading.component';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../../shared/cart-item';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, LoadingComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})

export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: string = '*';

  constructor(private productService: ProductService, 
              private route : ActivatedRoute, 
              private cartService: CartService,
              private translate: MyTranslateService,
              private toastr: ToastrService) { }
  
  isLoading: boolean = true

  ngOnInit() {
    this.translate.languageSubject.subscribe((language: Language) => {
      this.isLoading = true;  
      this.listProducts();
    })
    this.route.paramMap.subscribe(() => {
      this.isLoading = true;
      this.listProducts();
    })
  }

  listProducts() {
    if(this.route.snapshot.paramMap.has('keyword')) {
      const keyword: string = this.route.snapshot.paramMap.get('keyword') || '';
      this.productService.searchProducts(keyword).subscribe((data: Product[]) => this.handleData(data));
    }
    else{
      this.currentCategoryId = this.route.snapshot.paramMap.get('categoryId') || 'all';
      if (this.currentCategoryId === 'all') {
        this.productService.getProducts().subscribe((data: Product[]) => this.handleData(data));
      }
      else {
        this.productService.getProductsByCategory(+this.currentCategoryId).subscribe((data: Product[]) => this.handleData(data));
      }
      
    }
  }

  addToCart(theProduct: Product) {
    const cartItem = { product: theProduct, quantity: 1 };
    this.cartService.addToCart(cartItem);
  }

  handleData(data: Product[]) {
    console.log(data);
    this.products = data;
    this.isLoading = false;
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
}