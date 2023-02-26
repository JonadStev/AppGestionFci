import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { GMapModule } from 'primeng/gmap';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { ToastModule } from 'primeng/toast';
import { DataViewModule } from 'primeng/dataview';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { MultiSelectModule } from 'primeng/multiselect';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { interceptorProvider } from './interceptors/prod-interceptor.service';
import { HomeComponent } from './componentes/home/home.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { RegistroComponent } from './componentes/cuentas/registro/registro.component';
import { MantenimientoComponent } from './componentes/cuentas/mantenimiento/mantenimiento.component';
import { BloqueoComponent } from './componentes/cuentas/bloqueo/bloqueo.component';
import { BloquesComponent } from './componentes/bloques/bloques.component';
import { CuentasBaneosComponent } from './dash/cuentas-baneos/cuentas-baneos.component';
import { CuentasGeneralesComponent } from './dash/cuentas-generales/cuentas-generales.component';
import { CeuntasBloqueComponent } from './dash/ceuntas-bloque/ceuntas-bloque.component';
import { DocenteComponent } from './componentes/gestion/docente/docente.component';
import { MatrizProyectoFciComponent } from './componentes/procesos/matriz-proyecto-fci/matriz-proyecto-fci.component';
import { HorasComponent } from './componentes/procesos/horas/horas.component';
import { ArticulosComponent } from './componentes/acreditacion/articulos/articulos.component';
import { PonenciasComponent } from './componentes/acreditacion/ponencias/ponencias.component';
import { LibrosComponent } from './componentes/acreditacion/libros/libros.component';
import { CapituloLibrosComponent } from './componentes/acreditacion/capitulo-libros/capitulo-libros.component';
import { LineasComponent } from './componentes/gestion/lineas/lineas.component';
import { SublineasComponent } from './componentes/gestion/sublineas/sublineas.component';
import { CarrerasComponent } from './componentes/gestion/carreras/carreras.component';
import { EstadosComponent } from './componentes/gestion/estados/estados.component';
import { UnescoComponent } from './componentes/gestion/unesco/unesco.component';
import { AyudaComponent } from './componentes/ayuda/ayuda/ayuda.component';
import { ResetPasswordComponent } from './componentes/ayuda/reset-password/reset-password.component';
import { AcreditacionComponent } from './componentes/procesos/acreditacion/cargaAcreditacion/acreditacion/acreditacion.component';
import { PronenciasComponent } from './componentes/procesos/acreditacion/ponencias/pronencias/pronencias.component';
import { LibroComponent } from './componentes/procesos/acreditacion/libro/libro/libro.component';
import { CapituloLibroComponent } from './componentes/procesos/acreditacion/capituloLibro/capitulo-libro/capitulo-libro.component';
import { ProductoComponent } from './componentes/gestion/producto/producto.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    MenuComponent,
    UsuariosComponent,
    RegistroComponent,
    MantenimientoComponent,
    BloqueoComponent,
    BloquesComponent,
    CuentasBaneosComponent,
    CuentasGeneralesComponent,
    CeuntasBloqueComponent,
    DocenteComponent,
    MatrizProyectoFciComponent,
    HorasComponent,
    ArticulosComponent,
    PonenciasComponent,
    LibrosComponent,
    CapituloLibrosComponent,
    LineasComponent,
    SublineasComponent,
    CarrerasComponent,
    EstadosComponent,
    UnescoComponent,
    AyudaComponent,
    ResetPasswordComponent,
    AcreditacionComponent,
    PronenciasComponent,
    LibroComponent,
    CapituloLibroComponent,
    ProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    ImageModule,
    InputTextModule,
    SidebarModule,
    CardModule,
    CarouselModule,
    GMapModule,
    TableModule,
    DropdownModule,
    GalleriaModule,
    ToastModule,
    DataViewModule,
    MessagesModule,
    MessageModule,
    CalendarModule,
    ChartModule,
    InputTextareaModule,
    PasswordModule,
    MultiSelectModule,
    DividerModule,
    InputNumberModule,
    FileUploadModule
  ],
  providers: [interceptorProvider, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
