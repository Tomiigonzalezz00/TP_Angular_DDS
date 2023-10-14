import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/models/material.model';
import { MaterialService } from 'src/app/services/material.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit {
  materials: Material[] = [];
  currentElement: Material = {};
  currentIndex = -1;
  title = '';

  myControl = new FormControl();
  displayedMateriales: Material[] = [];

  constructor(private MaterialService: MaterialService) { }

  ngOnInit(): void {
    this.retrievematerials();
    
    this.myControl.valueChanges.subscribe((searchTerm) => {
      this.displayedMateriales = this.materials.filter(material =>
        material.titulo?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  retrievematerials(): void {
    this.MaterialService.getAll()
      .subscribe({
        next: (data) => {
          this.materials = data;
          this.displayedMateriales = data;
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    const searchTerm = this.myControl.value;
    this.displayedMateriales = this.materials.filter(material =>
      material.titulo?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  refreshList(): void {
    this.retrievematerials();
    this.currentElement = {};
    this.currentIndex = -1;
  }
}
