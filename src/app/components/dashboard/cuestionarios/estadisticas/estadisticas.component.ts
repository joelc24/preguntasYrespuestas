import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespuestaCuestionario } from 'src/app/models/RespuestaCuestionario';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit{
  idCuestionario: number
  loading: boolean = false
  listRespuestaCuestionario : Array<any> = []

  constructor(
     private aRoute: ActivatedRoute,
     private respuestaCuestionarioService : RespuestaCuestionarioService,
     private toastTr : ToastrService
  ) {
    this.idCuestionario = +this.aRoute.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {
    this.getListCuestionarioService()
  }

  getListCuestionarioService() : void {
    this.loading = true
    this.respuestaCuestionarioService.getListCuestionarioRespuesta(this.idCuestionario).subscribe(data => {
      this.loading = false
      this.listRespuestaCuestionario = data
      console.log(data)
    }, error=> {
      this.loading = false
      console.log(error)
    })
  }

  eliminarRespuestaCuestionario(idRtaCuestionario : number) : void{
    this.loading = true
    this.respuestaCuestionarioService.eliminarRespuestaCuestionario(idRtaCuestionario).subscribe(data => {
      this.loading = false
      this.toastTr.info('La respuesta al cuestionario fue eliminada de manera exitosa!','Registro Eliminado!')
      this.getListCuestionarioService()
    },error => {
      this.loading = false
      console.log(error)
    })
  }
}
