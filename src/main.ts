import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CookieService } from 'ngx-cookie-service';

bootstrapApplication(AppComponent,{...appConfig,
  providers:[
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(), provideAnimationsAsync(),
    CookieService
  ]
} )
  .catch((err) => console.error(err));
