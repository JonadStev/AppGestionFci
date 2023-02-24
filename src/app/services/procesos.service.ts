import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProyectoDto } from '../modelos/procesos/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  proyectoUrl = environment.procesosProyecto;

  constructor(private http: HttpClient) { }

  //PROYECTOS
  public getProyectos(): Observable<ProyectoDto[]> {
    return this.http.get<ProyectoDto[]>(this.proyectoUrl + 'all');
  }

  public getProyectosActivos(): Observable<ProyectoDto[]> {
    return this.http.get<ProyectoDto[]>(this.proyectoUrl + 'all/ACTIVO');
  }

  public guardarProyecto(proyecto: ProyectoDto): Observable<ProyectoDto> {
    return this.http.post<ProyectoDto>(this.proyectoUrl + 'save', proyecto);
  }

}
