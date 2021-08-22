import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
} from 'ng-apexcharts';
import { AuthService } from 'src/app/auth/auth.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

interface Temp {
  createAt: string;
  value: number;
}

@Component({
  selector: 'app-temperatures',
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.css'],
})
export class TemperaturesComponent {
  temperatures: Array<Temp> = [];
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: ChartOptions;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar,
    public authService: AuthService
  ) {
    this.http.get('http://localhost:3000/dashboard/temperatures').subscribe(
      (resp: any) => {
        this.temperatures = resp.temperatures;
        this.chartOptions = {
          series: [
            {
              name: 'Temp',
              data: this.temperatures.map((temp) => temp.value),
            },
          ],
          chart: {
            height: 500,
            type: 'area',
          },
          colors: ['#77B6EA', '#545454'],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'smooth',
          },
          title: {
            text: 'Average High & Low Temperature',
            align: 'left',
            style: {
              fontSize: '32px',
              fontFamily: 'roboto',
              fontWeight: 'normal',
            },
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: this.temperatures.map((temp) =>
              datePipe.transform(temp.createAt, 'mediumDate')
            ),
            title: {
              text: 'Date',
            },
          },
          yaxis: {
            title: {
              text: 'Temperature',
            },
            min: -20,
            max: 40,
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5,
          },
        };
      },
      (error) => {
        if (error.status === 403) {
          this.authService.logout();
        }
        this._snackBar.open(error.error.error, undefined, {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      }
    );
  }
}
