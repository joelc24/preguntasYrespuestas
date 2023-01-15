import { Respuesta } from "./respuesta";


export class Pregunta {

    constructor(public descripcion: string, public listRespuestas: Respuesta[], public hide: boolean = true ) {
        
        
    }

}