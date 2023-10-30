import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './equipos/equipos.component';
import { SeccionesComponent } from './secciones/secciones.component';

const routes: Routes = [
  {path: '', component: SeccionesComponent},
 {path: 'equipos', component: EquiposComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
