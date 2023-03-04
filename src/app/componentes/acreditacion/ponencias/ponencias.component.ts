import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { LineaDto } from 'src/app/modelos/gestion/linea';
import { SubLineaDto } from 'src/app/modelos/gestion/subLinea';
import { UsuarioDocenteDto } from 'src/app/modelos/gestion/usuarioDocente';
import { PonenciaDto } from 'src/app/modelos/procesos/ponencia';
import { GestionService } from 'src/app/services/gestion.service';
import { ProcesosService } from 'src/app/services/procesos.service';

@Component({
  selector: 'app-ponencias',
  templateUrl: './ponencias.component.html',
  styleUrls: ['./ponencias.component.scss']
})
export class PonenciasComponent implements OnInit {

  ponencia: PonenciaDto = {};
  ponencias: PonenciaDto[] = [];

  docentes: UsuarioDocenteDto[] = [];

  lineas: LineaDto[] = [];
  selectedLinea?: string = '';

  sublineas: SubLineaDto[] = [];
  selectedSublinea?: string = '';

  constructor(private messageService: MessageService, private procesoService: ProcesosService, private gestionService: GestionService) { }

  ngOnInit(): void {
    this.llenarPonencias();
    this.llenarLineas();
  }

  llenarPonencias() {
    this.procesoService.getPonencias().subscribe(data => {
      this.ponencias = data;
    });
  }

  llenarLineas() {
    this.gestionService.getLineas().subscribe(data => {
      this.lineas = data;
    });
  }

  llenarSublinea() {
    let idSublinea;
    for (const d of (this.lineas as any)) {
      if (d.nombre === this.selectedLinea) {
        idSublinea = d.id;
      }
    }
    this.gestionService.getSubLineasByLinea(idSublinea).subscribe(data => {
      this.sublineas = data;
    });

  }

  guardarEstado() {
    this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Información', detail: 'Registro guardado exitosamente.' });
    this.limpar();
  }


  onRowSelectPonencia(event: any) {
    this.limpar();

    this.docentes = event.data.docentes;
    this.ponencia = event.data
    this.selectedLinea = event.data.linea
    this.llenarSublinea();
    this.selectedSublinea = event.data.sublinea;
  }

  onRowUnselectPonencia(event: any) {
    this.docentes = [];
    this.ponencia = {};
    this.limpar();
  }

  limpar() {
    this.docentes = [];
    this.ponencia = {};
    this.selectedLinea = '';
    this.selectedSublinea = '';
  }

  validarCampos(): boolean {
    if (
      this.selectedLinea === '' || this.selectedLinea === null || this.selectedLinea === undefined
    ) {
      return false;
    }
    return true;
  }

}
