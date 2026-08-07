import { Routes } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];
