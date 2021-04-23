import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/maquetacion/cabecera/cabecera.component';
import { PieComponent } from './componentes/maquetacion/pie/pie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaquetacionLoginComponent } from './modulos/usuarios/componentes/maquetacion-login/maquetacion-login.component';
import { UsuariosModule } from './modulos/usuarios/usuariosModule';
import { TiendaModule } from './modulos/tienda/tiendaModule';
import { MaquetacionTiendaComponent } from './modulos/tienda/componentes/maquetacion-tienda/maquetacion-tienda.component';


@NgModule({
  declarations: [
    PieComponent,
    AppComponent,
    CabeceraComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,             //Para el [(ngModel)]
    ReactiveFormsModule,     //Para los formularios reactivos y las validaciones que tanto nos gustan y tanto nos entretienen
    RouterModule.forRoot(AppModule.rutasPrimerRouterOutlet), //Para los router outlet
    UsuariosModule,
    TiendaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
  //Estas rutas son para la primera carpeta de la url
  public static rutasPrimerRouterOutlet = [     
      //{
      //  path      : '**',  
      //  component : CuatrocientosCuatroComponent 
      //},
      {
        path      : '',   
        redirectTo: '/usuarios/login', 
        pathMatch : 'full' 
      },
      {
        path      : 'usuarios',
        component : MaquetacionLoginComponent,
        children  : UsuariosModule.rutasMaquetacionLogin
      },
      {
        path      : 'tienda',
        component : MaquetacionTiendaComponent,
        children  : TiendaModule.rutasMaquetacionTienda
      }
  ]
  
}
