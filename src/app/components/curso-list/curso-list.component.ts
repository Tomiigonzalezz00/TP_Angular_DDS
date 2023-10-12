import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css'],
})
export class CursoListComponent implements OnInit {
  cursos?: Curso[];
  currentElement: Curso = {};
  currentIndex = -1;
  title = '';

  myControl = new FormControl();
  options: Curso[] = [];
  displayedCursos: Curso[] = [];
  filteredOptions: Observable<Curso[]> = new Observable<Curso[]>();

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.retrieveCursos();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((val) => this._filter(val))
    );
  }

  retrieveCursos(): void {
    this.cursoService.getAll().subscribe({
      next: (data) => {
        this.cursos = data;
        this.options = this.cursos;
        this.displayedCursos = this.cursos; // Inicialmente, mostrar todos los cursos
        console.log(this.cursos);
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveCursos();
    this.currentElement = {};
    this.currentIndex = -1;
  }

  setActiveElement(element: Curso, index: number): void {
    this.currentElement = element;
    this.currentIndex = index;
  }

  removeAllElements(): void {
    this.cursoService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e),
    });
  }

searchTitle(): void {
  this.currentElement = <Curso>{};
  this.currentIndex = -1;

  if (this.cursos) {
    if (this.title) {
      // Realizar la búsqueda solo si se ha ingresado un título
      this.displayedCursos = this.cursos.filter((curso) =>
        curso.nombre?.toLowerCase().includes(this.title.toLowerCase())
      );
    } else {
      // Si no se ingresa un título, mostrar todos los cursos
      this.displayedCursos = this.cursos;
    }
  }
}


  private _filter(value: string): Curso[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.nombre?.toLowerCase().includes(filterValue)
    );
  }
}

