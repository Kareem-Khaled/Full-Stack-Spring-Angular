import { Component, OnInit } from '@angular/core';
import { MyTranslateService } from '../../services/translate/my-translate.service';
import { Language } from '../../shared/language';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.css'
})
export class TranslateComponent implements OnInit {

  constructor(private translate: MyTranslateService) { }
  // language = new Language('en', 'ltr');

  ngOnInit() {
    // this.translate.languageSubject.subscribe((language: Language) => {
    //   this.language = language;
    // })
  }
  toggleLanguage() {
    this.translate.toggleLanguage();
    // if (this.language.code === 'en') {
    //   this.language = new Language('ar', 'rtl');
    // } else {
    //   this.language = new Language('en', 'ltr');
    // }
  }

}
