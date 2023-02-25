import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BloqueDto } from 'src/app/modelos/bloque';
import { UsuarioDocenteDto } from 'src/app/modelos/gestion/usuarioDocente';
import { DetalleHorasDto, HorasDto } from 'src/app/modelos/procesos/horas';
import { ProyectoDto } from 'src/app/modelos/procesos/proyecto';
import { GestionService } from 'src/app/services/gestion.service';
import { ProcesosService } from 'src/app/services/procesos.service';

@Component({
  selector: 'app-horas',
  templateUrl: './horas.component.html',
  styleUrls: ['./horas.component.scss']
})
export class HorasComponent implements OnInit {

  estados: any[] = [{ id: 1, nombreEstado: 'ACTIVO' }, { id: 2, nombreEstado: 'INACTIVO' }];
  selectedEstado?: string = '';

  bloques: BloqueDto[] = [];

  bloque: BloqueDto = {};

  txtNombre?: string;



  directores: UsuarioDocenteDto[] = [];
  selectedDirector: UsuarioDocenteDto = {};

  proyectos: ProyectoDto[] = [];
  selectedProyecto: ProyectoDto = {};

  investigadores: UsuarioDocenteDto[] = [];
  selectedInvestigador: UsuarioDocenteDto = {};
  selectedInvestigadores: UsuarioDocenteDto[] = [];

  listHoras: HorasDto[] = [];
  horas: HorasDto = {};
  detalleHoras: DetalleHorasDto = {};
  detallesHoras: DetalleHorasDto[] = [];

  constructor(private messageService: MessageService, private gestionService: GestionService, private procesoService: ProcesosService) { }

  ngOnInit(): void {
    this.llenarSelects();
    this.llenarHoras();
  }

  llenarSelects() {
    this.procesoService.getProyectos().subscribe(data => {
      this.proyectos = data;
    });
    this.gestionService.getDirectores().subscribe(data => {
      this.directores = data;
    });
    this.gestionService.getInvestigadores().subscribe(data => {
      this.investigadores = data;
    });
  }

  llenarHoras() {
    this.procesoService.gethoras().subscribe(data => {
      this.listHoras = data;
    });
  }


  llenarBloque() {

  }

  guardarHoras() {
    this.horas.proyecto = this.selectedProyecto;
    this.horas.proyecto.fechaInicio = this.convertStringToDate(this.horas.proyecto.fechaInicio as string).toISOString();
    this.horas.proyecto.fechaFin = this.convertStringToDate(this.horas.proyecto.fechaFin as string).toISOString();
    this.horas.director = this.selectedDirector;
    this.horas.detalle = this.detallesHoras;
    console.log(this.horas);
    this.procesoService.guardarHoras(this.horas).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Información', detail: 'Registro guardado exitosamente.' });
      this.llenarSelects();
      this.llenarHoras();
      this.limpiar();
      this.limparInvestigador();
    });

  }

  convertStringToDate(dateString: string) {
    const [day, month, year] = dateString.split('/');
    return new Date([month, day, year].join('/'));
  }

  seleccionarProyecto(event: any) {
    this.horas.nombreProyecto = this.selectedProyecto.nombre;
  }

  agregarInvestigador() {

    this.detalleHoras.investigador = this.selectedInvestigador;
    this.detallesHoras.push(this.detalleHoras);
    this.limparInvestigador();
  }


  onRowSelectInvestigador(event: any) {
    this.detalleHoras = event.data;
    this.selectedInvestigador = event.data.investigador;
  }

  onRowUnselectInvestigador(event: any) {
    this.limparInvestigador();
  }

  limparInvestigador() {

    this.selectedInvestigador = {};
    this.detalleHoras = {};

    //this.bloque = {};
    //this.selectedEstado = '';
    //this.txtNombre = '';
  }

  limpiar() {
    this.horas = {};
    this.selectedDirector = {};
    this.selectedInvestigador = {};
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
