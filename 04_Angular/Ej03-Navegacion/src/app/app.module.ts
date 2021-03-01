import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { Componente1Component } from './componentes/componente1/componente1.component';
import { Componente2Component } from './componentes/componente2/componente2.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { RouterModule, Routes } from '@angular/router';

/*
Para indicar a Angular qué queremos colocar en un <router-outlet> usaremos
la barra del navegador

Se definirán una serie de 'reglas de navegacion' o rutas que asocien una ruta a un componente
que se colocará en el <router-outlet>

las rutas son así:

{
 path      : '/movida, //Se admiten rutas absolutas y relativas
 component : Componente
}

Las rutas estarán en un bonito array
*/

let rutas:Routes = [
  {
    path : 'componente1',
    component : Componente1Component
  },
  {
    path : 'componente2',
    component : Componente2Component
  },
  {
    path : 'componente2/:dato1/:dato2',
    component : Componente2Component
  }
]

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    Componente1Component,
    Componente2Component,
    MenuComponent
  ],
  imports: [
    BrowserModule,   
    RouterModule.forRoot(rutas)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
