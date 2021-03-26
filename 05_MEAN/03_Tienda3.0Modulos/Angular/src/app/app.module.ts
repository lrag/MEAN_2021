import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/maquetacion/cabecera/cabecera.component';
import { PieComponent } from './componentes/maquetacion/pie/pie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaquetacionTiendaComponent } from './modulo/tienda/maquetacion-tienda/maquetacion-tienda.component';
import { InterceptorJWT } from './interceptores/interceptorJWT';
import { UsuariosModule } from './modulo/usuarios/usuariosModule';
import { MaquetacionLoginComponent } from './modulo/usuarios/maquetacion-login/maquetacion-login.component';
import { TiendaModule } from './modulo/tienda/tiendaModule';




@NgModule({
  declarations: [
    AppComponent,
    //UsuariosLoginComponent,
    //RegistroComponent,
    //PerfilUsuariosComponent,
    //PerfilComponent,
    CabeceraComponent,
    PieComponent,
    //MenuComponent,
    //MaquetacionLoginComponent,
    //MaquetacionTiendaComponent,
    //AceptacionTerminosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, //para los [(ngModel)]
    ReactiveFormsModule, //formualrio reactivos
    HttpClientModule, //para las peticiones ajx con el objeto HTTPClient
    RouterModule.forRoot(AppModule.rutasPrimerRouterOutlet),  ////Para los router outlet desde MOdule
    UsuariosModule  ////Para los router y defuukmo la jerarquia de MOudle
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

   
  public static rutasPrimerRouterOutlet=[
    {
      path:'',
      component:MaquetacionLoginComponent,
      children: UsuariosModule.rutasMaquetacionLogin
    },
    {
      path:'login',
      component:MaquetacionLoginComponent,
      children: UsuariosModule.rutasMaquetacionLogin
    },
    {
      path:'tienda',
      component:MaquetacionTiendaComponent,
      children: TiendaModule.rutasMaquetacionTienda
    }
    
   
  ]
  

 }
