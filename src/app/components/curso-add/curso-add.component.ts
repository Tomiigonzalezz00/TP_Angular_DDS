import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { Tema } from 'src/app/models/tema.model';
import { TemaService } from 'src/app/services/tema.service';
import { Material } from 'src/app/models/material.model';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-curso-add',
  templateUrl: './curso-add.component.html',
  styleUrls: ['./curso-add.component.css'],
})
export class CursoAddComponent implements OnInit {
  cursoForm: FormGroup;
  temas?: Tema[];
  nombreMaterialesFiltrados: String[] = [];
  selectedTemaId: number = 0;
  selectedProfesor: number = 0;
  minDate = new Date();
  mensajeAdvertencia: string = '';
 curso: Curso = {
    nombre: '',
    fechaInicio: new Date(),
    idDocente: 1,
    tema: {
      id: 2,
    },
  };
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private cursoService: CursoService,
    private materialService: MaterialService,
    private temaService: TemaService
  ) {
    this.cursoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      tema: [null, Validators.required],
      fechaInicio: [new Date(), Validators.required],
      idDocente: [1, Validators.required],
    });
  }

  ngOnInit(): void {
    this.retrieveTema();
    this.minDate.setDate(this.minDate.getDate() + 1);
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

  retrieveTema(): void {
    this.temaService.getAll().subscribe({
      next: (data: Tema[]) => {
        this.temas = data;
      },
      error: (e: any) => console.error(e),
    });
  }

  updateMaterialesFiltrados(): void {
    if (this.selectedTemaId > 0) {
      this.materialService.obtenerMaterialesPorIdTema(this.selectedTemaId).subscribe((data: any) => {
        if (Array.isArray(data)) {
          this.nombreMaterialesFiltrados = data.map((material) => material.titulo || 'Título no disponible');
        } else {
          console.error('Los datos no son un array válido.');
        }
        console.log(this.nombreMaterialesFiltrados);
      });
    } else {
      this.nombreMaterialesFiltrados = [];
      console.log(this.nombreMaterialesFiltrados);
    }
  }
}
