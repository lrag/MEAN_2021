interface EmisorMensaje {
    enviar:(mensaje:string, destinatario:string) => boolean
}


class EmisorMensajeCorreoE implements EmisorMensaje{
    public enviar(mensaje:string, destinatario:string):boolean{
        //Enviar un correoE
        return true
    }
}

class EmisorMensajeSMS implements EmisorMensaje{
    public enviar(mensaje:string, destinatario:string):boolean{
        //Enviar un correoE
        return true
    }
}

class EmisorMensajePalomaMensajera implements EmisorMensaje{
    public enviar(mensaje:string, destinatario:string):boolean{
        //Enviar un correoE
        return true
    }
}

