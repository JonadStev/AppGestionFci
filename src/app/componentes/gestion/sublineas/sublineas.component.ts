import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { LineaDto } from 'src/app/modelos/gestion/linea';
import { SubLineaDto, SubLineaTextDto } from 'src/app/modelos/gestion/subLinea';
import { GestionService } from 'src/app/services/gestion.service';

@Component({
  selector: 'app-sublineas',
  templateUrl: './sublineas.component.html',
  styleUrls: ['./sublineas.component.scss']
})
export class SublineasComponent implements OnInit {

  estados: any[] = [{ id: 1, nombreEstado: 'ACTIVO' }, { id: 2, nombreEstado: 'INACTIVO' }];
  selectedEstado?: string = '';
  selectedLinea?: string = '';

  lineas: LineaDto[] = [];
  lineasAll: LineaDto[] = [];

  sublineas: SubLineaDto[] = [];
  sublineasText: SubLineaTextDto[] = [];

  sublinea: SubLineaDto = {};

  txtNombre?: string;

  constructor(private messageService: MessageService, private gestionService: GestionService) { }

  ngOnInit(): void {
    this.llenarLineas();
    this.llenarSublineas();
  }

  llenarLineas() {
    this.gestionService.getLineas().subscribe(data => {
      //llenamos un array para tener todas las lineas y otro solo con los estados activos
      this.lineasAll = data;
      for (const d of (data as any)) {
        if (d.estado === 'ACTIVO') {
          this.lineas.push({
            id: d.id,
            nombre: d.nombre,
            estado: d.estado
          });
        }
      }
    });
  }

  llenarSublineas() {
    this.gestionService.getSubLineas().subscribe(data => {
      //seteamos siempre sublineasText para evitar duplicidad.
      this.sublineasText = [];
      // buscamos en el array de las lineas completas, el id de la linea que se encuentra en la subliena para extraer el nombre de la linea
      for (const d of (data as any)) {
        let lineaNombre = '';
        for (const l of (this.lineasAll as any)) {
          if (l.id == d.linea) {
            lineaNombre = l.nombre;
          }
        }
        // Asigamos al nuevo array, las sublineas con la descripcion de las lineas de investigacion.
        this.sublineasText.push({
          id: d.id,
          nombre: d.nombre,
          estado: d.estado,
          linea: lineaNombre
        });
      }
    });
  }

  guardarsubLinea() {
    if (!this.validarCampos()) {
      this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'Los campos son obligatorios.' });
      return;
    }

    this.sublinea.nombre = this.txtNombre?.toUpperCase();
    this.sublinea.estado = this.selectedEstado?.toUpperCase();
    let lineaId = null;
    //buscamos por medio del nombre en el array de lienas completas, para obtener el id de la linea.
    for (const l of (this.lineasAll as any)) {
      if (l.nombre == this.selectedLinea) {
        lineaId = l.id;
      }
    }
    this.sublinea.linea = lineaId;

    //Buscamos si existe el nombre de la sublinea en el array de las sublineas registradas.
    let sublineaExits = this.sublineasText.map(x => {
      if (x.nombre == this.sublinea.nombre) {
        return x.nombre;
      }
    });

    // solo si se trata de una creacion, se valida que el nombre de la sublinea no pertenezca a un registro ya exitente.
    if (this.sublinea.id == null) {
      if (sublineaExits.includes(this.sublinea.nombre)) {
        this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'El registro ya existe.' });
        return;
      }
    }

    // Guardamos la linea.
    this.gestionService.guardarSubLinea(this.sublinea).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Información', detail: 'Registro guardado exitosamente.' });
      this.llenarSublineas();
      this.limpar();
    });

  }


  onRowSelectSublinea(event: any) {
    this.sublinea = event.data
    this.selectedEstado = event.data.estado;
    this.txtNombre = this.sublinea.nombre;
    this.selectedLinea = event.data.linea;

  }

  onRowUnselectSublinea(event: any) {
    this.limpar();
  }

  limpar() {
    this.sublinea = {};
    this.selectedEstado = '';
    this.txtNombre = '';
    this.selectedLinea = '';
  }

  validarCampos(): boolean {
    if (
      this.txtNombre === '' || this.txtNombre === null || this.txtNombre === undefined ||
      this.selectedEstado === '' || this.selectedEstado === null || this.selectedEstado === undefined ||
      this.selectedLinea === '' || this.selectedLinea === null || this.selectedLinea === undefined
    ) {
      return false;
    }
    return true;
  }

}
