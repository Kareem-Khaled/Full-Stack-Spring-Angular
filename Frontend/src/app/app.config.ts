import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
              provideRouter(routes), // toaster (notification)
              provideAnimations(),
              provideToastr({positionClass: 'toast-bottom-right'}), 

              provideHttpClient(), // translate
              TranslateModule.forRoot({
                defaultLanguage: 'en',
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
