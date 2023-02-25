import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { EstadoDto } from 'src/app/modelos/gestion/estado';
import { UsuarioDocenteDto } from 'src/app/modelos/gestion/usuarioDocente';
import { ProyectoDto } from 'src/app/modelos/procesos/proyecto';
import { GestionService } from 'src/app/services/gestion.service';
import { ProcesosService } from 'src/app/services/procesos.service';

@Component({
  selector: 'app-matriz-proyecto-fci',
  templateUrl: './matriz-proyecto-fci.component.html',
  styleUrls: ['./matriz-proyecto-fci.component.scss']
})
export class MatrizProyectoFciComponent implements OnInit {

  estados: EstadoDto[] = [];
  selectedEstado?: string = '';

  directores: UsuarioDocenteDto[] = [];
  investigadores: UsuarioDocenteDto[] = [];
  selectedDirector: UsuarioDocenteDto = {};
  selectedInvestigadores: UsuarioDocenteDto[] = [];

  proyecto: ProyectoDto = {};
  fechaInicio: Date = new Date;
  fechaFin: Date = new Date;

  proyectos: ProyectoDto[] = [];

  constructor(private messageService: MessageService, private gestionService: GestionService, private procesosService: ProcesosService) { }

  ngOnInit(): void {
    this.llenarDirectoresEInvestigadores();
    this.llenarProyectos();
  }


  llenarDirectoresEInvestigadores() {
    this.gestionService.getDirectores().subscribe(data => {
      this.directores = data;
    });
    this.gestionService.getInvestigadores().subscribe(data => {
      this.investigadores = data;
    });
    this.gestionService.getEstadosActivos().subscribe(data => {
      this.estados = data;
    });
  }

  llenarProyectos() {
    this.procesosService.getProyectos().subscribe(data => {
      this.proyectos = data;
    });
  }

  seleccionDirector(event: any) {
    this.proyecto.correoDirector = this.selectedDirector.email;
    this.proyecto.telefonoDirector = this.selectedDirector.telefono;
  }

  seleccionInvestigadores(event: any) {

  }

  guardarProyecto() {

    this.proyecto.estado = this.selectedEstado;
    this.proyecto.investigadores = this.selectedInvestigadores;
    this.proyecto.fechaInicio = this.fechaInicio.toLocaleDateString();
    this.proyecto.fechaFin = this.fechaFin.toLocaleDateString();
    this.proyecto.director = this.selectedDirector;

    if (!this.validarCampos()) {
      this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'Los campos son obligatorios.' });
      return;
    }

    this.procesosService.guardarProyecto(this.proyecto).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Información', detail: 'Registro guardado exitosamente.' });
      this.llenarDirectoresEInvestigadores();
      this.llenarProyectos();
      this.limpar();
    });
  }


  onRowSelectBloque(event: any) {

    this.proyecto.id = event.data.id;
    this.proyecto.idProyecto = event.data.idProyecto;
    this.proyecto.nombre = event.data.nombre;
    this.proyecto.convocatoria = event.data.convocatoria;
    this.fechaInicio = this.convertStringToDate(event.data.fechaInicio);
    this.fechaFin = this.convertStringToDate(event.data.fechaFin);
    this.selectedDirector = event.data.director;
    this.selectedInvestigadores = event.data.investigadores;
    this.proyecto.correoDirector = event.data.correoDirector;
    this.proyecto.telefonoDirector = event.data.telefonoDirector;
    this.selectedEstado = event.data.estado;
    console.log(event.data);
  }

  convertStringToDate(dateString: string) {
    const [day, month, year] = dateString.split('/');
    return new Date([month, day, year].join('/'));
  }

  onRowUnselectBloque(event: any) {
    this.limpar();
  }

  limpar() {
    this.proyecto = {};
    this.selectedInvestigadores = [];
    this.selectedDirector = {};
    this.selectedEstado = '';
    this.fechaInicio = new Date;
    this.fechaFin = new Date;

  }

  validarCampos(): boolean {
    if (
      this.proyecto.idProyecto === '' || this.proyecto.idProyecto === null || this.proyecto.idProyecto === undefined ||
      this.proyecto.nombre === '' || this.proyecto.nombre === null || this.proyecto.nombre === undefined ||
      this.proyecto.convocatoria === '' || this.proyecto.convocatoria === null || this.proyecto.convocatoria === undefined ||
      this.proyecto.fechaInicio === '' || this.proyecto.fechaInicio === null || this.proyecto.fechaInicio === undefined ||
      this.proyecto.fechaFin === '' || this.proyecto.fechaFin === null || this.proyecto.fechaFin === undefined ||
      this.selectedEstado === '' || this.selectedEstado === null || this.selectedEstado === undefined ||
      this.proyecto.correoDirector === '' || this.proyecto.correoDirector === null || this.proyecto.correoDirector === undefined ||
      this.proyecto.telefonoDirector === '' || this.proyecto.telefonoDirector === null || this.proyecto.telefonoDirector === undefined
    ) {
      return false;
    }
    return true;
  }

}

