import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { CursoDetailsComponent } from './components/curso-details/curso-details.component';
import { CursoAddComponent } from './components/curso-add/curso-add.component';
import { TemaListComponent } from './components/tema-list/tema-list.component';
import { TemaAddComponent } from './components/tema-add/tema-add.component';
import { AlumnoListComponent } from './components/alumno-list/alumno-list.component';
import { AlumnoAddComponent } from './components/alumno-add/alumno-add.component';



const routes: Routes = [
  { path: '', redirectTo: 'cursos', pathMatch: 'full' },
  { path: 'cursos', component: CursoListComponent },
  { path: 'cursos/:id', component: CursoDetailsComponent },
  { path: 'add', component: CursoAddComponent },
   { path:'temas', component: TemaListComponent },
  { path: 'addTema', component: TemaAddComponent },
  { path: 'alumnos', component: AlumnoListComponent },
  { path: 'addAlumno', component: AlumnoAddComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
