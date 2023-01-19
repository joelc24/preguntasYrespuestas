import { Component, OnInit } from '@angular/core';
import { RespuestaCuestionarioService } from '../../../../services/respuesta-cuestionario.service';
import { CuestionarioService } from '../../../../services/cuestionario.service';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta';
import { RespuestaCuestionario } from 'src/app/models/RespuestaCuestionario';
import { RespuestaCuestionarioDetalle } from 'src/app/models/RespuestaCuestionarioDetalle';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  idCuestionario: number
  listPreguntas: Array<Pregunta> = []
  loading: boolean = false
  rtaConfirmada: boolean = false
  opcionSeleccionada: any
  index: number = 0
  idRespuestaSeleccionada : number = 0

  listRespuestaCuestionarioDetalle: Array<RespuestaCuestionarioDetalle> = []

  ngOnInit(): void {
    this.idCuestionario = this.respuestaCuestionarioService.idCuestionario 
    if (this.idCuestionario == null) {
      this.router.navigate(['/inicio'])
      return
    }
    this.getCuestionario() 
    this.respuestaCuestionarioService.respuestas = []
  }

 
  constructor(
    private respuestaCuestionarioService : RespuestaCuestionarioService,
    private cuestionarioService : CuestionarioService, 
    private router: Router
  ) {
    
    
  }

  getCuestionario() : void {
    this.loading = true
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data =>{
      console.log(data)
      this.listPreguntas = data.listPreguntas
      this.loading = false
      this.respuestaCuestionarioService.cuestionario = data
    })
  }

  obtenerPregunta() : string {
    return this.listPreguntas[this.index].descripcion
  }

  getIndex() : number {
    return this.index
  }

  respuestaSeleccionada(respuesta : any, idRespuesta: number) : void{
    this.opcionSeleccionada = respuesta
    this.rtaConfirmada = true
    this.idRespuestaSeleccionada = idRespuesta
  }

  addClassOption(respuesta: any) : string{
    if (respuesta == this.opcionSeleccionada) {
      return 'active text-light'
    }

    return ''
  }

  siguiente(): void {
    this.respuestaCuestionarioService.respuestas.push(this.idRespuestaSeleccionada)

    //* CREAMOS UN OBJETO RESPUESTADETALLE *//
    const detalleRespuesta: RespuestaCuestionarioDetalle = {
      respuestaId: this.idRespuestaSeleccionada
    }

    //* AGREGAMOS OBJETO AL ARRAY *//
    this.listRespuestaCuestionarioDetalle.push(detalleRespuesta)

    this.rtaConfirmada = false
    this.index++
    this.idRespuestaSeleccionada = null
    if (this.index == this.listPreguntas.length) {
      this.listPreguntas = []
      this.guardarRespuestaCuestionario()
      // this.router.navigate(['/inicio/respuesta-cuestionario'])
    }
  }

  guardarRespuestaCuestionario(): void{
    const rtaCuestionario: RespuestaCuestionario = {
      cuestionarioId: this.respuestaCuestionarioService.idCuestionario,
      nombreParticipante: this.respuestaCuestionarioService.nombreParticipante,
      listRtaCuestionarioDetalle: this.listRespuestaCuestionarioDetalle
    }

    console.log(rtaCuestionario)

    this.loading = true
    this.respuestaCuestionarioService.guardarRespuestaCuestionario(rtaCuestionario).subscribe(data =>{
      this.loading = false
      this.router.navigate(['/inicio/respuesta-cuestionario'])
    }, error => {
      this.loading = false
      console.log(error)
    })
  }

}
