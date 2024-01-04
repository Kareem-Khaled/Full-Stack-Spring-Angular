import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Language } from '../../shared/language';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {

  constructor(private translate: TranslateService) { }

  language: Language = new Language('en', 'ltr');
  public languageSubject: Subject<Language> = new Subject<Language>();

  public use(language: Language) {
    this.language = language;
    this.translate.use(this.language.code);
    this.languageSubject.next(this.language);
  }
  
  getLanguage(): Language {
    return this.language;
  }

}