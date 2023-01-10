import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  myAppUrl: string
  myApiUrl: string
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = '/api/usuario'
  }

  saveUser(usuario: Usuario) : void{

  }
}
