

export class Disco  {

    public constructor(
            public id    :number = null,
            public titulo:string = null,
            public grupo :string = null,
            public year  :number = null,
            public genero:string = null,
            public notas :string = null,
        ){
        if(!id){
            //this.id = Math.round(Math.random()*10000)
            this.id = Date.now()
        }
    }    

}
