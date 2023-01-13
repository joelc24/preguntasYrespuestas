

export class Respuesta {
    id? : number
    descripcion: string
    esCorrecta: boolean

    constructor(descipcion: string, esCorrecta: boolean, id?: number) {
        
        this.id = id
        this.descripcion = descipcion
        this.esCorrecta = esCorrecta
    }
}