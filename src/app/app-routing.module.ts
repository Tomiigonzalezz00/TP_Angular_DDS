import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { CursoDetailsComponent } from './components/curso-details/curso-details.component';
import { CursoAddComponent } from './components/curso-add/curso-add.component';
import { TemaListComponent } from './components/tema-list/tema-list.component';
import { AlumnoListComponent } from './components/alumno-list/alumno-list.component';
import { MaterialListComponent } from './components/material-list/material-list.component';




const routes: Routes = [
  { path: '', redirectTo: 'cursos', pathMatch: 'full' },
  { path: 'cursos', component: CursoListComponent },
  { path: 'cursos/:id', component: CursoDetailsComponent },
  { path: 'add', component: CursoAddComponent },
  { path:'temas', component: TemaListComponent },
  { path: 'alumnos', component: AlumnoListComponent },
  { path: 'materiales', component: MaterialListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
