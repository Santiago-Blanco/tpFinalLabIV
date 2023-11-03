import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './Componentes/equipos/equipos.component';
import { SeccionesComponent } from './Componentes/secciones/secciones.component';
import { PageNotFoundComponent } from './Componentes/page-not-found/page-not-found.component';
import { JugadoresComponent } from './Componentes/jugadores/jugadores.component';
import { ResultadosComponent } from './Componentes/resultados/resultados.component';
import { SobreNosotrosComponent } from './Componentes/sobre-nosotros/sobre-nosotros.component';
import { RegisterLoginComponent } from './Componentes/register-login/register-login.component';
import { LoginComponent } from './Componentes/register-login/login/login.component';
import { RegisterComponent } from './Componentes/register-login/register/register.component';
import { FavouriteListComponent } from './Componentes/favourite-list/favourite-list.component';

const routes: Routes = [
  { path: 'sections', component: SeccionesComponent },
  { path: 'teams', component: EquiposComponent },
  { path: 'players', component : JugadoresComponent},
  { path: 'results', component : ResultadosComponent},
  { path: 'aboutUs', component : SobreNosotrosComponent},
  { path: 'registerLogin', component: RegisterLoginComponent},
  { path: 'registerLogin/login', component : LoginComponent},
  { path: 'registerLogin/register', component: RegisterComponent},
  { path: 'favourite-list', component: FavouriteListComponent},
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
