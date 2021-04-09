import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/maquetacion/cabecera/cabecera.component';
import { MenuComponent } from './modulo/tienda/componentes/menu/menu.component'; //se agrego aqui el menu
import { PieComponent } from './componentes/maquetacion/pie/pie.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaquetacionTiendaComponent } from './modulo/tienda/componentes/maquetacion-tienda/maquetacion-tienda.component';
import { MaquetacionLoginComponent } from './modulo/usuarios/maquetacion-login/maquetacion-login.component';

import { InterceptorJWT } from './interceptores/interceptorJWT';
import { UsuariosModule } from './modulo/usuarios/usuariosModule';
import { TiendaModule } from './modulo/tienda/tiendaModule';
//import { DetallePedidoComponent } from './modulo/tienda/componentes/detalle-pedido/detallePedido.component';




@NgModule({
  declarations: [
    AppComponent,
   
    CabeceraComponent,
    PieComponent,
   // DetallePedidoComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule, //para los [(ngModel)]
    ReactiveFormsModule, //formualrio reactivos
    HttpClientModule, //para las peticiones ajx con el objeto HTTPClient
    RouterModule.forRoot(AppModule.rutasPrimerRouterOutlet),  ////Para los router outlet desde MOdule
    UsuariosModule,  ////Para los router y defuukmo la jerarquia de MOudle
    TiendaModule
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
      path      : '',   
      redirectTo: '/usuarios/login', 
      pathMatch : 'full' 
    },
    
    /*
    {
      path:'',
      component:MaquetacionLoginComponent,
      children: UsuariosModule.rutasMaquetacionLogin
    },
   */
    /*
    {
      path:'login',
      component:MaquetacionLoginComponent,
      children: UsuariosModule.rutasMaquetacionLogin
    },
    */
    //se uso el redirect
    
    {
      path:'usuarios',
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
