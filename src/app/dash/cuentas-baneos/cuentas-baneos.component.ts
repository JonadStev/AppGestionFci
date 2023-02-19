import { Component, OnInit } from '@angular/core';
import { DashBloqueDto } from 'src/app/modelos/dashBloqueo';
import { BloqueoService } from 'src/app/services/bloqueo.service';

@Component({
  selector: 'app-cuentas-baneos',
  templateUrl: './cuentas-baneos.component.html',
  styleUrls: ['./cuentas-baneos.component.scss']
})
export class CuentasBaneosComponent implements OnInit {

  data: any;

  horizontalOptions: any;

  constructor(private bloqueoService: BloqueoService) { }

  dataBloqueo: DashBloqueDto = {};

  fechaIni: Date = new Date;
  fechaFin: Date = new Date;

  ngOnInit(): void {
    this.llenarData();

    this.horizontalOptions = {
      indexAxis: 'y',
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };

  }

  llenarData() {
    this.bloqueoService.getBloqueosByFecha(this.fechaIni.toLocaleDateString(), this.fechaFin.toLocaleDateString()).subscribe(data => {
      this.dataBloqueo = data;
      this.data = {
        labels: this.dataBloqueo.labels,
        datasets: [
          {
            label: this.dataBloqueo.datasets?.label,
            backgroundColor: this.dataBloqueo.datasets?.backgroundColor,
            data: this.dataBloqueo.datasets?.datasets
          }
        ]
      };
    });
  }





}
