import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any;
  data2: any;

  chartOptions: any

  isVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {

    this.data = {
      labels: ['BLOQUE 1', 'BLOQUE 2', 'BLOQUE 3'],
      datasets: [
        {
          data: [300, 50, 100],
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

    this.data2 = {
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
