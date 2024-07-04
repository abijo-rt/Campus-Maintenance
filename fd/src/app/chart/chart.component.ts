import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';



@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})


export class ChartComponent {
  basicData: any;
  completed_work:number = 5;
  not_completed_work:number =13;
  basicOptions: any;

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.basicData = {
          labels: ['Completed', 'Pending'],
          datasets: [
              {
                  label: 'WORK STATUS',
                  data: [this.completed_work,this.not_completed_work ],
                  backgroundColor: ['rgb(140, 225, 26,0.5)', 'rgba(255, 26, 26, 0.2)'],
                  borderColor: ['rgb(140, 225, 26)', 'rgb(225, 26, 26)'],
                  borderWidth: 2
              }
          ]
      };

      this.basicOptions = {
        height: 500,
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };
  }



}
