import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { CursoDetailsComponent } from './components/curso-details/curso-details.component';
import { CursoAddComponent } from './components/curso-add/curso-add.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { TemasComponent } from './components/temas/temas.component';

const routes: Routes = [
  { path: '', redirectTo: 'cursos', pathMatch: 'full' },
  { path: 'cursos', component: CursoListComponent },
  { path: 'cursos/:id', component: CursoDetailsComponent },
  { path: 'add', component: CursoAddComponent },
  { path: 'temas', component: TemasComponent} ,
  { path: 'alumnos', component: AlumnosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
