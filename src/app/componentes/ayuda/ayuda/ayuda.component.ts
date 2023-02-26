import { Component, OnInit } from '@angular/core';

interface OpcionesAyuda {
  label: string;
  descripcion: string;
}

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss']
})

export class AyudaComponent implements OnInit {

  opcionesAyuda: OpcionesAyuda[] = [];

  // Opción seleccionada
  opcionSeleccionada: any;

  constructor() {
    // Opciones de ayuda
    this.opcionesAyuda = [
      { label: 'Gestión', descripcion: 'Para crear nuevos usuarios, realizar el mantenimiento de Estados, Productos, Unesco, Carreas, Lineas de investigacion, Sublineas de investigacion, dirígete al menú en la opción "Gestión".' },
      { label: 'Procesos', descripcion: 'Para crear proyectos FCI, realizar el mantenimiento, registar horas de docentes, y cargar información de acreditación, dirígete al menú en la opción "Procesos"' },
      { label: 'Reportes', descripcion: 'Para generar reportes de los procesos FCI e información de acreditacion, dirígete al menú en la opción "Reportes". Aquí encontrarás los reportes del ssitemas que podrás generar y exportar.' },
      { label: 'Cambiar contraseña', descripcion: 'Para cambiar la contraseña en el sistema, deberás digirte a la opcion "Ayuda" donde encontrarás la opción de modificar tu contraseña por medio de tu usuario registrado en el sistema.' }
    ];
  }

  ngOnInit(): void {
  }



}
