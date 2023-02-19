import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BloqueDto } from '../modelos/bloque';

@Injectable({
  providedIn: 'root'
})
export class BloquesService {

  bloqueURL = environment.bloqueUrl;

  constructor(private http: HttpClient) { }

  public getBloques(): Observable<BloqueDto[]> {
    return this.http.get<BloqueDto[]>(this.bloqueURL + 'all');
  }

  public guardarBloque(bloque: BloqueDto): Observable<BloqueDto> {
    return this.http.post<BloqueDto>(this.bloqueURL + 'save', bloque);
  }

}
