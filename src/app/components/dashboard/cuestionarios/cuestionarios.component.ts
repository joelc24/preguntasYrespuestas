import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit {
  nombreUsuario: string
  listCuestionarios: Array<Cuestionario> = []
  loading: boolean = false

  constructor(
    private loginService: LoginService,
    private cuestionarioService : CuestionarioService,
    private toastr : ToastrService
  ) {
    
    
  }

  ngOnInit() : void {
    this.getNombreUsuario()
    this.getCuestionarios()
  }

  getNombreUsuario(){
    // console.log(this.loginService.getTokenDecoded())
    this.nombreUsuario = this.loginService.getTokenDecoded().sub
  }

  getCuestionarios() : void {
    this.loading = true
    this.cuestionarioService.getListCuestionarioByUser().subscribe(data =>{
      this.listCuestionarios = data
      this.loading = false
    }, error =>{
      this.loading = false
      this.toastr.error('Opss... Ocurio un error','Error')
      console.log(error)
    })
  }

  eliminarCuestionario(idCuestionario : number) : void {
    if (confirm('Esta seguro que desea eliminar el cuestionario?')) {
      this.loading = true
      this.cuestionarioService.deleteCuestionario(idCuestionario).subscribe(data => {
        this.loading = false
        this.toastr.success('El cuestionario fue eliminado con exito','Registro eliminado')
        this.getCuestionarios()
      }, error => {
        this.loading = false
        this.toastr.error('Opss... Ocurio un error','Error')
      })
    }
  }
}
