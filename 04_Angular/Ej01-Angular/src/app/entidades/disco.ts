

export class Disco  {

    public constructor(
            public id    :number = null,
            public titulo:string = null,
            public grupo :string = null,
            public year  :number = null
        ){
        if(!id){
            this.id = Math.round(Math.random()*10000)
        }
    }    

}




