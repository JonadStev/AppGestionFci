import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { LineaDto } from 'src/app/modelos/gestion/linea';
import { SubLineaDto } from 'src/app/modelos/gestion/subLinea';
import { UnescoDto } from 'src/app/modelos/gestion/unesco';
import { UsuarioDocenteDto } from 'src/app/modelos/gestion/usuarioDocente';
import { LibroDto } from 'src/app/modelos/procesos/libro';
import { GestionService } from 'src/app/services/gestion.service';
import { ProcesosService } from 'src/app/services/procesos.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss']
})
export class LibrosComponent implements OnInit {

  libro: LibroDto = {};
  libros: LibroDto[] = [];

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
    this.llenarLibros();
    this.llenarLineas();
    this.llenarUnesco();
  }

  llenarLibros() {
    this.procesoService.getLibros().subscribe(data => {
      this.libros = data;
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
    
    this.libro.linea = this.selectedLinea;
    this.libro.sublinea = this.selectedSublinea;

    for (const d of (this.unescos as any)) {
      if (d.nombre === this.selectedUnesco) {
        this.campoDetalladoId = d.codigo;
      }
    }
    this.libro.campoDetallado = Number(this.campoDetalladoId);
    this.libro.fechaPublicacion = this.fechaPublicacion.toISOString();
    console.log(this.libro);
    
    this.procesoService.guardarLibro(this.libro).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Información', detail: 'Registro guardado exitosamente.' });
      this.llenarLibros();
      this.limpar();
    });
  }


  onRowSelectLibro(event: any) {
    this.limpar();

    this.docentes = event.data.docentes;
    this.libro = event.data
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
    this.libro = {};
    this.limpar();
  }

  limpar() {
    this.docentes = [];
    this.libro = {};
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
