import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { RegistroComponent } from './componentes/usuarios/registro/registro.component';
import { AceptacionTerminosComponent } from './componentes/usuarios/aceptacion-terminos/aceptacion-terminos.component';
import { PerfilComponent } from './componentes/usuarios/perfil/perfil.component';

import { CabeceraComponent } from './componentes/maquetacion/cabecera/cabecera.component';
import { MenuComponent } from './componentes/maquetacion/menu/menu.component';
import { PieComponent } from './componentes/maquetacion/pie/pie.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaquetacionLoginComponent } from './componentes/maquetacion/maquetacion-login/maquetacion-login.component';
import { MaquetacionTiendaComponent } from './componentes/maquetacion/maquetacion-tienda/maquetacion-tienda.component';

@NgModule({
  declarations: [
    PieComponent,
    AppComponent,
    MenuComponent,
    LoginComponent,
    PerfilComponent,
    RegistroComponent,
    CabeceraComponent,
    AceptacionTerminosComponent,
    MaquetacionLoginComponent,
    MaquetacionTiendaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,             //Para el [(ngModel)]
    HttpClientModule,        //Para las peticiones ajax con el objeto HttpClient
    RouterModule.forRoot([]) //Para los router outlet
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
