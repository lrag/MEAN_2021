import { Component, OnInit } from '@angular/core';
import { Disco } from 'src/app/entidades/disco';

@Component({
  selector: 'app-discos',
  templateUrl: './discos.component.html',
  styleUrls: ['./discos.component.css']
})
export class DiscosComponent implements OnInit {

  public disco :Disco   //Para el bidirectional binding del formulario
  public discos:Disco[] //Para la tabla
  public mensaje:string
  public error:string

  public constructor(){
    console.log("Creando una instancia de DiscosComponent")
    //
    this.disco = new Disco()
    this.discos = []
  }

  ngOnInit(): void {
  }

  //
  public insertarDisco():void{
    //Validar...
    if(this.disco.titulo==null || this.disco.titulo.trim() == ""){
      this.error = "El título es obligatorio."
      return //pa no seguir
    }

    this.error = null
    this.mensaje = "El disco se insertó correctamente"
    this.discos.push(this.disco)
    this.vaciarFormulario()
  }

  public modificarDisco():void{
  }

  public borrarDisco():void{
  }

  //
  public vaciarFormulario():void{
    this.disco = new Disco()
  }

  //
  public seleccionarDisco(id:number):void{
    for(let d of this.discos){
      if(d.id == id){
        
        //this.disco = d
        //Creamos una copia para no colocar en el formulario directamente el disco contenido en el array
        //let discoAux:Disco = new Disco(d.id, d.titulo, d.grupo, d.year, d.genero, d.notas)

        let discoAux = Object.create(d)


        this.disco = discoAux

        break
      }
    }
  }

}
