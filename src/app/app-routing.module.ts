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
import { ProyectoFciComponent } from './componentes/reportes/proyecto-fci/proyecto-fci.component';
import { ProduccionCientificaComponent } from './componentes/reportes/produccion-cientifica/produccion-cientifica.component';
import { MonitoreoComponent } from './componentes/procesos/monitoreo/monitoreo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gestion/docente', component: DocenteComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor'] } },
  { path: 'matrizFci', component: MatrizProyectoFciComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor', 'secretario'] } },
  { path: 'horasFci', component: HorasComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor', 'secretario'] } },
  { path: 'procesos/monitoreo', component: MonitoreoComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor', 'secretario'] } },
  { path: 'gestion/lineas', component: LineasComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor'] } },
  { path: 'gestion/sublineas', component: SublineasComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor'] } },
  { path: 'gestion/carreras', component: CarrerasComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor'] } },
  { path: 'gestion/productos', component: ProductoComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor', 'secretario'] } },
  { path: 'gestion/estados', component: EstadosComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor'] } },
  { path: 'gestion/unesco', component: UnescoComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor'] } },
  { path: 'ayuda/cambio-contrasenia', component: ResetPasswordComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor', 'secretario'] } },
  { path: 'ayuda/acerdaDe', component: AyudaComponent },
  { path: 'acreditacion/cargar', component: AcreditacionComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor'] } },
  { path: 'acreditacion/articulos', component: ArticulosComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor', 'secretario'] } },
  { path: 'acreditacion/ponencias', component: PonenciasComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor', 'secretario'] } },
  { path: 'acreditacion/libro', component: LibrosComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor', 'secretario'] } },
  { path: 'acreditacion/capitulo-libro', component: CapituloLibrosComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor', 'secretario'] } },
  { path: 'reportes/proyectos-fci', component: ProyectoFciComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor'] } },
  { path: 'reportes/produccion-cientifica', component: ProduccionCientificaComponent, canActivate: [ProdGuardService], data: { expectedRol: ['gestor'] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

