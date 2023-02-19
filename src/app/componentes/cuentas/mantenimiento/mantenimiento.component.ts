import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { MantenimientoDto } from 'src/app/modelos/mantenimiento';
import { BloquesService } from 'src/app/services/bloques.service';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.scss']
})
export class MantenimientoComponent implements OnInit {

  bloques: BloqueDto[] = [];
  selectedBloque: string = '';

  fechaIni: Date = new Date;
  fechaFin: Date = new Date;

  fechaFinTimer: Date;

  txtDescripcion: string = '';
  txtTiempo: string = '';
  txtResponsable: string = '';
  idDelete: boolean = false;
  timer: number = 0;
  newTimer: number = 0;

  mantenimiento: MantenimientoDto = {};
  mantenimientos: MantenimientoDto[] = [];

  idEliminar: string = '';

  constructor(private tokenService: TokenService, private bloqueService: BloquesService, private messageService: MessageService, private mantenimientoService: MantenimientoService) { }

  ngOnInit(): void {
    if (this.tokenService.isLogger()) {
      if (this.tokenService.getUserName() != "user") {
        this.txtResponsable = this.tokenService.getUserName() as string;
      }
    }
    this.llenarBloques();
    this.llenarMantenimientos();
  }

  llenarBloques() {
    this.bloqueService.getBloques().subscribe(data => {
      this.bloques = data.filter(x => {
        return x.estado === 'ACTIVO';
      });
    });
  }

  llenarMantenimientos() {
    this.mantenimientoService.getMantenimientos().subscribe(data => {
      this.mantenimientos = data;
    });
  }

  onRowSelectMan(event: any) {
    this.idEliminar = event.data.id;
    this.idDelete = true;
    console.log(event);
  }

  onRowUnselectMan(event: any) {
    this.idEliminar = '';
    this.idDelete = false;
    console.log(event);
  }

  guardarMantenimiento() {
    var timer = 0;
    var newTimer = 0;
    var minutos = 0;
    var segundos = 0;
    this.fechaFinTimer = new Date;
    if (!this.validarCampos()) {
      this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Información', detail: 'Debe llenar todos los datos del formulario.' });
      return;
    }
    timer = this.fechaFinTimer.getTime() - this.fechaIni.getTime();
    newTimer = timer / 1000;
    segundos = +newTimer.toPrecision(2);
    minutos = newTimer / 60;
    if (minutos < 1) {
      this.txtTiempo = segundos + ' segundos';
      console.log(this.txtTiempo);
    } else {
      var texto = ' minuto';
      if (+minutos.toPrecision(1) > 1)
        texto = ' minutos';
      this.txtTiempo = minutos.toPrecision(1) + texto;
      console.log(this.txtTiempo);
    }

    this.mantenimiento.bloque = +this.selectedBloque;
    this.mantenimiento.fechaInicio = this.fechaIni.toLocaleDateString();
    this.mantenimiento.fechaFin = this.fechaFin.toLocaleDateString();
    this.mantenimiento.descripcion = this.txtDescripcion
    this.mantenimiento.tiempo = this.txtTiempo
    this.mantenimiento.responsable = this.txtResponsable;

    this.mantenimientoService.saveMantenimiento(this.mantenimiento).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Éxito', detail: 'El mantenimiento ha sido registrado.' });
      this.llenarMantenimientos();
      this.limpiar();
    });


  }

  eliminarMantenimiento() {
    if (!this.idDelete) {
      this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Información', detail: 'Debe seleccionar un mantenimiento para eliminarlo.' });
      return;
    }
    this.mantenimientoService.deleteMantenimiento(this.idEliminar).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Información', detail: data.message });
      this.llenarMantenimientos();
    });
  }

  validarCampos(): boolean {
    if (
      this.txtDescripcion === '' || this.txtDescripcion === null || this.txtDescripcion === undefined ||
      this.txtResponsable === '' || this.txtResponsable === null || this.txtResponsable === undefined ||
      this.selectedBloque === '' || this.selectedBloque === null || this.selectedBloque === undefined
    ) {
      return false;
    }
    return true;
  }

  limpiar() {
    this.txtDescripcion = '';
    this.txtTiempo = '';
    this.selectedBloque = '';
  }

}

