import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MantenimientoDto } from '../modelos/mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  mantenimientoUrl = environment.mantenimientoUrl;

  constructor(private http: HttpClient) { }

  public getMantenimientos(): Observable<MantenimientoDto[]> {
    return this.http.get<MantenimientoDto[]>(this.mantenimientoUrl + 'all');
  }

  public saveMantenimiento(mantenimiento: MantenimientoDto): Observable<MantenimientoDto> {
    return this.http.post<MantenimientoDto>(this.mantenimientoUrl + 'save', mantenimiento);
  }

  public deleteMantenimiento(id: string): Observable<any> {
    return this.http.delete<any>(this.mantenimientoUrl + 'delete/' + id);
  }

}
