import { Component } from '@angular/core';
import { MyTranslateService } from '../../../services/translate/my-translate.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  constructor(public translate: MyTranslateService,
    public auth: AuthService, private router: Router) { }

    isSearchBarActive: boolean = false;

    doSearch(searchInput: string) {
      if(!searchInput) 
        return;
      this.router.navigateByUrl(`/search/${searchInput}`);
    }
   
}
