import { Component, OnInit } from '@angular/core';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioService } from '../../../services/cuestionario.service';
import { Router } from '@angular/router';
import { RespuestaCuestionarioService } from '../../../services/respuesta-cuestionario.service';

@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css']
})
export class ListCuestionariosComponent implements OnInit {

  loading : boolean = false
  listCuestionarios : Array<any> = []

  constructor(
    private cuestionarioService : CuestionarioService,
    private router : Router,
    private respuestaCuestionario : RespuestaCuestionarioService
  ) {
    
    
  }
  ngOnInit(): void {
    this.getListCuestionarios();
  }

  getListCuestionarios() : void {
    this.loading = true
    this.cuestionarioService.getListCuestionarios().subscribe(data => {
      this.loading = false
      this.listCuestionarios = data
      console.log(data)
    })
  }

  ingresarNombre(idCuestionario: number) : void {
    this.respuestaCuestionario.idCuestionario = idCuestionario
    // console.log(idCuestionario)
    this.router.navigate(['/inicio/ingresar-nombre'])
  }
}
