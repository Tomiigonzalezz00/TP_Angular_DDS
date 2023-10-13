import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { AlumnoService } from 'src/app/services/alumno.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css']
})
export class AlumnoListComponent implements OnInit {
  alumnos: Alumno[] = [];
  currentElement: Alumno = {};
  currentIndex = -1;
  title = '';

  myControl = new FormControl();
  displayedAlumnos: Alumno[] = [];

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.retrieveAlumnos();
    
    this.myControl.valueChanges.subscribe((searchTerm) => {
      this.displayedAlumnos = this.alumnos.filter(alumno =>
        alumno.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  retrieveAlumnos(): void {
    this.alumnoService.getAll()
      .subscribe({
        next: (data) => {
          this.alumnos = data;
          this.displayedAlumnos = data;
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    const searchTerm = this.myControl.value;
    this.displayedAlumnos = this.alumnos.filter(alumno =>
      alumno.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  refreshList(): void {
    this.retrieveAlumnos();
    this.currentElement = {};
    this.currentIndex = -1;
  }
}

