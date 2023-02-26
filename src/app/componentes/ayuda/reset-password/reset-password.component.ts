import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { LoginUsuario } from 'src/app/modelos/login';
import { GestionService } from 'src/app/services/gestion.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  txtNombreUsuario?: string;
  txtNewPassword?: string;

  loginUsuario: LoginUsuario = {};

  constructor(private messageService: MessageService, private gestionService: GestionService) { }

  ngOnInit(): void {
  }


  llenarBloque() {

  }

  cambiarContrasenia() {
    if (!this.validarCampos()) {
      this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Alerta', detail: 'Los campos son obligatorios.' });
      return;
    }
    this.loginUsuario.nombreUsuario = this.txtNombreUsuario;
    this.loginUsuario.password = this.txtNewPassword;
    this.gestionService.resetearContrasenia(this.loginUsuario).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Información', detail: 'Se ha reestablecido su contraseña.' });
      this.limpar();
    });
  }

  limpar() {
    this.txtNombreUsuario = '';
    this.txtNewPassword = '';
  }

  validarCampos(): boolean {
    if (
      this.txtNombreUsuario === '' || this.txtNombreUsuario === null || this.txtNombreUsuario === undefined ||
      this.txtNewPassword === '' || this.txtNewPassword === null || this.txtNewPassword === undefined
    ) {
      return false;
    }
    return true;
  }

}
