import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../shared/product';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../shared/cart-item';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  deleteCartItem(cartItem: CartItem) {
    this.cartService.deleteCartItem(cartItem);
  }
}
