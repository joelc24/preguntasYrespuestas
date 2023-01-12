import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {
  cambiarPassword: FormGroup
  loading: boolean = false

  constructor(private fb: FormBuilder, private usuarioService : UsuarioService, private toastr : ToastrService, private router: Router ) {
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ['',Validators.required],
      newPassword: ['',[Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPassword })
  }

  checkPassword(group: FormGroup) : any {
    const pass = group.controls['newPassword'].value
    const confirmPass = group.controls['confirmPassword'].value
    console.log({ pass, confirmPass })
    console.log(group.controls)
    return pass === confirmPass ? null : { notSame: true }
  }

  guardarPassword(){

    this.loading = true
    const changePassword : any = {
      passwordAnterior: this.cambiarPassword.value.passwordAnterior,
      nuevaPassword: this.cambiarPassword.value.newPassword
    }
    
    
    this.usuarioService.changePassword(changePassword).subscribe(data=>{
      this.loading = false
      this.toastr.info(data.message)
      this.router.navigate(['/dashboard'])
    },error =>{
      this.loading = false
      this.cambiarPassword.reset()
      console.log(error)
      this.toastr.error(error.error.message, 'Error!')
    })
  }
}
