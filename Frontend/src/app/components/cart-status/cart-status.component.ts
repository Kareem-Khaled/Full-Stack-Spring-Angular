import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent implements OnInit {
  // totalQuantity: number = 0;
  // totalPrice: number = 0;

  constructor(public cartService: CartService) { }

  ngOnInit() {
    // this.cartService.totalQuantitySubject.subscribe(
    //   data => this.totalQuantity = data
    // )
    this.cartService.getCartItems();
  }
}
