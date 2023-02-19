import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { LineaDto } from 'src/app/modelos/gestion/linea';
import { GestionService } from 'src/app/services/gestion.service';

@Component({
  selector: 'app-lineas',
  templateUrl: './lineas.component.html',
  styleUrls: ['./lineas.component.scss']
})
export class LineasComponent implements OnInit {

  estados: any[] = [{ id: 1, nombreEstado: 'ACTIVO' }, { id: 2, nombreEstado: 'INACTIVO' }];
  selectedEstado?: string = '';

  listLineas: LineaDto[] = [];

  linea: LineaDto = {};

  txtNombre?: string;

  constructor(private messageService: MessageService, private gestionService: GestionService) { }

  ngOnInit(): void {
    this.llenarLineas();
  }


  llenarLineas() {
    this.gestionService.getLineas().subscribe(data => {
      this.listLineas = data;
    });
  }

  guardarLinea() {
    if (!this.validarCampos()) {
      this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'Los campos son obligatorios.' });
      return;
    }
    this.linea.nombre = this.txtNombre?.toUpperCase();
    this.linea.estado = this.selectedEstado?.toUpperCase();

    let lineaExits = this.listLineas.map(x => {
      if (x.nombre == this.linea.nombre) {
        return x.nombre;
      }
    });

    if (this.linea.id == null) {
      if (lineaExits.includes(this.linea.nombre)) {
        this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'El registro ya existe.' });
        return;
      }
    }

    this.gestionService.guardarLinea(this.linea).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Información', detail: 'Registro guardado exitosamente.' });
      this.llenarLineas();
      this.limpar();
    });
  }


  onRowSelectLinea(event: any) {
    this.linea = event.data
    this.selectedEstado = event.data.estado;
    this.txtNombre = this.linea.nombre;
  }

  onRowUnselectLinea(event: any) {
    this.limpar();
  }

  limpar() {
    this.linea = {};
    this.selectedEstado = '';
    this.txtNombre = '';
  }

  validarCampos(): boolean {
    if (
      this.txtNombre === '' || this.txtNombre === null || this.txtNombre === undefined ||
      this.selectedEstado === '' || this.selectedEstado === null || this.selectedEstado === undefined
    ) {
      return false;
    }
    return true;
  }

}
