import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { Language } from './shared/language';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const language = JSON.parse(localStorage.getItem('language')!) || new Language('en', 'ltr');
export const appConfig: ApplicationConfig = {
  providers: [
              provideRouter(routes), // toaster (notification)
              provideAnimations(),
              provideToastr({positionClass: 'toast-bottom-right'}), 

              provideHttpClient(), // translate
              TranslateModule.forRoot({
                defaultLanguage: language.code,
                loader: {
                  provide: TranslateLoader,
                  useFactory: HttpLoaderFactory,
                  deps: [HttpClient]
                }
              }).providers!,
              
              { // auth interceptor (call before all requests)
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptor,
                multi: true
              }
            ]
};
