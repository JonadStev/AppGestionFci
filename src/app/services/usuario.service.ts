import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioDto } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  userUrl = environment.userUrl;
  authUrl = environment.authUrl;

  constructor(private http: HttpClient) { }

  public getUsuarios(): Observable<UsuarioDto[]> {
    return this.http.get<UsuarioDto[]>(this.userUrl + 'all');
  }

  public guardarUsuario(usuario: UsuarioDto): Observable<any> {
    return this.http.post<any>(this.authUrl + 'nuevo', usuario);
  }

  public actualiarUsuario(usuario: UsuarioDto): Observable<UsuarioDto> {
    return this.http.post<UsuarioDto>(this.userUrl + 'save', usuario);
  }

}
