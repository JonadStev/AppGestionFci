import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { EstadoDto } from 'src/app/modelos/gestion/estado';
import { GestionService } from 'src/app/services/gestion.service';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.scss']
})
export class EstadosComponent implements OnInit {

  estados: any[] = [{ id: 1, nombreEstado: 'ACTIVO' }, { id: 2, nombreEstado: 'INACTIVO' }];
  selectedEstado?: string = '';

  listEstados: EstadoDto[] = [];
  estado: EstadoDto = {};

  txtNombre?: string;

  constructor(private messageService: MessageService, private gestionService: GestionService) { }

  ngOnInit(): void {
    this.llenarEstados();
  }


  llenarEstados() {
    this.gestionService.getEstados().subscribe(data => {
      this.listEstados = data;
    });
  }

  guardarEstado() {
    if (!this.validarCampos()) {
      this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'Los campos son obligatorios.' });
      return;
    }
    this.estado.nombre = this.txtNombre?.toUpperCase();
    this.estado.estado = this.selectedEstado?.toUpperCase();

    let estadosExits = this.listEstados.map(x => {
      if (x.nombre == this.estado.nombre) {
        return x.nombre;
      }
    });

    if (this.estado.id == null) {
      console.log('Validamos nuevo estado');
      if (estadosExits.includes(this.estado.nombre)) {
        this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'El registro ya existe.' });
        return;
      }
    }

    this.gestionService.guardarEstado(this.estado).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Información', detail: 'Registro guardado exitosamente.' });
      this.llenarEstados();
      this.limpar();
    });
  }


  onRowSelectEstado(event: any) {
    this.estado = event.data
    this.selectedEstado = event.data.estado;
    this.txtNombre = this.estado.nombre;
  }

  onRowUnselectEstado(event: any) {
    this.limpar();
  }

  limpar() {
    this.estado = {};
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
