import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { LineaDto } from 'src/app/modelos/gestion/linea';
import { SubLineaDto } from 'src/app/modelos/gestion/subLinea';
import { UsuarioDocenteDto } from 'src/app/modelos/gestion/usuarioDocente';
import { ArticuloDto } from 'src/app/modelos/procesos/articulo';
import { GestionService } from 'src/app/services/gestion.service';
import { ProcesosService } from 'src/app/services/procesos.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent implements OnInit {


  articulos: ArticuloDto[] = [];
  articulo: ArticuloDto = {};

  docentes: UsuarioDocenteDto[] = [];

  lineas: LineaDto[] = [];
  selectedLinea?: string = '';

  sublineas: SubLineaDto[] = [];
  selectedSublinea?: string = '';

  constructor(private messageService: MessageService, private procesoService: ProcesosService, private gestionService: GestionService) { }

  ngOnInit(): void {
    this.llenarArticulos();
    this.llenarLineas();
  }

  llenarArticulos() {
    this.procesoService.getArticulos().subscribe(data => {
      this.articulos = data;
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


  onRowSelectArticulo(event: any) {
    this.limpar();

    this.docentes = event.data.docentes;
    this.articulo = event.data
    this.selectedLinea = event.data.linea
    this.llenarSublinea();
    this.selectedSublinea = event.data.sublinea;

  }

  onRowUnselectArticulo(event: any) {
    this.docentes = [];
    this.articulo = {};
    this.limpar();
  }

  limpar() {
    this.docentes = [];
    this.articulo = {};
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
