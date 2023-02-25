import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EstadoDto } from 'src/app/modelos/gestion/estado';
import { ConocimientoDto, PiramideCientificaDto, ProdCientificaDto, ProductoDto, PropiedadIntelectualDto } from 'src/app/modelos/gestion/producto';
import { UsuarioDocenteDto } from 'src/app/modelos/gestion/usuarioDocente';
import { ProyectoDto } from 'src/app/modelos/procesos/proyecto';
import { GestionService } from 'src/app/services/gestion.service';
import { ProcesosService } from 'src/app/services/procesos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  selectedEstado?: string = '';

  estados: EstadoDto[] = [];

  directores: UsuarioDocenteDto[] = [];
  selectedDirector: UsuarioDocenteDto = {};

  proyectos: ProyectoDto[] = [];
  selectedProyecto: ProyectoDto = {};

  productos: ProductoDto[] = [];

  producto: ProductoDto = {};
  prodCientificaPropuesto: ProdCientificaDto = {};
  prodCientificaCumplido: ProdCientificaDto = {};
  propIntelectualPropuesto: PropiedadIntelectualDto = {};
  propIntelectualCumplido: PropiedadIntelectualDto = {};
  conocimientoPropuesto: ConocimientoDto = {};
  conocimientoCumplido: ConocimientoDto = {};
  piramCientificaPropuesto: PiramideCientificaDto = {};
  piramCientificaCumplido: PiramideCientificaDto = {};

  fechaInicio: Date;
  fechaFin: Date;


  constructor(private messageService: MessageService, private gestionService: GestionService, private procesoService: ProcesosService) { }

  ngOnInit(): void {
    this.llenarSelects();
    this.llenarProductos();
  }

  llenarSelects() {
    this.procesoService.getProyectosActivos().subscribe(data => {
      this.proyectos = data;
    });
    this.gestionService.getDirectores().subscribe(data => {
      this.directores = data;
    });
    this.gestionService.getEstadosActivos().subscribe(data => {
      this.estados = data;
    });
  }

  llenarProductos() {
    this.gestionService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  seleccionarProyecto(event: any) {
    this.producto.proyecto = this.selectedProyecto;
    this.fechaInicio = this.convertStringToDate(event.value.fechaInicio);
    this.fechaFin = this.convertStringToDate(event.value.fechaFin);
    this.producto.nombreProyecto = this.selectedProyecto.nombre;
    console.log(this.fechaInicio.toISOString());
  }

  guardarProducto() {
    this.producto.director = this.selectedDirector;
    this.producto.estado = this.selectedEstado;

    this.producto.pcPropuesto = this.prodCientificaPropuesto;
    this.producto.pcCumplido = this.prodCientificaCumplido;
    this.producto.piPropuesto = this.propIntelectualPropuesto;
    this.producto.piCumplido = this.propIntelectualCumplido;
    this.producto.conocimientoPropuesto = this.conocimientoPropuesto;
    this.producto.conocimientoCumplido = this.conocimientoCumplido;
    this.producto.piramidePropuesto = this.piramCientificaPropuesto;
    this.producto.piramideCumplido = this.piramCientificaCumplido;

    if (this.producto?.proyecto?.fechaInicio != undefined && this.producto?.proyecto?.fechaFin != undefined) {
      //const fechaInicio = this.convertStringToDate(this.producto.proyecto.fechaInicio);
      //const fechaFin = this.convertStringToDate(this.producto.proyecto.fechaFin);
      this.producto.proyecto.fechaInicio = this.fechaInicio.toISOString();
      this.producto.proyecto.fechaFin = this.fechaFin.toISOString();
    }

    if (!this.validarCampos()) {
      this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'Los campos son obligatorios.' });
      return;
    }

    this.gestionService.guardarProducto(this.producto).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Información', detail: 'Registro guardado exitosamente.' });
      this.llenarSelects();
      this.llenarProductos();
      this.limpar();
    });
  }

  convertStringToDate(dateString: string) {
    const [day, month, year] = dateString.split('/');
    return new Date([month, day, year].join('/'));
  }

  onRowSelectProducto(event: any) {
    this.producto = event.data;
    this.selectedEstado = event.data.estado;
    this.selectedDirector = event.data.director;
    this.selectedProyecto = event.data.proyecto;
    this.fechaInicio = this.convertStringToDate(event.data.proyecto.fechaInicio);
    this.fechaFin = this.convertStringToDate(event.data.proyecto.fechaFin);
    this.prodCientificaPropuesto = event.data.pcPropuesto;
    this.prodCientificaCumplido = event.data.pcCumplido;
    this.propIntelectualPropuesto = event.data.piPropuesto;
    this.propIntelectualCumplido = event.data.piCumplido;
    this.conocimientoPropuesto = event.data.conocimientoPropuesto;
    this.conocimientoCumplido = event.data.conocimientoCumplido;
    this.piramCientificaPropuesto = event.data.piramidePropuesto;
    this.piramCientificaCumplido = event.data.piramideCumplido;
  }

  onRowUnselectProducto(event: any) {
    this.limpar();
  }

  limpar() {
    this.producto = {};
    this.selectedDirector = {};
    this.selectedProyecto = {};
    this.prodCientificaPropuesto = {};
    this.prodCientificaCumplido = {};
    this.propIntelectualPropuesto = {};
    this.propIntelectualCumplido = {};
    this.conocimientoPropuesto = {};
    this.conocimientoCumplido = {};
    this.piramCientificaPropuesto = {};
    this.piramCientificaCumplido = {};
    this.selectedEstado = '';
  }

  validarCampos(): boolean {
    if (
      this.prodCientificaPropuesto.libros === '' || this.prodCientificaPropuesto.libros === null || this.prodCientificaPropuesto.libros === undefined ||
      this.prodCientificaPropuesto.mundial === '' || this.prodCientificaPropuesto.mundial === null || this.prodCientificaPropuesto.mundial === undefined ||
      this.prodCientificaPropuesto.regional === '' || this.prodCientificaPropuesto.regional === null || this.prodCientificaPropuesto.regional === undefined ||
      this.prodCientificaCumplido.libros === '' || this.prodCientificaCumplido.libros === null || this.prodCientificaCumplido.libros === undefined ||
      this.prodCientificaCumplido.mundial === '' || this.prodCientificaCumplido.mundial === null || this.prodCientificaCumplido.mundial === undefined ||
      this.prodCientificaCumplido.regional === '' || this.prodCientificaCumplido.regional === null || this.prodCientificaCumplido.regional === undefined ||
      this.propIntelectualPropuesto.autor === '' || this.propIntelectualPropuesto.autor === null || this.propIntelectualPropuesto.autor === undefined ||
      this.propIntelectualPropuesto.industrial === '' || this.propIntelectualPropuesto.industrial === null || this.propIntelectualPropuesto.industrial === undefined ||
      this.propIntelectualPropuesto.vegetal === '' || this.propIntelectualPropuesto.vegetal === null || this.propIntelectualPropuesto.vegetal === undefined ||
      this.propIntelectualCumplido.autor === '' || this.propIntelectualCumplido.autor === null || this.propIntelectualCumplido.autor === undefined ||
      this.propIntelectualCumplido.industrial === '' || this.propIntelectualCumplido.industrial === null || this.propIntelectualCumplido.industrial === undefined ||
      this.propIntelectualCumplido.vegetal === '' || this.propIntelectualCumplido.vegetal === null || this.propIntelectualCumplido.vegetal === undefined ||
      this.conocimientoPropuesto.grupos === '' || this.conocimientoPropuesto.grupos === null || this.conocimientoPropuesto.grupos === undefined ||
      this.conocimientoPropuesto.redes === '' || this.conocimientoPropuesto.redes === null || this.conocimientoPropuesto.redes === undefined ||
      this.conocimientoCumplido.grupos === '' || this.conocimientoCumplido.grupos === null || this.conocimientoCumplido.grupos === undefined ||
      this.conocimientoCumplido.redes === '' || this.conocimientoCumplido.redes === null || this.conocimientoCumplido.redes === undefined ||
      this.piramCientificaPropuesto.grado === '' || this.piramCientificaPropuesto.grado === null || this.piramCientificaPropuesto.grado === undefined ||
      this.piramCientificaPropuesto.postGrado === '' || this.piramCientificaPropuesto.postGrado === null || this.piramCientificaPropuesto.postGrado === undefined ||
      this.piramCientificaPropuesto.doctorado === '' || this.piramCientificaPropuesto.doctorado === null || this.piramCientificaPropuesto.doctorado === undefined ||
      this.piramCientificaCumplido.grado === '' || this.piramCientificaCumplido.grado === null || this.piramCientificaCumplido.grado === undefined ||
      this.piramCientificaCumplido.postGrado === '' || this.piramCientificaCumplido.postGrado === null || this.piramCientificaCumplido.postGrado === undefined ||
      this.piramCientificaCumplido.doctorado === '' || this.piramCientificaCumplido.doctorado === null || this.piramCientificaCumplido.doctorado === undefined ||
      this.producto.nombreProyecto === '' || this.producto.nombreProyecto === null || this.producto.nombreProyecto === undefined ||
      this.selectedDirector.nombreCompleto === '' || this.selectedDirector.nombreCompleto === null || this.selectedDirector.nombreCompleto === undefined ||
      this.selectedEstado === '' || this.selectedEstado === null || this.selectedEstado === undefined
    ) {
      return false;
    }
    return true;
  }

}

