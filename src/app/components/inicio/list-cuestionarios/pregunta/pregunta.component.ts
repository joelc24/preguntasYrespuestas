import { Component, OnInit } from '@angular/core';
import { RespuestaCuestionarioService } from '../../../../services/respuesta-cuestionario.service';
import { CuestionarioService } from '../../../../services/cuestionario.service';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta';

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
  ngOnInit(): void {
    this.idCuestionario = this.respuestaCuestionario.idCuestionario 
    if (this.idCuestionario == null) {
      this.router.navigate(['/inicio'])
      return
    }
    this.getCuestionario() 
    this.respuestaCuestionario.respuestas = []
  }

 
  constructor(
    private respuestaCuestionario : RespuestaCuestionarioService,
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
      this.respuestaCuestionario.cuestionario = data
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

  siguiente():  void {
    this.respuestaCuestionario.respuestas.push(this.idRespuestaSeleccionada)
    this.rtaConfirmada = false
    this.index++
    this.idRespuestaSeleccionada = null
    if (this.index == this.listPreguntas.length) {
      this.router.navigate(['/inicio/respuesta-cuestionario'])
    }
  }


}
