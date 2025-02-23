import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { headersInterceptor } from './core/interceptes/headers/headers.interceptor';
import { errorsInterceptor } from './core/interceptes/errors/errors.interceptor';
import { loadingInterceptor } from './core/interceptes/loading/loading.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './core/utilies/httpLoadFiles';



export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideClientHydration(withEventReplay()),
      provideHttpClient(withFetch() , withInterceptors([headersInterceptor , errorsInterceptor , loadingInterceptor ]) ),
      provideAnimations(),
      provideToastr(), 
      importProvidersFrom( NgxSpinnerModule , TranslateModule.forRoot({
        defaultLanguage:'en',
        loader:{
          provide: TranslateLoader , 
          useFactory:HttpLoaderFactory , 
          deps:[HttpClient]
        }
     
      }) ),
     ]
};
