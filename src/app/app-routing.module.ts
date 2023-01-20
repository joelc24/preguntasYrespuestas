import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CuestionariosComponent } from './components/dashboard/cuestionarios/cuestionarios.component';
import { CambiarPasswordComponent } from './components/dashboard/cambiar-password/cambiar-password.component';
import { NuevoCuestionarioComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/nuevo-cuestionario.component';
import { PasoUnoComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/paso-uno/paso-uno.component';
import { PasoDosComponent } from './components/dashboard/cuestionarios/nuevo-cuestionario/paso-dos/paso-dos.component';
import { CuestionarioComponent } from './components/dashboard/cuestionarios/cuestionario/cuestionario.component';
import { ListCuestionariosComponent } from './components/inicio/list-cuestionarios/list-cuestionarios.component';
import { EstadisticasComponent } from './components/dashboard/cuestionarios/estadisticas/estadisticas.component';
import { DetalleRespuestaComponent } from './components/dashboard/cuestionarios/estadisticas/detalle-respuesta/detalle-respuesta.component';
import { AuthGuard } from './helper/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent, children: [
    { path: '', component: BienvenidaComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'list-cuestionarios', component: ListCuestionariosComponent, 
            loadChildren: ()=> import('./components/inicio/list-cuestionarios/list-cuestionarios.module').then(x => x.ListCuestionariosModule)}
  ]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], 
                                  loadChildren: ()=> import('./components/dashboard/dashboard.module').then(x => x.DashboardModule)
  },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
