import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { EquiposComponent } from './equipos/equipos.component';

const routes: Routes = [
 // {path: 'equipos', component: EquiposComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
