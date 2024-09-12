import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { SistemasComponent } from './components/sistemas/sistemas/sistemas.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: SistemasComponent },
  { path: 'dashboard', component: DashboardComponent },
];
