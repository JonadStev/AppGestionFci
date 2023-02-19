import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDTO } from '../modelos/jwt-dto';
import { LoginUsuario } from '../modelos/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authUrl;

  constructor(private http: HttpClient) { }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(this.authURL + 'login', loginUsuario);
  }

}
