import { Component, OnInit } from '@angular/core';
import { BloqueoService } from 'src/app/services/bloqueo.service';

@Component({
  selector: 'app-cuentas-generales',
  templateUrl: './cuentas-generales.component.html',
  styleUrls: ['./cuentas-generales.component.scss']
})
export class CuentasGeneralesComponent implements OnInit {

  data: any;
  data2: any;

  chartOptions: any

  constructor(private bloqueoService: BloqueoService) { }

  ngOnInit(): void {
    this.data = {
      labels: ['BLOQUE 1', 'BLOQUE 2', 'BLOQUE 3', 'BLOQUE 4', 'BLOQUE 5', 'BLOQUE 6'],
      datasets: [
        {
          data: [300, 50, 100, 25, 25, 25],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }
      ]
    };

    this.updateChartOptions();
    this.llenarData();
  }

  llenarData() {
    this.bloqueoService.getCuentasGenerales().subscribe(res => {
      this.data2 = {
        labels: ['CUENTAS REGISTRADAS', 'CUENTAS BANEADAS', 'CUENTAS ACTIVAS'],
        datasets: [
          {
            data: res,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
            ]
          }
        ]
      };
    });
  }

  updateChartOptions() {
    this.chartOptions = this.getDarkTheme();
  }

  getDarkTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: 'black',
          }
        }
      }
    }
  }

}
