import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tema } from '../models/tema.model';

const baseUrl = 'http://localhost:8080/temas';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tema[]> {
    return this.http.get<Tema[]>(baseUrl);
  }

  get(id: any): Observable<Tema> {
    return this.http.get<Tema>(`${baseUrl}/${id}`); // Corregido: Usar comillas francesas
  }

  create(data: any): Observable<any> {
    console.log(data);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('status', data.status);
    formData.append('content', data.content);
    return this.http.post(`${baseUrl}`, formData, { responseType: 'text' }); // Corregido: Usar comillas francesas
  }

update(id: any, data: Tema): Observable<any> {
    if (data && data.nombre !== undefined && data.duracion !== undefined) {
        // Convertir a FormData
        const bodyData = new FormData();
        bodyData.append('id', id.toString());
        bodyData.append('nombre', data.nombre.toString());
        bodyData.append('duracion', data.duracion.toString());
        return this.http.put(`${baseUrl}`, bodyData, { responseType: 'text' });
    } else {
        // Manejar el caso en que data o sus propiedades sean indefinidas
        return new Observable<any>();
    }
}




  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`, { responseType: 'text' }); // Corregido: Usar comillas francesas
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(nombre: any): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${baseUrl}?nombre=${nombre}`); // Corregido: Usar comillas francesas
  }
}
