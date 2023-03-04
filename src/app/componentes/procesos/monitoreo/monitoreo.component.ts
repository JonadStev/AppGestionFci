import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LineaDto } from 'src/app/modelos/gestion/linea';
import { MonitoreoDto } from 'src/app/modelos/procesos/monitoreo';
import { ProyectoDto } from 'src/app/modelos/procesos/proyecto';
import { GestionService } from 'src/app/services/gestion.service';
import { ProcesosService } from 'src/app/services/procesos.service';

@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrls: ['./monitoreo.component.scss']
})
export class MonitoreoComponent implements OnInit {

  estados: any[] = [{ id: 1, nombreEstado: 'ACTIVO' }, { id: 2, nombreEstado: 'INACTIVO' }];
  selectedEstado?: string = '';

  listLineas: LineaDto[] = [];

  linea: LineaDto = {};

  txtNombre?: string;


  proyectos: ProyectoDto[] = [];
  selectedProyecto: ProyectoDto = {};
  selectedPro: string = '';
  proyectoSelected: ProyectoDto = {};

  fechaInicio: Date;
  fechaFin: Date;

  txtAutoevaluacion: string = '';
  txtInforme: string = ''

  monitoreo: MonitoreoDto = {};
  monitoreos: MonitoreoDto[] = [];

  constructor(private messageService: MessageService, private gestionService: GestionService, private procesosService: ProcesosService) { }

  ngOnInit(): void {
    this.llenarSelects();
  }

  llenarSelects() {
    this.procesosService.getProyectosActivos().subscribe(data => {
      this.proyectos = data;
    });
    this.procesosService.getMonitoreos().subscribe(data => {
      this.monitoreos = data;
    });
  }


  guardarMonitoreo() {

    if (this.selectedPro === '' || this.selectedPro === null || this.selectedPro === undefined) {
      this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'Debe seleccionar un proyecto.' });
      return;
    }

    if (this.txtAutoevaluacion === '' || this.txtAutoevaluacion === null || this.txtAutoevaluacion === undefined) {
      this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'Debe llenar los datos de autoevaluacion.' });
      return;
    }

    if (this.txtInforme === '' || this.txtInforme === null || this.txtInforme === undefined) {
      this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'Debe llenar los datos de informe.' });
      return;
    }

    for (const d of (this.proyectos as any)) {
      if (d.idProyecto === this.selectedPro) {
        this.selectedProyecto = d;
      }
    }
    if (this.selectedProyecto.fechaInicio !== undefined) {
      this.fechaInicio = this.convertStringToDate(this.selectedProyecto.fechaInicio);
    }
    if (this.selectedProyecto.fechaFin !== undefined) {
      this.fechaFin = this.convertStringToDate(this.selectedProyecto.fechaFin);
    }
    this.selectedProyecto.fechaInicio = this.fechaInicio.toISOString();
    this.selectedProyecto.fechaFin = this.fechaFin.toISOString();

    this.monitoreo.proyecto = this.selectedProyecto;
    this.monitoreo.autoevaluacion = this.txtAutoevaluacion;
    this.monitoreo.informe = this.txtInforme;

    console.log(this.monitoreo);
    this.procesosService.guardarMonitoreo(this.monitoreo).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Información', detail: 'Registro guardado exitosamente.' });
      this.llenarSelects();
      this.limpar();
    });


  }

  onRowSelectMonitoreo(event: any) {
    this.monitoreo = event.data;
    this.txtAutoevaluacion = event.data.autoevaluacion;
    this.txtInforme = event.data.informe;
    this.selectedPro = event.data.proyecto.idProyecto;
  }

  onRowUnselectMonitoreo(event: any) {
    this.limpar();
  }

  limpar() {
    this.monitoreo = {};
    this.txtAutoevaluacion = '';
    this.txtInforme = '';
    this.selectedPro = '';
    this.selectedProyecto = {};
  }

  convertStringToDate(dateString: string) {
    const [day, month, year] = dateString.split('/');
    return new Date([month, day, year].join('/'));
  }

}
