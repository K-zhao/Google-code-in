import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import ENV from '@environment';
import { AppModule } from './app.module';
import { enableProdMode } from '@angular/core';

if (ENV.PROD) {
  // Enable Angular prod mode in PROD builds only. Angular Prod mode drops a
  // considerable amount of assertions
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
