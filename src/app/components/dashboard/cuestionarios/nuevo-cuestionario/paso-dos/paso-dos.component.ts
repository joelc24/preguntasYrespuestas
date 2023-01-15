import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from 'src/app/models/pregunta';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { Cuestionario } from '../../../../../models/cuestionario';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent implements OnInit {
  tituloCuestionario: string
  descripcionCuestionario: string
  listPreguntas: Pregunta[] = []
  loading: boolean = false
  
  constructor(
     private cuestionarioService: CuestionarioService,
     private toastr: ToastrService,
     private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;
  }

  guardarPregunta(pregunta : Pregunta) : void {
    this.listPreguntas.push(pregunta)
    console.log(this.listPreguntas)
  }

  eliminarPregunta(indice : number) : void {
    this.listPreguntas.splice(indice,1)
  }

  guardarCuestionario() : void {
    this.loading = true
    const cuestionario : Cuestionario = {
      nombre: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      listPreguntas: this.listPreguntas
    }

    //?Enviamos cuestionario al backend
    this.cuestionarioService.guardarCuestionario(cuestionario).subscribe(data => {
      this.loading = false
      this.toastr.success('El cuesttionario fue registrado con exito','Registro con exito')
      this.router.navigate(['/dashboard'])
    }, error => {
      this.loading = false
      this.toastr.error('Opps... Ocurrio un error!','Error!')
      this.router.navigate(['/dashboard'])
    })
  }
}
