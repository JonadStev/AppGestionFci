import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { UnescoDto } from 'src/app/modelos/gestion/unesco';
import { GestionService } from 'src/app/services/gestion.service';

@Component({
  selector: 'app-unesco',
  templateUrl: './unesco.component.html',
  styleUrls: ['./unesco.component.scss']
})
export class UnescoComponent implements OnInit {

  estados: any[] = [{ id: 1, nombreEstado: 'ACTIVO' }, { id: 2, nombreEstado: 'INACTIVO' }];
  selectedEstado?: string = '';

  listUnesco: UnescoDto[] = [];

  unesco: UnescoDto = {};

  txtNombre?: string;
  txtCodigo?: string;

  constructor(private messageService: MessageService, private gestionService: GestionService) { }

  ngOnInit(): void {
    this.llenarUnesco();
  }


  llenarUnesco() {
    this.gestionService.getUnescos().subscribe(data => {
      this.listUnesco = data;
    });
  }

  guardarUnesco() {
    if (!this.validarCampos()) {
      this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'Los campos son obligatorios.' });
      return;
    }
    this.unesco.codigo = this.txtCodigo;
    this.unesco.nombre = this.txtNombre;
    this.unesco.estado = this.selectedEstado?.toUpperCase();

    let unescoCodigoExits = this.listUnesco.map(x => {
      if (x.codigo == this.unesco.codigo) {
        return x.codigo;
      }
    });

    if (this.unesco.id == null) {
      if (unescoCodigoExits.includes(this.unesco.codigo)) {
        this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'El codigo unesco ya existe.' });
        return;
      }
    }

    this.gestionService.guardarUnesco(this.unesco).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Información', detail: 'Registro guardado exitosamente.' });
      this.llenarUnesco();
      this.limpar();
    });
  }


  onRowSelectUnesco(event: any) {
    this.unesco = event.data
    this.selectedEstado = event.data.estado;
    this.txtNombre = this.unesco.nombre;
    this.txtCodigo = this.unesco.codigo;
  }

  onRowUnselectUnesco(event: any) {
    this.limpar();
  }

  limpar() {
    this.unesco = {};
    this.selectedEstado = '';
    this.txtNombre = '';
    this.txtCodigo = '';
  }

  validarCampos(): boolean {
    if (
      this.txtNombre === '' || this.txtNombre === null || this.txtNombre === undefined ||
      this.txtCodigo === '' || this.txtCodigo === null || this.txtCodigo === undefined ||
      this.selectedEstado === '' || this.selectedEstado === null || this.selectedEstado === undefined
    ) {
      return false;
    }
    return true;
  }

}
