import { Pregunta } from "./pregunta"


export class Cuestionario {
[x: string]: any
    id?: number
    nombre: string
    descripcion: string
    fechaCreacion?: Date
    listPreguntas: Pregunta[]

    
    constructor(nombre: string, descripcion: string, fechaCreacion: Date, listPreguntas: Pregunta[]) {
        
        this.nombre = nombre
        this.descripcion = descripcion
        this.fechaCreacion = fechaCreacion
        this.listPreguntas = listPreguntas
    }
}