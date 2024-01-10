import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../shared/product-category';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartStatusComponent } from '../cart-status/cart-status.component';
import { TranslateModule } from '@ngx-translate/core';
import { MyTranslateService } from '../../services/translate/my-translate.service';
import { Language } from '../../shared/language';
import { TranslateComponent } from '../translate/translate.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, 
            CartStatusComponent, RouterLinkActive, 
            TranslateModule, TranslateComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  productCategory: ProductCategory[] = [];
  language: Language = new Language('en', 'ltr');
  constructor(private productService: ProductService, 
              private router: Router,
              public translate: MyTranslateService,
              public auth: AuthService) { }
  ngOnInit() {
    this.getCategories();
    // this.translate.languageSubject.subscribe((language: Language) => {
    //   this.language = language;
    //   console.log(this.language);
    //   this.getCategories();
    // })
  }

  doSearch(searchInput: string) {
    if(!searchInput) 
      return;
    this.router.navigateByUrl(`/search/${searchInput}`);
  }
 
  getCategories() {
    this.productService.getproductCategories().subscribe((data: ProductCategory[]) => {
      console.log(data);
      this.productCategory = data;
    });
  }

  logout() {
    this.auth.logout();
  }
}
