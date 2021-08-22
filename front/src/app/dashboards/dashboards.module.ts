import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { TemperaturesComponent } from './temperatures/temperatures.component';
import { MatTableModule } from '@angular/material/table';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [TemperaturesComponent],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    MatTableModule,
    NgApexchartsModule,
  ],
  providers: [DatePipe],
})
export class DashboardsModule {}
