import { Respuesta } from "./respuesta";


export class Pregunta {

    constructor(public descripcion: string, public listRespuestas: Respuesta[], pirvate, public hide?: boolean ) {
        
        
    }

}