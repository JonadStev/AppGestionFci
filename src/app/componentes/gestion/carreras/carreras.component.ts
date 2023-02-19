import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { CarreraDto } from 'src/app/modelos/gestion/carrera';
import { GestionService } from 'src/app/services/gestion.service';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.scss']
})
export class CarrerasComponent implements OnInit {

  estados: any[] = [{ id: 1, nombreEstado: 'ACTIVO' }, { id: 2, nombreEstado: 'INACTIVO' }];
  selectedEstado?: string = '';

  listCarrera: CarreraDto[] = [];

  carrera: CarreraDto = {};

  txtNombre?: string;

  constructor(private messageService: MessageService, private gestionService: GestionService) { }

  ngOnInit(): void {
    this.llenarCarreras();
  }


  llenarCarreras() {
    this.gestionService.getCarreras().subscribe(data => {
      this.listCarrera = data;
    });
  }

  guardarCarrera() {
    if (!this.validarCampos()) {
      this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'Los campos son obligatorios.' });
      return;
    }
    this.carrera.nombre = this.txtNombre?.toUpperCase();
    this.carrera.estado = this.selectedEstado?.toUpperCase();

    let carreraExits = this.listCarrera.map(x => {
      if (x.nombre == this.carrera.nombre) {
        return x.nombre;
      }
    });

    if (this.carrera.id == null) {
      if (carreraExits.includes(this.carrera.nombre)) {
        this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'El registro ya existe.' });
        return;
      }
    }

    this.gestionService.guardarCarrera(this.carrera).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Información', detail: 'Registro guardado exitosamente.' });
      this.llenarCarreras();
      this.limpar();
    });
  }


  onRowSelectCarrera(event: any) {
    this.carrera = event.data
    this.selectedEstado = event.data.estado;
    this.txtNombre = this.carrera.nombre;
  }

  onRowUnselectCarrera(event: any) {
    this.limpar();
  }

  limpar() {
    this.carrera = {};
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
