import { Component } from '@angular/core';
import { PieChartComponent } from './pie-chart/pie-chart/pie-chart.component';
import { StackedBarsComponent } from './stacked-bars/stacked-bars/stacked-bars.component';
import { CarrerLineComponent } from './carrer-line/carrer-line/carrer-line.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ PieChartComponent, StackedBarsComponent,CarrerLineComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
