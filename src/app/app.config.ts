import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule} from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    importProvidersFrom(FormsModule),
    provideRouter(routes) 
  ]
};
