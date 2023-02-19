import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BloqueoDto } from '../modelos/bloqueos';
import { DashBloqueDto } from '../modelos/dashBloqueo';

@Injectable({
  providedIn: 'root'
})
export class BloqueoService {

  bloqueoUrl = environment.bloqueoUrl

  constructor(private http: HttpClient) { }

  public guadarBloqueo(bloqueo: BloqueoDto): Observable<BloqueoDto> {
    return this.http.post<BloqueoDto>(this.bloqueoUrl + 'save', bloqueo);
  }

  public getBloqueos(): Observable<BloqueoDto[]> {
    return this.http.get<BloqueoDto[]>(this.bloqueoUrl + 'all');
  }

  public deleteBloqueos(id: number): Observable<any> {
    return this.http.delete<any>(this.bloqueoUrl + 'delete/' + id);
  }

  public getBloqueosByFecha(fechaIni: string, fechaFin: string): Observable<DashBloqueDto> {
    return this.http.get<DashBloqueDto>(this.bloqueoUrl + 'bloqueos/fecha?fechaDesde=' + fechaIni + '&fechaHasta=' + fechaFin);
  }

  public getCuentasGenerales(): Observable<number[]> {
    return this.http.get<number[]>(this.bloqueoUrl + 'bloqueos/generales');
  }

}
