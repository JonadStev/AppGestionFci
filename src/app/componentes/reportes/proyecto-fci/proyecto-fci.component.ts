import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProyectoDto } from 'src/app/modelos/procesos/proyecto';
import { GestionService } from 'src/app/services/gestion.service';
import { ProcesosService } from 'src/app/services/procesos.service';
import * as FileSaver from 'file-saver';
import { EstadoDto } from 'src/app/modelos/gestion/estado';
import { UsuarioDocenteDto } from 'src/app/modelos/gestion/usuarioDocente';

export interface ProyectoReporte {
  id?: number;
  idProyecto?: string;
  nombre?: string;
  convocatoria?: string;
  estado?: string;
  fechaInicio?: string;
  fechaFin?: string;
  director?: string;
  investigadores?: string;
  correoDirector?: string;
  telefonoDirector?: string;
  nombrecompletoDirector?: string;
}

@Component({
  selector: 'app-proyecto-fci',
  templateUrl: './proyecto-fci.component.html',
  styleUrls: ['./proyecto-fci.component.scss']
})
export class ProyectoFciComponent implements OnInit {

  txtNombre?: String;

  estados: EstadoDto[] = [];
  selectedEstado: string = '';

  directores: UsuarioDocenteDto[] = [];
  selectedDirector: string = '';

  proyectos: ProyectoDto[] = [];
  proyectosReporte: ProyectoReporte[] = [];

  fechaInicio: Date;
  fechaFin: Date;

  constructor(private messageService: MessageService, private gestionService: GestionService, private procesosService: ProcesosService) { }

  ngOnInit(): void {
    this.llenarProyectos();
    this.llenarFiltos();
  }


  llenarProyectos() {
    this.procesosService.getProyectos().subscribe(data => {
      this.proyectos = data;
    });
  }

  llenarFiltos() {
    this.gestionService.getDirectores().subscribe(data => {
      this.directores = data;
    });
    this.gestionService.getEstadosActivos().subscribe(data => {
      this.estados = data;
    });
  }

  consultar() {

    if (this.fechaInicio == null && this.fechaFin != null) {
      this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'Debe selecionar la fecha inicio.' });
      return;
    }

    if (this.fechaInicio != null && this.fechaFin == null) {
      this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'Debe selecionar la fecha fin.' });
      return;
    }

    let fechaIni = '';
    let fechaFinal = '';
    if (this.fechaInicio != null || this.fechaInicio != undefined && this.fechaFin != null || this.fechaFin != undefined) {
      fechaIni = this.fechaInicio.toISOString();
      fechaFinal = this.fechaFin.toISOString();
    }

    this.procesosService.getProyectosByFilter(fechaIni, fechaFinal, this.selectedEstado, this.selectedDirector).subscribe(data => {
      this.proyectos = data;
      this.limpar();
    });

  }

  limpar() {
    this.fechaInicio = new Date;
    this.fechaFin = new Date;
    this.selectedDirector = '';
    this.selectedEstado = '';
  }

  validarCampos(): boolean {
    if (
      this.txtNombre === '' || this.txtNombre === null || this.txtNombre === undefined
    ) {
      return false;
    }
    return true;
  }

  exportExcel() {
    var investigadores = '';
    for (const d of (this.proyectos as any)) {
      investigadores = '';
      for (const i of (d.investigadores as any)) {
        investigadores = investigadores + i.nombreCompleto + ' ';
      }
      this.proyectosReporte.push(
        {
          id: d.id,
          idProyecto: d.idProyecto,
          nombre: d.nombre,
          convocatoria: d.convocatoria,
          estado: d.estado,
          fechaInicio: d.fechaInicio,
          fechaFin: d.fechaFin,
          director: d.nombrecompletoDirector,
          investigadores: investigadores,
          correoDirector: d.correoDirector,
          telefonoDirector: d.telefonoDirector,
          nombrecompletoDirector: d.nombrecompletoDirector
        }
      )
    }
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.proyectosReporte);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      this.saveAsExcelFile(excelBuffer, "ProyectosFCI");
      this.limpar();
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
