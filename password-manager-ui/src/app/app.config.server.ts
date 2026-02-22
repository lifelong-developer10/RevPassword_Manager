import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {

providers: [
  provideHttpClient(withInterceptors([jwtInterceptor]))
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
