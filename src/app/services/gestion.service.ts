import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarreraDto } from '../modelos/gestion/carrera';
import { EstadoDto } from '../modelos/gestion/estado';
import { LineaDto } from '../modelos/gestion/linea';
import { ProductoDto } from '../modelos/gestion/producto';
import { SubLineaDto } from '../modelos/gestion/subLinea';
import { UnescoDto } from '../modelos/gestion/unesco';
import { UsuarioDocenteDto } from '../modelos/gestion/usuarioDocente';
import { LoginUsuario } from '../modelos/login';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  gestionUsuarioUrl = environment.gestionUsuarioUrl;
  gestionEstadoUrl = environment.gestionEstadoUrl;
  gestionLineaUrl = environment.gestionLineaUrl;
  gestionSubLineaUrl = environment.gestionSubLineaUrl;
  gestionUnescoUrl = environment.gestionUnescoUrl;
  gestionCarreraUrl = environment.gestionCarreraUrl;
  productoUrl = environment.gestionProductoUrl;

  constructor(private http: HttpClient) { }

  //USUARIO
  public getUsuarios(): Observable<UsuarioDocenteDto[]> {
    return this.http.get<UsuarioDocenteDto[]>(this.gestionUsuarioUrl + 'all');
  }

  //INVESTIGADORES
  public getInvestigadores(): Observable<UsuarioDocenteDto[]> {
    return this.http.get<UsuarioDocenteDto[]>(this.gestionUsuarioUrl + 'all/investigadores');
  }

  //DIRECTORES
  public getDirectores(): Observable<UsuarioDocenteDto[]> {
    return this.http.get<UsuarioDocenteDto[]>(this.gestionUsuarioUrl + 'all/directores');
  }

  public guardarUsuario(usuario: UsuarioDocenteDto): Observable<UsuarioDocenteDto> {
    return this.http.post<UsuarioDocenteDto>(this.gestionUsuarioUrl + 'save', usuario);
  }

  public resetearContrasenia(login: LoginUsuario): Observable<any> {
    return this.http.post<any>(this.gestionUsuarioUrl + 'resetPassword', login);
  }

  //ESTADO PROYECTOS FCI
  public getEstados(): Observable<EstadoDto[]> {
    return this.http.get<EstadoDto[]>(this.gestionEstadoUrl + 'all');
  }

  public guardarEstado(estado: EstadoDto): Observable<EstadoDto> {
    return this.http.post<EstadoDto>(this.gestionEstadoUrl + 'save', estado);
  }

  //Lineas
  public getLineas(): Observable<LineaDto[]> {
    return this.http.get<LineaDto[]>(this.gestionLineaUrl + 'all');
  }

  public guardarLinea(linea: LineaDto): Observable<LineaDto> {
    return this.http.post<LineaDto>(this.gestionLineaUrl + 'save', linea);
  }

  //SubLineas
  public getSubLineas(): Observable<SubLineaDto[]> {
    return this.http.get<SubLineaDto[]>(this.gestionSubLineaUrl + 'all');
  }

  public guardarSubLinea(subLinea: SubLineaDto): Observable<SubLineaDto> {
    return this.http.post<SubLineaDto>(this.gestionSubLineaUrl + 'save', subLinea);
  }

  //Unesco
  public getUnescos(): Observable<UnescoDto[]> {
    return this.http.get<UnescoDto[]>(this.gestionUnescoUrl + 'all');
  }

  public guardarUnesco(unesco: UnescoDto): Observable<UnescoDto> {
    return this.http.post<UnescoDto>(this.gestionUnescoUrl + 'save', unesco);
  }

  //Carrera
  public getCarreras(): Observable<CarreraDto[]> {
    return this.http.get<CarreraDto[]>(this.gestionCarreraUrl + 'all');
  }

  public guardarCarrera(carrera: CarreraDto): Observable<CarreraDto> {
    return this.http.post<CarreraDto>(this.gestionCarreraUrl + 'save', carrera);
  }

  //Producto
  public getProductos(): Observable<ProductoDto[]> {
    return this.http.get<ProductoDto[]>(this.productoUrl + 'all');
  }

  public guardarProducto(producto: ProductoDto): Observable<ProductoDto> {
    return this.http.post<ProductoDto>(this.productoUrl + 'save', producto);
  }

}
