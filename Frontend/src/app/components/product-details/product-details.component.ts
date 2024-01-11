import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MyTranslateService } from '../../services/translate/my-translate.service';
import { Language } from '../../shared/language';
import { ImageErrorDirective } from '../../directives/image-error.directive';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, ImageErrorDirective],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product = {} as Product;
  quantity: number = 1;

  constructor(private productService: ProductService, 
              private route: ActivatedRoute, 
              private cartService: CartService,
              public translate: MyTranslateService,
              public auth: AuthService) { }

  ngOnInit(): void {
    // this.translate.languageSubject.subscribe((language: Language) => {
    //   console.log(language);
    //   this.handleProductDetails();
    // })
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get('productId')!;

    this.productService.getProduct(theProductId).subscribe(
      data => this.product = data
    )
  }

  addToCart(product: Product) {
    console.log(product);
    const cartItem = { product, quantity: +this.quantity };
    this.cartService.addToCart(cartItem);
  }
    
}
