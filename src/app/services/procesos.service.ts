import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HorasDto } from '../modelos/procesos/horas';
import { ProyectoDto } from '../modelos/procesos/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  proyectoUrl = environment.procesosProyecto;
  horasUrl = environment.procesosHoras;
  acreditacionUrl = environment.procesosAcreditacion;

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

  //ASIGNACION DE HORAS
  public gethoras(): Observable<HorasDto[]> {
    return this.http.get<HorasDto[]>(this.horasUrl + 'all');
  }

  public guardarHoras(horas: HorasDto): Observable<HorasDto> {
    return this.http.post<HorasDto>(this.horasUrl + 'save', horas);
  }

  //ACREDITACION
  public cargarExcel(formData: FormData): Observable<any> {
    return this.http.post<any>(this.acreditacionUrl + 'excel', formData);
  }

}
