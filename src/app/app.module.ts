import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursoAddComponent } from './components/curso-add/curso-add.component';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { CursoDetailsComponent } from './components/curso-details/curso-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ReactiveFormsModule} from '@angular/forms';
import {NgForOf, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import {NgIf} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { TemaListComponent } from './components/tema-list/tema-list.component';
import { AlumnoListComponent } from './components/alumno-list/alumno-list.component';
import { MaterialListComponent } from './components/material-list/material-list.component';





@NgModule({
  declarations: [
    AppComponent,
    CursoAddComponent,
    CursoListComponent,
    CursoDetailsComponent,
    TemaListComponent,
    AlumnoListComponent,
    MaterialListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgForOf,
    AsyncPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    NgIf
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

