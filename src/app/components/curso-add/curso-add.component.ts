import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { Tema } from 'src/app/models/tema.model';
import { TemaService } from 'src/app/services/tema.service';
import { Material } from 'src/app/models/material.model';
import { MaterialService } from 'src/app/services/material.service';
import { Observable } from 'rxjs';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-curso-add',
  templateUrl: './curso-add.component.html',
  styleUrls: ['./curso-add.component.css'],
})
export class CursoAddComponent implements OnInit {
  curso: Curso = {
    nombre: '',
    fechaInicio: new Date(),
    idDocente: 1,
    tema: {
      id: 2,
    },
  };
  submitted = false;

  selectedMaterialId: number = 0;
  dateError: boolean = false;
  temasCursos: any[] = [];
  materiales?: Material[];
  temas?: Tema[];
  
  cursos?: Curso[];
  options: Curso[] = [];
  displayedCursos: Curso[] = [];
  filteredOptions: Observable<Curso[]> = new Observable<Curso[]>();
  currentElement: Curso = {};
  currentIndex = -1;
  

  constructor(
    private cursoService: CursoService,
    private materialService: MaterialService,
    private temaService: TemaService
  ) {}

  materialesTema: Material[] = [];
  materialesFiltrados?: Material[] = [];
  nombreMaterialesFiltrados : String[] = [];
  selectedTemaId: number = 0;

  selectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
	  this.retrieveCursos();
    this.retrieveMateriales();
    this.retrieveTema();
  }

	 setActiveElement(element: Curso, index: number): void {
    this.currentElement = element;
    this.currentIndex = index;
  }
	
	retrieveCursos(): void {
    this.cursoService.getAll().subscribe({
      next: (data) => {
        this.cursos = data;
        this.options = this.cursos;
        this.displayedCursos = this.cursos; // Inicialmente, mostrar todos los cursos
      },
      error: (e) => console.error(e),
    });
  }

  saveCurso(): void {
    const data = {
      id: this.curso.id,
      nombre: this.curso.nombre,
      fechaInicio: this.curso.fechaInicio,
      idDocente: this.curso.idDocente,
      tema: this.curso.tema,
    };
    this.cursoService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  newCurso(): void {
    this.submitted = false;
    this.curso = {
      nombre: '',
      fechaInicio: new Date(),
      idDocente: 1,
      tema: {
        id: 2,
      },
    };
  }

  retrieveMateriales(): void {
    this.materialService.getAll().subscribe({
      next: (data: Material[]) => {
        this.materiales = data;
        console.log(this.materiales);
      },
      error: (e: any) => console.error(e),
    });
  }

  retrieveTema(): void {
    this.temaService.getAll().subscribe({
      next: (data: Tema[]) => {
        this.temas = data;
        console.log(this.temas);
      },
      error: (e: any) => console.error(e),
    });
  }
  
updateMaterialesFiltrados(): void {
  if (this.selectedTemaId > 0) {
    // Debes cargar la lista de materiales relacionados al tema seleccionado aquí utilizando this.materialService
    this.materialService.obtenerMaterialesPorIdTema(this.selectedTemaId).subscribe((data: any) => {
      if (Array.isArray(data)) {
        this.nombreMaterialesFiltrados = data.map(material => material.titulo || 'Título no disponible');
        console.log(this.selectedTemaId);
        console.log(this.nombreMaterialesFiltrados);
      } else {
        // Si data no es un array, maneja este caso según tu lógica 
        console.error('Los datos no son un array válido.');
      }
    });
  } else {
    this.nombreMaterialesFiltrados = []; // Limpiar la lista si no se selecciona un tema
    console.log(this.nombreMaterialesFiltrados);
  }
}
}



