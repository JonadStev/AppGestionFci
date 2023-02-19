import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { UsuarioDocenteDto } from 'src/app/modelos/gestion/usuarioDocente';
import { GestionService } from 'src/app/services/gestion.service';

@Component({
  selector: 'app-matriz-proyecto-fci',
  templateUrl: './matriz-proyecto-fci.component.html',
  styleUrls: ['./matriz-proyecto-fci.component.scss']
})
export class MatrizProyectoFciComponent implements OnInit {

  estados: any[] = [{ id: 1, nombreEstado: 'ACTIVO' }, { id: 2, nombreEstado: 'INACTIVO' }];
  selectedEstado?: string = '';

  bloques: BloqueDto[] = [];

  bloque: BloqueDto = {};

  txtNombre?: string;

  directores: UsuarioDocenteDto[] = [];
  investigadores: UsuarioDocenteDto[] = [];
  selectedDirector: UsuarioDocenteDto = {};
  selectedInvestigadores: UsuarioDocenteDto[] = [];


  constructor(private messageService: MessageService, private gestionService: GestionService) { }

  ngOnInit(): void {
    this.llenarDirectoresEInvestigadores();
  }


  llenarDirectoresEInvestigadores() {
    this.gestionService.getDirectores().subscribe(data => {
      this.directores = data;
    });
    this.gestionService.getInvestigadores().subscribe(data => {
      this.investigadores = data;
    });
  }

  seleccionDirector(event: any) {
    console.log(this.selectedDirector);
    //console.log(event);
  }

  seleccionInvestigadores(event: any) {
    console.log(this.selectedInvestigadores);
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

