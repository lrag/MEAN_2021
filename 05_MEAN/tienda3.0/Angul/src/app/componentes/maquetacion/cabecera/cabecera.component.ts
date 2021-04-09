
// definimos una clase hasta que no tenga un decorador no sera un componente

import { Component } from "@angular/core";

@Component({
    selector    :    "app-cabecera", //define el lugar de  la plantilla donde lo usara
    templateUrl : "./cabecera.component.html"

}) //para que tome la clase como componente, asi mismo trae el import

export class CabeceraComponent{

    public constructor(){
        console.log("Creando Cabecera Components...");
    }
   
}