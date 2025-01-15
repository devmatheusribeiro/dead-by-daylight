import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ImagekitioAngularModule } from 'imagekitio-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    {
      provide: ImagekitioAngularModule,
      useFactory: () => ImagekitioAngularModule.forRoot({
        urlEndpoint: 'https://ik.imagekit.io/mnbb48o/',
        publicKey: 'public_T3ia9UetbANovbe4PzY6FjQUC/g=',
      }),
    }
  ]
};
