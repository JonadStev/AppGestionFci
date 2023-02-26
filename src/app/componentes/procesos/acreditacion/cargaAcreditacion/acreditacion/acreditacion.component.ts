import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GestionService } from 'src/app/services/gestion.service';
import { ProcesosService } from 'src/app/services/procesos.service';

@Component({
  selector: 'app-acreditacion',
  templateUrl: './acreditacion.component.html',
  styleUrls: ['./acreditacion.component.scss']
})
export class AcreditacionComponent implements OnInit {

  constructor(private messageService: MessageService, private procesoService: ProcesosService) { }

  formData = new FormData();

  @ViewChild('myInputFile')
  myInputFile: ElementRef;

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.formData.delete("fichero");
    const file: File = event.target.files[0];
    this.formData.append("fichero", file);

  }

  cargarArchivo() {
    console.log(this.formData);
    this.procesoService.cargarExcel(this.formData).subscribe(data => {
      this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Información', detail: 'Registros guardados exitosamente.' });
      console.log(data);
      this.myInputFile.nativeElement.value = '';
      this.formData = new FormData();
    });
  }

}
