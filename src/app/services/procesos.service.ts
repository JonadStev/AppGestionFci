import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticuloDto } from '../modelos/procesos/articulo';
import { CapituloDto } from '../modelos/procesos/capitulo';
import { HorasDto } from '../modelos/procesos/horas';
import { LibroDto } from '../modelos/procesos/libro';
import { MonitoreoDto } from '../modelos/procesos/monitoreo';
import { PonenciaDto } from '../modelos/procesos/ponencia';
import { ProyectoDto } from '../modelos/procesos/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  proyectoUrl = environment.procesosProyecto;
  horasUrl = environment.procesosHoras;
  acreditacionUrl = environment.procesosAcreditacion;
  monitoreoUrl = environment.procesosMonitoreo;

  constructor(private http: HttpClient) { }

  //PROYECTOS
  public getProyectos(): Observable<ProyectoDto[]> {
    return this.http.get<ProyectoDto[]>(this.proyectoUrl + 'all');
  }

  public getProyectosActivos(): Observable<ProyectoDto[]> {
    return this.http.get<ProyectoDto[]>(this.proyectoUrl + 'all');
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

  //ARTICULOS
  public getArticulos(): Observable<ArticuloDto[]> {
    return this.http.get<ArticuloDto[]>(this.acreditacionUrl + 'articulo/all');
  }

  public guardarArticulo(articulo: ArticuloDto): Observable<ArticuloDto> {
    return this.http.post<ArticuloDto>(this.acreditacionUrl + 'articulo/save', articulo);
  }

  //PONENCIAS
  public getPonencias(): Observable<PonenciaDto[]> {
    return this.http.get<PonenciaDto[]>(this.acreditacionUrl + 'ponencia/all');
  }

  public guardarPonencia(ponencia: PonenciaDto): Observable<PonenciaDto> {
    return this.http.post<PonenciaDto>(this.acreditacionUrl + 'ponencia/save', ponencia);
  }

  //LIBROS
  public getLibros(): Observable<LibroDto[]> {
    return this.http.get<LibroDto[]>(this.acreditacionUrl + 'libro/all');
  }

  public guardarLibro(libro: LibroDto): Observable<LibroDto> {
    return this.http.post<LibroDto>(this.acreditacionUrl + 'libro/save', libro);
  }

  //CAPITULOS
  public getCapitulosLibro(): Observable<CapituloDto[]> {
    return this.http.get<CapituloDto[]>(this.acreditacionUrl + 'capitulo-libro/all');
  }

  public guardarCapitulo(capitulo: CapituloDto): Observable<CapituloDto> {
    return this.http.post<CapituloDto>(this.acreditacionUrl + 'capitulo-libro/save', capitulo);
  }


  //Reportes proyectos fci
  public getProyectosByFilter(fechaInicio: string, fechaFin: string, estado: string, director: string): Observable<ProyectoDto[]> {
    return this.http.get<ProyectoDto[]>(this.proyectoUrl + 'allFilter?fechaInicio=' + fechaInicio + '&fechaFin=' + fechaFin + '&estado=' + estado + '&director=' + director);
  }

  //Reportes articulos
  public getArticulosByFilter(tipo: string, codigo: string, fecha: string, docente: string): Observable<ArticuloDto[]> {
    return this.http.get<ArticuloDto[]>(this.acreditacionUrl + 'articulo/' + 'allByfilter?tipoPublicacion=' + tipo + '&codigoPublicacion=' + codigo + '&fechaPublicacion=' + fecha + '&docente=' + docente);
  }

  //Reportes ponencias
  public getPonenciasByFilter(tipo: string, codigo: string, fecha: string, docente: string): Observable<PonenciaDto[]> {
    return this.http.get<PonenciaDto[]>(this.acreditacionUrl + 'ponencia/' + 'allByfilter?tipoPublicacion=' + tipo + '&codigoPublicacion=' + codigo + '&fechaPublicacion=' + fecha + '&docente=' + docente);
  }

  //Reportes libros
  public getLibrosByFilter(tipo: string, codigo: string, fecha: string, docente: string): Observable<LibroDto[]> {
    return this.http.get<LibroDto[]>(this.acreditacionUrl + 'libro/' + 'allByfilter?tipoPublicacion=' + tipo + '&codigoPublicacion=' + codigo + '&fechaPublicacion=' + fecha + '&docente=' + docente);
  }

  //Reportes CAPITULOS
  public getCapitulosByFilter(tipo: string, codigo: string, fecha: string, docente: string): Observable<CapituloDto[]> {
    return this.http.get<CapituloDto[]>(this.acreditacionUrl + 'capitulo/' + 'allByfilter?tipoPublicacion=' + tipo + '&codigoPublicacion=' + codigo + '&fechaPublicacion=' + fecha + '&docente=' + docente);
  }

  //MONITOREOS
  public getMonitoreos(): Observable<MonitoreoDto[]> {
    return this.http.get<MonitoreoDto[]>(this.monitoreoUrl + 'all');
  }

  public guardarMonitoreo(monitoreo: MonitoreoDto): Observable<MonitoreoDto> {
    return this.http.post<MonitoreoDto>(this.monitoreoUrl + 'save', monitoreo);
  }
}
