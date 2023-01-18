import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-respuesta-cuestionario',
  templateUrl: './respuesta-cuestionario.component.html',
  styleUrls: ['./respuesta-cuestionario.component.css']
})
export class RespuestaCuestionarioComponent implements OnInit {

  cuestionario : Cuestionario
  respuestaUsuario: Array<number>


  constructor(
    private router: Router, 
    private respuestaCuestionarioService : RespuestaCuestionarioService
  ) {
     
    
  }

  ngOnInit(): void {
    if (this.respuestaCuestionarioService.idCuestionario == null) {
      this.router.navigate(['/inicio'])
      return
    }

    this.cuestionario = this.respuestaCuestionarioService.cuestionario
    this.respuestaUsuario = this.respuestaCuestionarioService.respuestas
    console.log(this.cuestionario)
    console.log(this.respuestaUsuario)
  }
}
