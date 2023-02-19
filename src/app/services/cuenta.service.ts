import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CuentaDto } from '../modelos/cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  cuentaUrl = environment.cuentaUrl;

  constructor(private http: HttpClient) { }

  public cargarCuentas(formData: FormData): Observable<any> {
    return this.http.post<any>(this.cuentaUrl + 'cargar', formData);
  }

  public getCuentasByBloque(idbloque: string): Observable<CuentaDto[]> {
    return this.http.get<CuentaDto[]>(this.cuentaUrl + idbloque)
  }

  public guardarCuenta(cuenta: CuentaDto): Observable<CuentaDto> {
    return this.http.post<CuentaDto>(this.cuentaUrl + 'save', cuenta);
  }

}
