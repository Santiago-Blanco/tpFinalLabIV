import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SeccionesComponent } from './secciones/secciones.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
///import { EquiposComponent } from './equipos/equipos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SeccionesComponent,
    ResultadosComponent,
    JugadoresComponent,
    SobreNosotrosComponent,
    //EquiposComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
