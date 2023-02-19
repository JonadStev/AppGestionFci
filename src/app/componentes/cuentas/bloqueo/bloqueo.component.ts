import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { BloqueoDto } from 'src/app/modelos/bloqueos';
import { CuentaDto } from 'src/app/modelos/cuenta';
import { BloqueoService } from 'src/app/services/bloqueo.service';
import { BloquesService } from 'src/app/services/bloques.service';

@Component({
  selector: 'app-bloqueo',
  templateUrl: './bloqueo.component.html',
  styleUrls: ['./bloqueo.component.scss']
})
export class BloqueoComponent implements OnInit {

  selectedBloque?: number;
  selectedCuenta?: string;

  bloqueos: BloqueoDto[] = [];
  bloqueo: BloqueoDto = {};

  bloques: BloqueDto[] = [];
  bloque: BloqueDto = {};

  cuentas?: CuentaDto[] = [];
  cuenta?: CuentaDto = {};

  estados: any[] = [{ id: 1, nombreEstado: 'BLOQUEADA' }];
  selectedEstadoCuenta?: string

  fecha: Date = new Date;
  motivoBloqueo: string;
  diasBloqueo: number;

  idBloqueo: number = 0;

  constructor(private bloqueService: BloquesService, private bloqueoService: BloqueoService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.llenarBloques();
    this.llenarBloqueos();
  }

  llenarBloques() {
    this.bloqueService.getBloques().subscribe(data => {
      this.bloques = data.filter(x => {
        return x.estado === 'ACTIVO';
      });
    });
  }

  llenarBloqueos() {
    this.bloqueoService.getBloqueos().subscribe(data => {
      this.bloqueos = data;
    });
  }

  llenarCuentas() {
    this.limpiar();
    this.bloque = this.bloques.map(x => x).filter(b => b.id === this.selectedBloque).reduce(x => x);
    this.cuentas = this.bloque.cuentas?.filter(c => c.estado === 'ACTIVO');
  }

  seleccionarCuenta() {
    this.cuenta = this.cuentas?.filter(x => x.id === this.selectedCuenta).reduce(x => x);
  }

  bloquearCuenta() {
    //Validaciones
    this.bloqueo.usuario = this.cuenta?.correo;
    this.bloqueo.estadoR1 = this.cuenta?.estado;
    this.bloqueo.fechaPrimeraRevision = this.cuenta?.fecha
    this.bloqueo.estadoR2 = this.selectedEstadoCuenta;
    this.bloqueo.fechaSegundaRevision = this.fecha.toLocaleDateString();
    this.bloqueo.motivo = this.motivoBloqueo;
    this.bloqueo.dias = this.diasBloqueo;
    this.bloqueo.bloque = this.selectedBloque;
    this.bloqueo.cuenta = this.cuenta?.id;

    if (
      this.bloqueo.usuario === '' || this.bloqueo.usuario === null || this.bloqueo.usuario === undefined ||
      this.bloqueo.estadoR1 === '' || this.bloqueo.estadoR1 === null || this.bloqueo.estadoR1 === undefined ||
      this.bloqueo.fechaPrimeraRevision === '' || this.bloqueo.fechaPrimeraRevision === null || this.bloqueo.fechaPrimeraRevision === undefined ||
      this.selectedEstadoCuenta === '' || this.selectedEstadoCuenta === null || this.selectedEstadoCuenta === undefined ||
      this.bloqueo.fechaSegundaRevision === '' || this.bloqueo.fechaSegundaRevision === null || this.bloqueo.fechaSegundaRevision === undefined ||
      this.bloqueo.motivo === '' || this.bloqueo.motivo === null || this.bloqueo.motivo === undefined ||
      this.bloqueo.dias === 0 || this.bloqueo.dias === null || this.bloqueo.dias === undefined
    ) {
      this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Información', detail: 'Debe llenar todos los campos del formulario.' });
      return;
    }

    console.log(this.bloqueo);

    this.bloqueoService.guadarBloqueo(this.bloqueo).subscribe(data => {
      console.log(data);
      this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Información', detail: 'La cuenta ha sido bloqueada.' });
      this.limpiar();
      this.selectedBloque = 0;
      this.selectedCuenta = '';
      this.llenarBloques();
      this.llenarBloqueos();
    });

  }

  limpiar() {
    this.cuenta = {};
    this.motivoBloqueo = '';
    this.diasBloqueo = 0;
    this.selectedEstadoCuenta = '';
    this.fecha = new Date;
  }

  eliminarBloqueo() {
    if (this.idBloqueo === 0) {
      this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Información', detail: 'Debe seleccionar un registro del listado de bloqueos.' });
      return;
    }
    this.bloqueoService.deleteBloqueos(this.idBloqueo).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Información', detail: data.message });
      this.llenarBloqueos();
      this.llenarBloques();
      this.selectedBloque = 0;
      this.selectedCuenta = '';
    });
  }

  onRowSelectBloqueo(event: any) {
    this.idBloqueo = event.data.id;
    console.log(event);
  }

  onRowUnselectBloqueo(event: any) {
    this.idBloqueo = 0;
  }

}
