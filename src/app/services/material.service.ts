import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../models/material.model';

const baseUrl = 'http://localhost:8080/materiales';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Material[]> {
    return this.http.get<Material[]>(baseUrl);
  }
  
  get(id: any): Observable<Material> {
    return this.http.get<Material>(`${baseUrl}/${id}`); 
  }
  
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data, { responseType: 'text' }); 
  }
  
  update(id: any, data: Material): Observable<any> {
    const bodyData = {
        "id": id,
        "titulo": data.titulo, 
        "costo": data.costo,
        "idCurso": data.idCurso,
        "stock": data.stock
    };
    return this.http.put(baseUrl, bodyData, { responseType: 'text' }); 
  }
  
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`, { responseType: 'text' }); 
  }
  
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl, { responseType: 'text' }); 
  }
  
  findById(id: number): Observable<Material> {
    return this.http.get<Material>(`${baseUrl}?id=${id}`); 
  }

  findByCursoId(cursoId: number): Observable<Material[]> {
    return this.http.get<Material[]>(`${baseUrl}?idCurso=${cursoId}`); 
  }

  obtenerMaterialesPorIdTema(idTema: number): Observable<Material[]> {
    return this.http.get<Material[]>(`${baseUrl}?idTema=${idTema}`); 
  }
}
