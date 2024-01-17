import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product/product.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartService } from './services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from './services/translate/my-translate.service';
import { Language } from './shared/language';
import { AuthService } from './services/auth/auth.service';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, 
    ProductListComponent, NavbarComponent, FooterComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ProductService, CartService, ToastrService],
})
export class AppComponent implements OnInit {
  title = 'Shopping Cart App';
  textDir = 'ltr';
  constructor(public translate: MyTranslateService,
              public auth: AuthService) {}

  ngOnInit() {
    // this.translate.use('en');
    // this.translate.languageSubject.subscribe((language: Language) => {
    //   this.textDir = language.dir;
    // })
  }
  
}
