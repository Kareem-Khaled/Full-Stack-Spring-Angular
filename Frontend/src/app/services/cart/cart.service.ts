import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../../shared/cart-item';
import { ToastrService } from 'ngx-toastr';
import { MyTranslateService } from '../translate/my-translate.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private toastr: ToastrService,
              public translate: MyTranslateService) { }

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  // totalQuantitySubject: Subject<number> = new Subject<number>();
  addToCart(cartItem: CartItem) {
    let existingItem = false;
    let outOfStock = (cartItem.quantity > cartItem.product.quantity);
    this.cartItems.forEach(item => {
      if(item.product.id === cartItem.product.id) {
        outOfStock = outOfStock || (cartItem.quantity > cartItem.product.quantity - item.quantity);
        if(outOfStock) return;
        item.quantity += cartItem.quantity;
        existingItem = true;
        return;
      }
    })
    if(outOfStock) {
      this.toastr.error(`Product ${cartItem.product.name} is out of stock!`, 'Error!');
      return;
    }
    if(!existingItem) {
      this.cartItems.push(cartItem);
    }
    this.totalPrice += cartItem.product.price * cartItem.quantity;
    this.totalQuantity += cartItem.quantity;
    // this.totalQuantitySubject.next(this.totalQuantity);
    console.log("added to cart", cartItem);
    this.toastr.success(`Added ${cartItem.product.name} to cart!`, 'Success!');
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  deleteCartItem(cartItem: CartItem) {
    console.log(cartItem);
    let item = this.cartItems.find(item => item.product.id === cartItem.product.id);
    if(!item) return;
    // this.totalQuantitySubject.next(this.totalQuantity);
    // if(!item) {
    //   item = {
    //     product: cartItem.product,
    //     quantity: 0
    //   }
    // }
    this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    this.totalPrice -= cartItem.product.price * item!.quantity;
    this.totalQuantity -= item!.quantity;
    // this.totalQuantitySubject.next(this.totalQuantity);
    this.toastr.success(`Removed ${cartItem.product.name[this.translate.getLanguage().code]} from the cart!`, 'Success!');
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems(): CartItem[] {
      this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      this.totalQuantity = 0;
      this.totalPrice = 0;
      this.cartItems.forEach(item => {
        this.totalPrice += item.product.price * item.quantity;
        this.totalQuantity += item.quantity;
      })
      // this.totalQuantitySubject.next(this.totalQuantity);
      return this.cartItems;
  }
}
