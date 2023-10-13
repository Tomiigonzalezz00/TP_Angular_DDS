import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso.model';


@Component({
  selector: 'app-curso-details',
  templateUrl: './curso-details.component.html',
  styleUrls: ['./curso-details.component.css']
})
export class CursoDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentElement: Curso = <Curso>{
    title: '',
    status: 'draft',
    content: ''
  };
  curso: Curso = {
    nombre: '',
    fechaInicio: new Date(),
    idDocente: 1,
    tema: {
      id: 2,
    },
  };
  cursoForm: FormGroup;
  minDate = new Date();
  updateSuccessMessageVisible = false;
  
  message = '';
  constructor(
	private formBuilder: FormBuilder,
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router) 
    {
		this.cursoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      tema: [null, Validators.required],
      fechaInicio: [new Date(), Validators.required],
      idDocente: [1, Validators.required],
    }); 
    }
    
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getElement(this.route.snapshot.params["id"]);
    }
    this.minDate.setDate(this.minDate.getDate() + 1);
  }
  getElement(id: string): void {
    this.cursoService.get(id)
      .subscribe({
        next: (data) => {
          this.currentElement = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

	isUpdateButtonEnabled(): boolean {
  // Verifica que el nombre no esté vacío y que fechaInicio sea una fecha válida
  return !!this.currentElement.nombre && !!this.currentElement.fechaInicio;
}

 updateElement(): void {
  this.message = '';
  this.cursoService.update(this.currentElement.id, this.currentElement)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : 'Curso actualizado Correctamente, volviendo a la página de cursos...';
        this.showSuccessMessage();
        // Redirige a la lista de cursos después de un cierto tiempo
        setTimeout(() => {
          this.router.navigate(['/cursos']);
        }, 3000); // 3000 milisegundos (3 segundos)
      },
      error: (e) => console.error(e)
    });
}

showSuccessMessage(): void {
  this.updateSuccessMessageVisible = true;

  // Oculta el mensaje de éxito después de 3 segundos
  setTimeout(() => {
    this.updateSuccessMessageVisible = false;
  }, 3000); // 3000 milisegundos (3 segundos)
}

cancelUpdate(): void {
  this.router.navigate(['/cursos']); // Redirige a la lista de cursos
}

  deleteElement(): void {
    this.cursoService.delete(this.currentElement.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/cursos']);
        },
        error: (e) => console.error(e)
      });
  }
}
