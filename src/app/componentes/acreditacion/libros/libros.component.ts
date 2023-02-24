import { Component, OnInit } from '@angular/core';
import { BloqueDto } from 'src/app/modelos/bloque';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss']
})
export class LibrosComponent implements OnInit {

  estados: any[] = [{ id: 1, nombreEstado: 'ACTIVO' }, { id: 2, nombreEstado: 'INACTIVO' }];
  selectedEstado?: string = '';

  bloques: BloqueDto[] = [];

  bloque: BloqueDto = {};

  txtNombre?: string;

  constructor() { }

  ngOnInit(): void {
  }


  llenarBloque() {

  }

  guardarEstado() {

  }


  onRowSelectBloque(event: any) {
    this.bloque = event.data
    this.selectedEstado = event.data.estado;
    this.txtNombre = this.bloque.nombre;
  }

  onRowUnselectBloque(event: any) {
    this.limpar();
  }

  limpar() {
    this.bloque = {};
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
