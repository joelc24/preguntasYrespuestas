import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: FormGroup
  loading: boolean = false

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router) {
    this.login = this.fb.group({
      usuario: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  log(){
    const usuario: Usuario = {
      nombreUsuario: this.login.value.usuario,
      password: this.login.value.password
    }
    this.loading = true
    setTimeout(() => {
      if (usuario.nombreUsuario === 'joelcamargo' && usuario.password === '123456') {
        this.router.navigate(['/dashboard'])
      } else {
        this.toastr.error('Usuario o Contraseña Invalidos','Error')
        this.login.reset()
      }
      this.loading = false
    }, 3000);

    console.log(usuario)
  }
}
