import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { LineaDto } from 'src/app/modelos/gestion/linea';
import { SubLineaDto } from 'src/app/modelos/gestion/subLinea';
import { UnescoDto } from 'src/app/modelos/gestion/unesco';
import { UsuarioDocenteDto } from 'src/app/modelos/gestion/usuarioDocente';
import { CapituloDto } from 'src/app/modelos/procesos/capitulo';
import { LibroDto } from 'src/app/modelos/procesos/libro';
import { GestionService } from 'src/app/services/gestion.service';
import { ProcesosService } from 'src/app/services/procesos.service';

@Component({
  selector: 'app-capitulo-libros',
  templateUrl: './capitulo-libros.component.html',
  styleUrls: ['./capitulo-libros.component.scss']
})
export class CapituloLibrosComponent implements OnInit {

  capitulo: CapituloDto = {};
  capitulos: CapituloDto[] = [];

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
    this.llenarCapitulosLibro();
    this.llenarLineas();
    this.llenarUnesco();
  }

  llenarCapitulosLibro() {
    this.procesoService.getCapitulosLibro().subscribe(data => {
      this.capitulos = data;
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
    
    this.capitulo.linea = this.selectedLinea;
    this.capitulo.sublinea = this.selectedSublinea;

    for (const d of (this.unescos as any)) {
      if (d.nombre === this.selectedUnesco) {
        this.campoDetalladoId = d.codigo;
      }
    }
    this.capitulo.campoDetallado = Number(this.campoDetalladoId);
    this.capitulo.fechaPublicacion = this.fechaPublicacion.toISOString();
    console.log(this.capitulo);
    
    this.procesoService.guardarCapitulo(this.capitulo).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Información', detail: 'Registro guardado exitosamente.' });
      this.llenarCapitulosLibro();
      this.limpar();
    });
  }


  onRowSelectLibro(event: any) {
    this.limpar();

    this.docentes = event.data.docentes;
    this.capitulo = event.data
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

  onRowUnselectLibro(event: any) {
    this.docentes = [];
    this.capitulo = {};
    this.limpar();
  }

  limpar() {
    this.docentes = [];
    this.capitulo = {};
    this.selectedLinea = '';
    this.selectedSublinea = '';
  }

  validarCampos(): boolean {
    if (
      this.selectedSublinea === '' || this.selectedSublinea === null || this.selectedSublinea === undefined
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
