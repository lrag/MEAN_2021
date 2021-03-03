import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { ListadoUsuariosComponent } from './componentes/listado-usuarios/listado-usuarios.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { PieComponent } from './componentes/pie/pie.component';
import { HttpClientModule } from '@Angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PieComponent,
    MenuComponent,
    CabeceraComponent,
    ListadoUsuariosComponent
  ],
  imports: [
    BrowserModule,
    //Si no importamos este módulo no nos podrán inyectar el objeto HttpClient
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
