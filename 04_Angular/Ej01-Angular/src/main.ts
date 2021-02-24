import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


//Este es el único código que debe haber en todo el proyecto
//que esté fuera de una función

if (environment.production) {
  enableProdMode();
}

//En el main idicamos cuál módulo es el principal
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
