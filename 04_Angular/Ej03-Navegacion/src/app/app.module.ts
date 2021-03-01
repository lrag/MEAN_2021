import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { Componente1Component } from './componentes/componente1/componente1.component';
import { Componente2Component } from './componentes/componente2/componente2.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { RouterModule } from '@angular/router';


let rutas = [
  {
    path : 'componente1',
    component : Componente1Component
  },
  {
    path : 'componente2',
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
