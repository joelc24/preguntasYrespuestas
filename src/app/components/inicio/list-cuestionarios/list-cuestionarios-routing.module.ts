import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { IngresarNombreComponent } from './ingresar-nombre/ingresar-nombre.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { RespuestaCuestionarioComponent } from './respuesta-cuestionario/respuesta-cuestionario.component';

const routes: Routes = [
  { path: 'ingresar-nombre', component: IngresarNombreComponent },
  { path: 'pregunta', component: PreguntaComponent },
  { path: 'respuesta-cuestionario', component: RespuestaCuestionarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCuestionariosRoutingModule { }
