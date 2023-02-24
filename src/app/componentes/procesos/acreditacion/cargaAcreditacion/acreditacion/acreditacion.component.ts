import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acreditacion',
  templateUrl: './acreditacion.component.html',
  styleUrls: ['./acreditacion.component.scss']
})
export class AcreditacionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    //this.formData.append("fichero", file);
    console.log(event);
  }

  cargarArchivo() {
    console.log("cargando archivo excel");
  }

}
