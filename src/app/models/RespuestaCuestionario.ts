import { RespuestaCuestionarioDetalle } from "./RespuestaCuestionarioDetalle"

export class RespuestaCuestionario {
    cuestionarioId: number
    nombreParticipante: string
    fecha?: Date
    listRtaCuestionarioDetalle: Array<RespuestaCuestionarioDetalle>
}