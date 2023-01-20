import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { RespuestaCuestionarioDetalle } from 'src/app/models/RespuestaCuestionarioDetalle';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-detalle-respuesta',
  templateUrl: './detalle-respuesta.component.html',
  styleUrls: ['./detalle-respuesta.component.css']
})
export class DetalleRespuestaComponent implements OnInit {
  idRespuesta: number
  loading: boolean = false
  cuestionario: Cuestionario
  respuestas: Array<RespuestaCuestionarioDetalle> = []

  constructor(
    private aRoute : ActivatedRoute,
    private respuestaCuestionarioService: RespuestaCuestionarioService
  ) {
    this.idRespuesta = +this.aRoute.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {
    this.getListRespuestasYCuestionario();
  }

  getListRespuestasYCuestionario() : void {
    this.loading = true
    this.respuestaCuestionarioService.getCuestionarioByIdRespuesta(this.idRespuesta).subscribe(data => {
      this.loading = false
      console.log(data)
      this.cuestionario = data.cuestionario
      this.respuestas = data.respuestas
    }, error => {
      this.loading = false
      console.log(error)
    })
  }
}
