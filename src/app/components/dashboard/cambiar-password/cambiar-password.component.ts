import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {
  cambiarPassword: FormGroup

  constructor(private fb: FormBuilder ) {
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
    console.log(this.cambiarPassword)
  }
}
