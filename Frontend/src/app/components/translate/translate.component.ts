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
  language = new Language('en', 'ltr');

  ngOnInit() {
    this.translate.languageSubject.subscribe((language: Language) => {
      this.language = language;
    })
  }
  toggleLanguage() {
    this.language = this.language.code === 'en' ? new Language('ar', 'rtl') : new Language('en', 'ltr');
    this.translate.use(this.language);
  }

}
