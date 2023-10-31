import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from '../Componentes/equipos/equipos.component';
import { SeccionesComponent } from './secciones/secciones.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { JugadoresComponent } from '../Componentes/jugadores/jugadores.component';
import { ResultadosComponent } from '../Componentes/resultados/resultados.component';
import { SobreNosotrosComponent } from '../Componentes/sobre-nosotros/sobre-nosotros.component';

const routes: Routes = [
  { path: 'sections', component: SeccionesComponent },
  { path: 'teams', component: EquiposComponent },
  { path: 'players', component : JugadoresComponent},
  { path: 'results', component : ResultadosComponent},
  { path: 'aboutUs', component : SobreNosotrosComponent},
  { path: '', redirectTo: '/sections', pathMatch: 'full'},
  { path: '**', component : PageNotFoundComponent},
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      )
    ],
    exports : [
      RouterModule
    ]
})

export class AppRoutingModule {

}
