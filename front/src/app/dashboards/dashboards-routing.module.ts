import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { TemperaturesComponent } from './temperatures/temperatures.component';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    redirectTo: '/dashboard/temperatures',
    pathMatch: 'full',
  },
  {
    path: 'dashboard/temperatures',
    component: TemperaturesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {}
