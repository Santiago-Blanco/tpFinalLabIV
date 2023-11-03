import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Componentes/header/header.component';
import { SeccionesComponent } from './Componentes/secciones/secciones.component';
import { ResultadosComponent } from './Componentes/resultados/resultados.component';
import { JugadoresComponent } from './Componentes/jugadores/jugadores.component';
import { SobreNosotrosComponent } from './Componentes/sobre-nosotros/sobre-nosotros.component';
import { PageNotFoundComponent } from './Componentes/page-not-found/page-not-found.component';
import { EquiposComponent } from './Componentes/equipos/equipos.component';
import { RegisterLoginComponent } from './Componentes/register-login/register-login.component';
import { LoginRegisterService } from './Servicios/LoginRegister/login-register.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SeccionesComponent,
    ResultadosComponent,
    JugadoresComponent,
    SobreNosotrosComponent,
    PageNotFoundComponent,
    EquiposComponent,
    RegisterLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [LoginRegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
