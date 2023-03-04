import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { EstadoDto } from 'src/app/modelos/gestion/estado';
import { UsuarioDocenteDto } from 'src/app/modelos/gestion/usuarioDocente';
import { ArticuloReporteDto } from 'src/app/modelos/procesos/articulo';
import { CapituloReporteDto } from 'src/app/modelos/procesos/capitulo';
import { LibroReporteDto } from 'src/app/modelos/procesos/libro';
import { PonenciaReporteDto } from 'src/app/modelos/procesos/ponencia';
import { ProyectoDto } from 'src/app/modelos/procesos/proyecto';
import { GestionService } from 'src/app/services/gestion.service';
import { ProcesosService } from 'src/app/services/procesos.service';


@Component({
  selector: 'app-produccion-cientifica',
  templateUrl: './produccion-cientifica.component.html',
  styleUrls: ['./produccion-cientifica.component.scss']
})
export class ProduccionCientificaComponent implements OnInit {

  tipos: any[] = [{ id: 1, nombre: 'ARTICULO' }, { id: 2, nombre: 'PONENCIA' }, { id: 3, nombre: 'LIBRO' }, { id: 4, nombre: 'CAPITULOS LIBRO' }];
  selectedTipoReporte?: string = '';

  investigadores: UsuarioDocenteDto[] = [];

  proyectos: ProyectoDto[] = [];

  txtTipoPublicacion: string = '';
  txtCodigoPublicacion: string = '';
  fechaInicio: Date;
  selectedDirector: string = '';

  articulosReportes: ArticuloReporteDto[] = [];
  ponenciasReportes: PonenciaReporteDto[] = [];
  librosReportes: LibroReporteDto[] = [];
  capitulosReportes: CapituloReporteDto[] = [];

  constructor(private messageService: MessageService, private gestionService: GestionService, private procesosService: ProcesosService) { }

  ngOnInit(): void {
    this.llenarFiltos();
  }

  llenarFiltos() {
    this.gestionService.getInvestigadores().subscribe(data => {
      this.investigadores = data;
    });
  }

  limpar() {
    this.fechaInicio = new Date;
    this.selectedDirector = '';
    this.txtTipoPublicacion = '';
    this.txtCodigoPublicacion = '';
    this.selectedTipoReporte = '';
  }


