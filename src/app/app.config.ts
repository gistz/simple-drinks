import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { AppConfigService } from './core/app-config.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadConfigurations('app-config.json');
        };
      },
      multi: true,
      deps: [AppConfigService],
    },
  ],
};
