import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BloquesService } from 'src/app/services/bloques.service';
import { BloqueDto } from 'src/app/modelos/bloque';
import { CuentaService } from 'src/app/services/cuenta.service';
import { MessageService } from 'primeng/api';
import { CuentaDto } from 'src/app/modelos/cuenta';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [`
        :host ::ng-deep .p-password input {
            width: 18rem
        }
    `],
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  bloques: BloqueDto[] = [];
  selectedBloque?: string = '';

  estados: any[] = [{ id: 1, nombreEstado: 'ACTIVO' }, { id: 2, nombreEstado: 'INACTIVO' }, { id: 2, nombreEstado: 'BLOQUEADA' }];
  selectedEstadoCuenta?: string

  @ViewChild('myInputFile')
  myInputFile: ElementRef;

  formData = new FormData();
  isCarga: boolean = false;

  cuentas: CuentaDto[] = [];

  cuenta: CuentaDto = {};

  isDisabled: boolean = true;

  constructor(private bloqueService: BloquesService, private cuentaService: CuentaService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.llenarBloques();
  }

  llenarBloques() {
    this.bloqueService.getBloques().subscribe(data => {
      this.bloques = data.filter(x => {
        return x.estado === 'ACTIVO';
      });
    });
  }

  cargarDatosCsv() {
    if (
      this.selectedBloque === '' || this.selectedBloque === null || this.selectedBloque === undefined || !this.isCarga
    ) {
      this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Información', detail: 'Debe seleccionar el bloque y seleccionar el archivo que desea cargar.' });
      return;
    }
    this.formData.append("bloque", JSON.stringify(this.selectedBloque));
    this.cuentaService.cargarCuentas(this.formData).subscribe(data => {
      console.log(data);
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Éxito', detail: data.message });
      this.myInputFile.nativeElement.value = '';
      this.formData = new FormData();
      this.llenarTablaBloque();
    });

  }

  guardarCuenta() {
    if (!this.validarCampos()) {
      this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Información', detail: 'Debe llenar todos los datos de la cuenta.' });
      return;
    }
    this.messageService.clear();
    this.cuenta.estado = this.selectedEstadoCuenta;
    this.cuentaService.guardarCuenta(this.cuenta).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Éxito', detail: 'Los datos de la cuenta han sido guardados correctamente.' });
      this.llenarTablaBloque();
      this.limpiarFormulario();
    });
  }

  llenarTablaBloque() {
    this.cuentaService.getCuentasByBloque(this.selectedBloque as string).subscribe(data => {
      this.cuentas = data;
    });
  }

  onFileSelected(event: any) {
    this.formData.delete("fichero");
    const file: File = event.target.files[0];
    this.formData.append("fichero", file);
    this.isCarga = true;
  }

  onRowSelectCuenta(event: any) {
    this.isDisabled = false;
    this.cuenta = event.data;
    this.selectedEstadoCuenta = event.data.estado;
    //console.log(event.data);
  }

  onRowUnselectCuenta(event: any) {
    this.isDisabled = true;
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.cuenta = {};
    this.selectedEstadoCuenta = '';
  }

  validarCampos(): boolean {
    // this.cuenta.estado = this.selectedEstadoCuenta;
    if (
      this.cuenta.correo === '' || this.cuenta.correo === null || this.cuenta.correo === undefined ||
      this.cuenta.fecha === '' || this.cuenta.fecha === null || this.cuenta.fecha === undefined ||
      this.cuenta.ipChip === '' || this.cuenta.ipChip === null || this.cuenta.ipChip === undefined ||
      this.cuenta.modelo === '' || this.cuenta.modelo === null || this.cuenta.modelo === undefined ||
      this.cuenta.operadora === '' || this.cuenta.operadora === null || this.cuenta.operadora === undefined ||
      this.cuenta.password === '' || this.cuenta.password === null || this.cuenta.password === undefined ||
      this.cuenta.responsable === '' || this.cuenta.responsable === null || this.cuenta.responsable === undefined ||
      this.cuenta.telefono === '' || this.cuenta.telefono === null || this.cuenta.telefono === undefined ||
      this.selectedEstadoCuenta === '' || this.selectedEstadoCuenta === null || this.selectedEstadoCuenta === undefined
    ) {
      return false;
    }
    return true;
  }


}
