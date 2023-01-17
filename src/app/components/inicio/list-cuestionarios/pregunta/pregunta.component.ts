import { Component, OnInit } from '@angular/core';
import { RespuestaCuestionarioService } from '../../../../services/respuesta-cuestionario.service';
import { CuestionarioService } from '../../../../services/cuestionario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  idCuestionario: number
  ngOnInit(): void {
    this.idCuestionario = this.respuestaCuestionario.idCuestionario 
    if (this.idCuestionario == null) {
      this.router.navigate(['/inicio'])
      return
    }
    this.getCuestionario() 
  }

 
  constructor(
    private respuestaCuestionario : RespuestaCuestionarioService,
    private cuestionarioService : CuestionarioService, 
    private router: Router
  ) {
    
    
  }

  getCuestionario() : void {
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data =>{
      console.log(data)
    })
  }

}
