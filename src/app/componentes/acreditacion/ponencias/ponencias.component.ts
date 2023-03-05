import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { LineaDto } from 'src/app/modelos/gestion/linea';
import { SubLineaDto } from 'src/app/modelos/gestion/subLinea';
import { UnescoDto } from 'src/app/modelos/gestion/unesco';
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

  unescos: UnescoDto [] = [];
  selectedUnesco: string = '';

  fechaPublicacion: Date;
  campoDetalladoId: number;

  constructor(private messageService: MessageService, private procesoService: ProcesosService, private gestionService: GestionService) { }

  ngOnInit(): void {
    this.llenarPonencias();
    this.llenarLineas();
    this.llenarUnesco();
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

  llenarUnesco(){
    this.gestionService.getUnescos().subscribe(data => {
      this.unescos = data;
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
    
    this.ponencia.linea = this.selectedLinea;
    this.ponencia.sublinea = this.selectedSublinea;

    for (const d of (this.unescos as any)) {
      if (d.nombre === this.selectedUnesco) {
        this.campoDetalladoId = d.codigo;
      }
    }
    this.ponencia.campoDetallado = Number(this.campoDetalladoId);
    this.ponencia.fechaPublicacion = this.fechaPublicacion.toISOString();
    console.log(this.ponencia);
    
    this.procesoService.guardarPonencia(this.ponencia).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Información', detail: 'Registro guardado exitosamente.' });
      this.llenarPonencias();
      this.limpar();
    });
  }


  onRowSelectPonencia(event: any) {
    this.limpar();

    this.docentes = event.data.docentes;
    this.ponencia = event.data
    this.selectedLinea = event.data.linea
    this.llenarSublinea();
    this.selectedSublinea = event.data.sublinea;

    let campoDetallado = event.data.campoDetallado;
    for (const d of (this.unescos as any)) {
      if (d.codigo == campoDetallado) {
        this.selectedUnesco = d.nombre;
      }
    }
    this.fechaPublicacion = this.convertStringToDate(event.data.fechaPublicacion);
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

  convertStringToDate(dateString: string) {
    const [day, month, year] = dateString.split('/');
    return new Date([month, day, year].join('/'));
  }

}