  exportExcel() {
    let fechaIni = '';
    if (this.fechaInicio != null || this.fechaInicio != undefined) {
      fechaIni = this.fechaInicio.toISOString();
    }
    if ((this.txtTipoPublicacion === '' || this.txtTipoPublicacion === undefined || this.txtTipoPublicacion === null) &&
      (this.txtCodigoPublicacion === '' || this.txtCodigoPublicacion === undefined || this.txtCodigoPublicacion === null) &&
      (fechaIni === '' || fechaIni === undefined || fechaIni === null) &&
      (this.selectedDirector === '' || this.selectedDirector === undefined || this.selectedDirector === null)
    ) {
      this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'Debe seleccionar mínimo un filtro.' });
      return;
    }

    if (this.selectedTipoReporte === 'ARTICULO') {
      this.procesosService.getArticulosByFilter(this.txtTipoPublicacion, this.txtCodigoPublicacion, fechaIni, this.selectedDirector).subscribe(data => {
        if (data.length === 0) {
          this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'No existe información con los filtros seleccionados.' });
          return;
        }
        var docentesLista = '';
        for (const d of (data as any)) {
          docentesLista = '';
          for (const i of (d.docentes as any)) {
            docentesLista = docentesLista + i.nombreCompleto + ' ';
          }
          const nuevoArticulo: ArticuloReporteDto = {
            id: d.id,
            facultad: d.facultad,
            codigoUg: d.codigoUg,
            tipoPublicacion: d.tipoPublicacion,
            codigoPublicacion: d.codigoPublicacion,
            tituloPublicacion: d.tituloPublicacion,
            doi: d.doi,
            baseDatosindexada: d.baseDatosindexada,
            codigoISSN: d.codigoISSN,
            tipoIndexacion: d.tipoIndexacion,
            nombreRevista: d.nombreRevista,
            numeroRevista: d.numeroRevista,
            quartil: d.quartil,
            srjJcr: d.srjJcr,
            fechaPublicacion: d.fechaPublicacion,
            campoDetallado: d.campoDetallado,
            estado: d.estado,
            linkPublicacion: d.linkPublicacion,
            linkRevista: d.linkRevista,
            filiacion: d.filiacion,
            dominio: d.dominio,
            linea: d.linea,
            sublinea: d.sublinea,
            docentes: docentesLista,
            tituloProyectoFci: d.tituloProyectoFci,
            observacion: d.observacion
          };
          this.articulosReportes.push(nuevoArticulo);
        }
        this.generarReporte(this.articulosReportes, 'Articulos');
        this.limpar();
      });
    } else if (this.selectedTipoReporte === 'PONENCIA') {
      this.procesosService.getPonenciasByFilter(this.txtTipoPublicacion, this.txtCodigoPublicacion, fechaIni, this.selectedDirector).subscribe(data => {
        if (data.length === 0) {
          this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'No existe información con los filtros seleccionados.' });
          return;
        }
        var docentesLista = '';
        for (const d of (data as any)) {
          docentesLista = '';
          for (const i of (d.docentes as any)) {
            docentesLista = docentesLista + i.nombreCompleto + ' ';
          }
          const nuevaPonencia: PonenciaReporteDto = {
            id: d.id,
            facultad: d.facultad,
            codigoUg: d.codigoUg,
            tipoPublicacion: d.tipoPublicacion,
            codigoPublicacion: d.codigoPublicacion,
            nombrePonencia: d.nombrePonencia,
            doi: d.doi,
            nombreEvento: d.nombreEvento,
            baseDatosIndexada: d.baseDatosIndexada,
            codigoIsbnIss: d.codigoIsbnIss,
            tipoIndexacion: d.tipoIndexacion,
            edicionEvento: d.edicionEvento,
            organizadorEvento: d.organizadorEvento,
            comiteCientifico: d.comiteCientifico,
            pais: d.pais,
            ciudad: d.ciudad,
            fechaPublicacion: d.fechaPublicacion,
            quartil: d.quartil,
            sjrJcr: d.sjrJcr,
            campoDetallado: d.campoDetallado,
            linkPublicacion: d.linkPublicacion,
            filiacionUg: d.filiacionUg,
            dominio: d.dominio,
            linea: d.linea,
            sublinea: d.sublinea,
            docentes: docentesLista,
            tituloProyectoFci: d.tituloProyectoFci,
            observacion: d.observacion
          };
          this.ponenciasReportes.push(nuevaPonencia);
        }
        this.generarReporte(this.ponenciasReportes, 'Ponencia');
        this.limpar();
      });
    } else if (this.selectedTipoReporte === 'LIBRO') {
      this.procesosService.getLibrosByFilter(this.txtTipoPublicacion, this.txtCodigoPublicacion, fechaIni, this.selectedDirector).subscribe(data => {
        if (data.length === 0) {
          this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'No existe información con los filtros seleccionados.' });
          return;
        }
        var docentesLista = '';
        for (const d of (data as any)) {
          docentesLista = '';
          for (const i of (d.docentes as any)) {
            docentesLista = docentesLista + i.nombreCompleto + ' ';
          }
          const nuevoLibro: LibroReporteDto = {
            id: d.id,
            facultad: d.facultad,
            codigoUg: d.codigoUg,
            tipoPublicacion: d.tipoPublicacion,
            codigoPublicacion: d.codigoPublicacion,
            tituloLibro: d.tituloLibro,
            codigoIsbn: d.codigoIsbn,
            editorCompilador: d.editorCompilador,
            paginas: d.paginas,
            fechaPublicacion: d.fechaPublicacion,
            linkPublicacion: d.linkPublicacion,
            campoDetallado: d.campoDetallado,
            filiacionUg: d.filiacionUg,
            revicionPorPares: d.revicionPorPares,
            dominio: d.dominio,
            linea: d.linea,
            sublinea: d.sublinea,
            docentes: d.docentes,
            tituloProyectoFci: d.tituloProyectoFci,
            observacion: d.observacion
          };
          this.librosReportes.push(nuevoLibro);
        }
        this.generarReporte(this.librosReportes, 'Libro');
        this.limpar();
      });
    } else if (this.selectedTipoReporte === 'CAPITULOS LIBRO') {
      this.procesosService.getCapitulosByFilter(this.txtTipoPublicacion, this.txtCodigoPublicacion, fechaIni, this.selectedDirector).subscribe(data => {
        if (data.length === 0) {
          this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'No existe información con los filtros seleccionados.' });
          return;
        }
        var docentesLista = '';
        for (const d of (data as any)) {
          docentesLista = '';
          for (const i of (d.docentes as any)) {
            docentesLista = docentesLista + i.nombreCompleto + ' ';
          }
          const nuevoCapitulo: CapituloReporteDto = {
            id: d.id,
            facultad: d.facultad,
            codigoUg: d.codigoUg,
            tipoPublicacion: d.tipoPublicacion,
            codigoPublicacion: d.codigoPublicacion,
            tituloLibro: d.tituloLibro,
            tituloCapitulo: d.tituloCapitulo,
            codigoIsbn: d.codigoIsbn,
            editorCompilador: d.editorCompilador,
            paginas: d.paginas,
            fechaPublicacion: d.fechaPublicacion,
            linkPublicacion: d.linkPublicacion,
            campoDetallado: d.campoDetallado,
            filiacionUg: d.filiacionUg,
            revicionPorPares: d.revicionPorPares,
            dominio: d.dominio,
            linea: d.linea,
            sublinea: d.sublinea,
            docentes: d.docentes,
            tituloProyectoFci: d.tituloProyectoFci,
            observacion: d.observacion
          };
          this.capitulosReportes.push(nuevoCapitulo);
          this.limpar();
        }
        this.generarReporte(this.capitulosReportes, 'CapitulosLibro');
      });
    }

    /*
    this.procesosService.getProyectosByFilter(fechaIni, fechaFinal, this.selectedEstado, this.selectedDirector).subscribe(data => {
      this.proyectos = data;
      this.limpar();
    });
    */


  }

  generarReporte(data: any[], nombreReporte: string) {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      this.saveAsExcelFile(excelBuffer, nombreReporte);
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
