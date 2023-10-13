import { Component, OnInit } from '@angular/core';
import { Tema } from 'src/app/models/tema.model'; // Asegúrate de importar el modelo de temas
import { TemaService } from 'src/app/services/tema.service'; // Asegúrate de importar el servicio de temas
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-tema-list',
  templateUrl: './tema-list.component.html',
  styleUrls: ['./tema-list.component.css'],
})
export class TemaListComponent implements OnInit {
  temas?: Tema[];
  currentElement: Tema = {};
  currentIndex = -1;
  title = '';

  myControl = new FormControl();
  options: Tema[] = [];
  displayedTemas: Tema[] = [];
  filteredOptions: Observable<Tema[]> = new Observable<Tema[]>();

  constructor(private temaService: TemaService) {}

  ngOnInit(): void {
    this.retrieveTemas();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((val) => this._filter(val))
    );
  }

  retrieveTemas(): void {
    this.temaService.getAll().subscribe({
      next: (data) => {
        this.temas = data;
        this.options = this.temas;
        this.displayedTemas = this.temas;
        console.log(this.temas);
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveTemas();
    this.currentElement = {};
    this.currentIndex = -1;
  }

  setActiveElement(element: Tema, index: number): void {
    this.currentElement = element;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.currentElement = <Tema>{};
    this.currentIndex = -1;

    if (this.temas) {
      this.title = this.myControl.value.toLowerCase();

      if (this.title) {
        this.displayedTemas = this.temas.filter((tema) =>
          tema.nombre?.toLowerCase().includes(this.title)
        );
      } else {
        this.displayedTemas = this.temas;
      }
    }
  }

  private _filter(value: string): Tema[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.nombre?.toLowerCase().includes(filterValue)
    );
  }
}
