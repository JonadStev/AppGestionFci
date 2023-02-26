import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from './componentes/acreditacion/articulos/articulos.component';
import { BloquesComponent } from './componentes/bloques/bloques.component';
import { BloqueoComponent } from './componentes/cuentas/bloqueo/bloqueo.component';
import { MantenimientoComponent } from './componentes/cuentas/mantenimiento/mantenimiento.component';
import { RegistroComponent } from './componentes/cuentas/registro/registro.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { DocenteComponent } from './componentes/gestion/docente/docente.component';
import { HomeComponent } from './componentes/home/home.component';
import { HorasComponent } from './componentes/procesos/horas/horas.component';
import { LineasComponent } from './componentes/gestion/lineas/lineas.component';
import { MatrizProyectoFciComponent } from './componentes/procesos/matriz-proyecto-fci/matriz-proyecto-fci.component';
import { SublineasComponent } from './componentes/gestion/sublineas/sublineas.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { CuentasBaneosComponent } from './dash/cuentas-baneos/cuentas-baneos.component';
import { CuentasGeneralesComponent } from './dash/cuentas-generales/cuentas-generales.component';
import { ProdGuardService } from './guards/prod-guard.service';
import { CarrerasComponent } from './componentes/gestion/carreras/carreras.component';
import { EstadosComponent } from './componentes/gestion/estados/estados.component';
import { UnescoComponent } from './componentes/gestion/unesco/unesco.component';
import { ResetPasswordComponent } from './componentes/ayuda/reset-password/reset-password.component';
import { AcreditacionComponent } from './componentes/procesos/acreditacion/cargaAcreditacion/acreditacion/acreditacion.component';
import { PonenciasComponent } from './componentes/acreditacion/ponencias/ponencias.component';
import { LibroComponent } from './componentes/procesos/acreditacion/libro/libro/libro.component';
import { LibrosComponent } from './componentes/acreditacion/libros/libros.component';
import { CapituloLibrosComponent } from './componentes/acreditacion/capitulo-libros/capitulo-libros.component';
import { ProductoComponent } from './componentes/gestion/producto/producto.component';
import { AyudaComponent } from './componentes/ayuda/ayuda/ayuda.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gestion/docente', component: DocenteComponent },
  { path: 'matrizFci', component: MatrizProyectoFciComponent },
  { path: 'horasFci', component: HorasComponent },
  { path: 'gestion/lineas', component: LineasComponent },
  { path: 'gestion/sublineas', component: SublineasComponent },
  { path: 'gestion/carreras', component: CarrerasComponent },
  { path: 'gestion/productos', component: ProductoComponent },
  { path: 'gestion/estados', component: EstadosComponent },
  { path: 'gestion/unesco', component: UnescoComponent },
  { path: 'ayuda/cambio-contrasenia', component: ResetPasswordComponent },
  { path: 'ayuda/acerdaDe', component: AyudaComponent },
  { path: 'acreditacion/cargar', component: AcreditacionComponent },
  { path: 'acreditacion/articulos', component: ArticulosComponent },
  { path: 'acreditacion/ponencias', component: PonenciasComponent },
  { path: 'acreditacion/libro', component: LibrosComponent },
  { path: 'acreditacion/capitulo-libro', component: CapituloLibrosComponent },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [ProdGuardService], data: { expectedRol: ['supervisor'] } },
  { path: 'cuentas/registro', component: RegistroComponent, canActivate: [ProdGuardService], data: { expectedRol: ['supervisor'] } },
  { path: 'cuentas/mantenimiento', component: MantenimientoComponent, canActivate: [ProdGuardService], data: { expectedRol: ['mantenimiento'] } },
  { path: 'cuentas/bloqueo', component: BloqueoComponent, canActivate: [ProdGuardService], data: { expectedRol: ['produccion'] } },
  { path: 'bloques', component: BloquesComponent, canActivate: [ProdGuardService], data: { expectedRol: ['supervisor'] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

