import { Usuario } from "../../usuarios/entidades/usuario";

export class Incidencia {

    public constructor(
        public _id:String = null,
        public nombre:String = null,
        public descripcion:String = null,
        public fecha:String = null,
        public estado:String = null,
        public prioridad:String = null,
        public usuario:Usuario = null,
    ){
    }

}

