import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { CarreraDto } from 'src/app/modelos/gestion/carrera';
import { UsuarioDocenteDto } from 'src/app/modelos/gestion/usuarioDocente';
import { GestionService } from 'src/app/services/gestion.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.scss']
})
export class DocenteComponent implements OnInit {

  estados: any[] = [{ id: 1, nombreEstado: 'ACTIVO' }, { id: 2, nombreEstado: 'INACTIVO' }];
  selectedEstado?: string = '';

  //roles: any[] = [{ id: 1, nombre: "admin" }, { id: 2, nombre: "user" }, { id: 2, nombre: "delivery" }];
  roles: any[] = [{ id: 'gestor', nombre: "GESTOR" }, { id: 'director', nombre: "DIRECTOR" }, { id: 'investigador', nombre: "INVESTIGADOR" }, { id: 'secretario', nombre: "SECRETARIO" }];
  selectedRol?: string;

  usuarioDocente: UsuarioDocenteDto = {};

  listCarreraAll: CarreraDto[] = [];
  listCarrera: CarreraDto[] = [];
  selectedCarrera?: string;

  listUsuarios: UsuarioDocenteDto[] = [];

  constructor(private messageService: MessageService, private gestionService: GestionService) { }

  ngOnInit(): void {
    this.llenarUsuarios();
  }


  llenarUsuarios() {
    this.gestionService.getUsuarios().subscribe(data => {
      this.listUsuarios = data;
    });
    this.gestionService.getCarreras().subscribe(data => {
      //this.listCarreraAll = data;
      this.listCarrera = [];
      for (const d of (data as any)) {
        if (d.estado === 'ACTIVO') {
          this.listCarrera.push({
            id: d.id,
            nombre: d.nombre,
            estado: d.estado
          });
        }
      }
    });
  }

  guardarUsuario() {
    if (!this.validarCampos()) {
      this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'Los campos son obligatorios.' });
      return;
    }
    if (this.usuarioDocente.id == null) {
      //Solo si se trata de un uevo usuario establecemos la contrasenia como la cedula
      this.usuarioDocente.password = this.usuarioDocente.cedula;
    }
    this.usuarioDocente.estado = this.selectedEstado;
    let roles: any = [];
    if (this.selectedRol === 'GESTOR') {
      roles.push({ id: 1, rolNombre: 'ROLE_GESTOR' }, { id: 2, rolNombre: 'ROLE_DIRECTOR' }, { id: 3, rolNombre: 'ROLE_INVESTIGADOR' }, { id: 4, rolNombre: 'ROLE_SECRETARIO' });
    } else if (this.selectedRol === 'DIRECTOR') {
      roles.push({ id: 2, rolNombre: 'ROLE_DIRECTOR' });
    } else if (this.selectedRol === 'INVESTIGADOR') {
      roles.push({ id: 3, rolNombre: 'ROLE_INVESTIGADOR' });
    } else {
      roles.push({ id: 4, rolNombre: 'ROLE_SECRETARIO' });
    }
    this.usuarioDocente.roles = roles;

    //buscar la carrera
    for (const d of (this.listCarrera as any)) {
      if (d.nombre === this.selectedCarrera) {
        this.usuarioDocente.carrera = d.id;
      }
    }
    //Guardamos el usuario
    this.gestionService.guardarUsuario(this.usuarioDocente).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Información', detail: 'Registro guardado exitosamente.' });
      this.llenarUsuarios();
      this.limpar();
    });

  }


  onRowSelectUsuario(event: any) {
    this.usuarioDocente = event.data
    this.selectedEstado = event.data.estado;
    if (this.usuarioDocente.roles?.length === 3) {
      this.selectedRol = 'GESTOR';
    } else {
      for (const d of (this.usuarioDocente.roles as any)) {
        if (d.rolNombre === "ROLE_DIRECTOR") {
          this.selectedRol = 'DIRECTOR';
        } else if (d.rolNombre === "ROLE_INVESTIGADOR") {
          this.selectedRol = 'INVESTIGADOR';
        } else {
          this.selectedRol = 'SECRETARIO';
        }
      }
    }
    //Buscar la carrera
    for (const d of (this.listCarrera as any)) {
      if (d.id === this.usuarioDocente.carrera) {
        this.selectedCarrera = d.nombre;
      }
    }


  }

  onRowUnselectUsuario(event: any) {
    this.limpar();
  }

  limpar() {
    this.usuarioDocente = {};
    this.selectedEstado = '';
    this.selectedRol = '';
    this.selectedCarrera = '';
  }

  validarCampos(): boolean {
    if (
      this.usuarioDocente.nombre === '' || this.usuarioDocente.nombre === null || this.usuarioDocente.nombre === undefined ||
      this.usuarioDocente.apellido === '' || this.usuarioDocente.apellido === null || this.usuarioDocente.apellido === undefined ||
      this.usuarioDocente.cedula === '' || this.usuarioDocente.cedula === null || this.usuarioDocente.cedula === undefined ||
      this.usuarioDocente.email === '' || this.usuarioDocente.email === null || this.usuarioDocente.email === undefined ||
      this.usuarioDocente.telefono === '' || this.usuarioDocente.telefono === null || this.usuarioDocente.telefono === undefined ||
      this.selectedEstado === '' || this.selectedEstado === null || this.selectedEstado === undefined ||
      this.selectedCarrera === '' || this.selectedCarrera === null || this.selectedCarrera === undefined ||
      this.selectedRol === '' || this.selectedRol === null || this.selectedRol === undefined
    ) {
      return false;
    }
    return true;
  }

}
