import { Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Language } from '../../shared/language';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService implements OnInit {

  language: Language = new Language('en', 'ltr');
  // public languageSubject: Subject<Language> = new Subject<Language>();

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.language = localStorage.getItem('language') ? JSON.parse(localStorage.getItem('language')!) : new Language('en', 'ltr');
  }


  public use(language: Language) {
    this.language = language;
    this.translate.use(this.language.code);
    // this.languageSubject.next(this.language);
    localStorage.setItem('language', JSON.stringify(this.language));
  }
  
  getLanguage(): Language {
    this.language = localStorage.getItem('language') ? JSON.parse(localStorage.getItem('language')!) : new Language('en', 'ltr');
    return this.language;
  }

  toggleLanguage(): Language {
    this.language = localStorage.getItem('language') ? JSON.parse(localStorage.getItem('language')!) : new Language('en', 'ltr');
    if (this.language.code === 'en') {
      this.language = new Language('ar', 'rtl');
    } else {
      this.language = new Language('en', 'ltr');
    }
    this.use(this.language);
    return this.language;
  }
}