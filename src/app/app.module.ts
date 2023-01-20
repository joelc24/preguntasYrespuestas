//* MODULOS *//
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


//* COMPONENTES *//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';

//* INTERCEPTORS *//
import { AddTokenInterceptor } from "../app/helper/add-token.interceptor";
import { ListCuestionariosComponent } from './components/inicio/list-cuestionarios/list-cuestionarios.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    BienvenidaComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    ListCuestionariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    SharedModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
