import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoginUsuario } from 'src/app/modelos/login';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [`
        :host ::ng-deep .p-password input {
            width: 18rem
        }
    `],
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isLogged: boolean = false;
  usuarioLogeado?: string;
  displayLogin: boolean = false;

  username: string = '';
  password: string = '';

  loginUsuario: LoginUsuario = {};

  constructor(private messageService: MessageService, private authService: AuthService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogger();
    if (this.isLogged) {
      if (this.tokenService.getUserName() != "user") {
        this.usuarioLogeado = this.tokenService.getUserName() as string;
        console.log(this.usuarioLogeado);
      }
    }
  }

  onLogin() {
    if (
      this.username === '' || this.username === null || this.username === undefined ||
      this.password === '' || this.password === null || this.password === undefined
    ) {
      this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Información', detail: 'Debe ingresar las credenciales.' });
      return;
    }
    this.loginUsuario.nombreUsuario = this.username;
    this.loginUsuario.password = this.password;

    this.authService.login(this.loginUsuario).subscribe(
      data => {
        if (data.token as string === 'NO_VALIDO') {
          this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Error', detail: 'Su usuario no se encuentra activo.' });
        } else {
          this.tokenService.setToken(data.token as string);
          this.isLogged = true;
          this.displayLogin = false;
          this.usuarioLogeado = this.tokenService.getUserName() as string;
          window.location.replace('/');
        }
      },
      err => {
        this.messageService.add({ key: 'myKey1', severity: 'error', summary: 'Error', detail: 'Usuario y/o contraseña incorrecta.' });
      }
    );

  }

  logOut() {
    this.tokenService.logOut();
  }

}
