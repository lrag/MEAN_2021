import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './modulos/usuarios/componentes/login/login.component';
import { RegistroComponent } from './modulos/usuarios/componentes/registro/registro.component';
import { AceptacionTerminosComponent } from './modulos/usuarios/componentes/aceptacion-terminos/aceptacion-terminos.component';
import { PerfilComponent } from './modulos/usuarios/componentes/perfil/perfil.component';

import { CabeceraComponent } from './componentes/maquetacion/cabecera/cabecera.component';
import { MenuComponent } from './modulos/tienda/componentes/menu/menu.component';
import { PieComponent } from './componentes/maquetacion/pie/pie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaquetacionLoginComponent } from './modulos/usuarios/componentes/maquetacion-login/maquetacion-login.component';
import { MaquetacionTiendaComponent } from './modulos/tienda/componentes/maquetacion-tienda/maquetacion-tienda.component';
import { SessionService } from './servicios/sessionService';
import { AutenticacionService } from './modulos/usuarios/servicios/autenticacionService';
import { InterceptorJWT } from './interceptores/interceptorJWT';
import { UsuariosModule } from './modulos/usuarios/usuariosModule';
import { TiendaModule } from './modulos/tienda/tiendaModule';
import { CatalogoComponent } from './modulos/tienda/componentes/catalogo/catalogo.component';


@NgModule({
  declarations: [
    PieComponent,
    AppComponent,
    CabeceraComponent,
    CatalogoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,             //Para el [(ngModel)]
    ReactiveFormsModule,     //Para los formularios reactivos y las validaciones que tanto nos gustan y tanto nos entretienen
    HttpClientModule,        //Para las peticiones ajax con el objeto HttpClient
    RouterModule.forRoot(AppModule.rutasPrimerRouterOutlet), //Para los router outlet
    UsuariosModule
  ],
  providers: [
    //Para registrar un interceptor HTTP:
    {
      provide : HTTP_INTERCEPTORS,
      useClass : InterceptorJWT,
      multi : true
    }
  ],
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
