import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { LineaDto } from 'src/app/modelos/gestion/linea';
import { SubLineaDto } from 'src/app/modelos/gestion/subLinea';
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

  constructor(private messageService: MessageService, private procesoService: ProcesosService, private gestionService: GestionService) { }

  ngOnInit(): void {
    this.llenarLibros();
    this.llenarLineas();
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


  onRowSelectLibro(event: any) {
    this.limpar();

    this.docentes = event.data.docentes;
    this.libro = event.data
    this.selectedLinea = event.data.linea
    this.llenarSublinea();
    this.selectedSublinea = event.data.sublinea;
  }

  onRowUnselectLibro(event: any) {
    this.docentes = [];
    this.libro = {};
    this.limpar();
  }

  limpar() {
    this.docentes = [];
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

}
