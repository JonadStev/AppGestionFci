import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { LineaDto } from 'src/app/modelos/gestion/linea';
import { SubLineaDto } from 'src/app/modelos/gestion/subLinea';
import { UnescoDto } from 'src/app/modelos/gestion/unesco';
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

  unescos: UnescoDto [] = [];
  selectedUnesco: string = '';

  fechaPublicacion: Date;
  campoDetalladoId: number;

  constructor(private messageService: MessageService, private procesoService: ProcesosService, private gestionService: GestionService) { }

  ngOnInit(): void {
    this.llenarArticulos();
    this.llenarLineas();
    this.llenarUnesco();
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
    
    this.articulo.linea = this.selectedLinea;
    this.articulo.sublinea = this.selectedSublinea;

    for (const d of (this.unescos as any)) {
      if (d.nombre === this.selectedUnesco) {
        this.campoDetalladoId = d.codigo;
      }
    }
    this.articulo.campoDetallado = Number(this.campoDetalladoId);
    this.articulo.fechaPublicacion = this.fechaPublicacion.toISOString();
    console.log(this.articulo);
    
    this.procesoService.guardarArticulo(this.articulo).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Información', detail: 'Registro guardado exitosamente.' });
      this.llenarArticulos();
      this.limpar();
    });
  }


  onRowSelectArticulo(event: any) {
    this.limpar();

    this.docentes = event.data.docentes;
    this.articulo = event.data
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

  convertStringToDate(dateString: string) {
    const [day, month, year] = dateString.split('/');
    return new Date([month, day, year].join('/'));
  }

}
