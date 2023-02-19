import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UsuarioDto } from 'src/app/modelos/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [`
      :host ::ng-deep .p-password input {
          width: 18rem
      }
  `],
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  estados: any[] = [{ id: 1, nombreEstado: 'ACTIVO' }, { id: 2, nombreEstado: 'INACTIVO' }];
  roles: any[] = [{ id: 1, nombre: "supervisor" }, { id: 2, nombre: "mantenimiento" }, { id: 2, nombre: "produccion" }];

  selectedRol?: string;
  selectedEstadoUsuario?: string;

  usuarios: UsuarioDto[] = [];

  usuario: UsuarioDto = {};

  isEditUser: boolean = false;

  btnPasswordDisabled: boolean = false;

  constructor(private usuarioService: UsuarioService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.llenarTablaUsuarios();
  }

  llenarTablaUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  guardarUsuario() {
    this.messageService.clear();
    if (this.isEditUser) {
      this.editarUsuario();
      return;
    }
    this.usuario.estado = this.selectedEstadoUsuario;
    this.usuario.roles = [this.selectedRol as string];
    // validaciones

    if (!this.validarCampos()) {
      this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Información', detail: 'Debe ingresar todos los datos del formulario.' });
      return;
    }

    this.usuarioService.guardarUsuario(this.usuario).subscribe(data => {
      console.log(data);
      if (data.message === 'El correo electrónico ya existe.')
        this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Información', detail: data.message });
      else {
        this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Éxito', detail: 'Usuario guardado correctamente' });
        this.limpiar();
        this.llenarTablaUsuarios();
      }

    });
  }

  editarUsuario() {
    let roles: any = [];
    //Validaciones
    if (!this.validarCampos()) {
      this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Información', detail: 'Debe ingresar todos los datos del formulario.' });
      return;
    }
    if (this.selectedRol === 'supervisor') {
      roles.push({ id: 1, rolNombre: 'ROLE_SUPERVISOR' }, { id: 2, rolNombre: 'ROLE_MANTENIMIENTO' }, { id: 3, rolNombre: 'ROLE_PRODUCCION' });
    } else if (this.selectedRol === 'mantenimiento') {
      roles.push({ id: 2, rolNombre: 'ROLE_MANTENIMIENTO' });
    } else {
      roles.push({ id: 3, rolNombre: 'ROLE_PRODUCCION' });
    }
    this.usuario.estado = this.selectedEstadoUsuario;
    this.usuario.roles = roles;
    this.usuarioService.actualiarUsuario(this.usuario).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado correctamente' });
      this.llenarTablaUsuarios();
      this.limpiar();
    });
  }

  onRowSelectUser(event: any) {
    this.btnPasswordDisabled = true;
    this.usuario = event.data;
    this.selectedEstadoUsuario = event.data.estado;
    if (this.usuario.roles?.length === 3) {
      this.selectedRol = 'supervisor';
    } else {
      for (const d of (this.usuario.roles as any)) {
        if (d.rolNombre === 'ROLE_MANTENIMIENTO')
          this.selectedRol = 'mantenimiento';
        else
          this.selectedRol = 'produccion';
      }
    }
    this.isEditUser = true;
  }

  onRowUnselectUser(event: any) {
    this.btnPasswordDisabled = false;
    this.limpiar();
  }

  limpiar() {
    this.usuario = {};
    this.isEditUser = false;
    this.selectedEstadoUsuario = '';
    this.selectedRol = '';
  }

  validarCampos(): boolean {
    if (
      this.usuario.apellido === '' || this.usuario.apellido === null || this.usuario.apellido === undefined ||
      this.usuario.email === '' || this.usuario.email === null || this.usuario.email === undefined ||
      this.usuario.nombre === '' || this.usuario.nombre === null || this.usuario.nombre === undefined ||
      this.usuario.password === '' || this.usuario.password === null || this.usuario.password === undefined ||
      this.usuario.telefono === '' || this.usuario.telefono === null || this.usuario.telefono === undefined ||
      this.selectedRol === '' || this.selectedRol === null || this.selectedRol === undefined ||
      this.selectedEstadoUsuario === '' || this.selectedEstadoUsuario === null || this.selectedEstadoUsuario === undefined
    ) {
      return false;
    }
    return true;
  }

}
