import { Component, inject } from '@angular/core';
import { PlayerService } from '../../../../../core/services/player/player.service';

import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-carrer-line',
  standalone: true,
  imports: [],
  templateUrl: './carrer-line.component.html',
  styleUrl: './carrer-line.component.css'
})
export class CarrerLineComponent {


  private _playerService = inject(PlayerService);
  private chartDom?: HTMLElement;
  private myChart?: echarts.ECharts;
  public option: EChartsOption = {};

  jsonData: any[] = [];

  ngOnInit(): void {
    this.getData();
  }

  transformData(data: any[]): { [key: string]: { sistemas: number, noSistemas: number } } {
    return data.reduce((acc: any, item: any, index: number) => {
      const category = item.line; // `adc`, `mid`, `top`, etc.
      const sistemas = item.sistemas === 1 ? 1 : 0;
      if (!acc[category]) {
        acc[category] = { sistemas: 0, noSistemas: 0 };
      }
      acc[category].sistemas += sistemas;
      acc[category].noSistemas += (1 - sistemas);
      return acc;
    }, {});
  }

  getChartOptions(): EChartsOption {
    const transformedData = this.transformData(this.jsonData);
    const categories = Object.keys(transformedData);
    const sistemasData = categories.map(cat => transformedData[cat].sistemas);
    const noSistemasData = categories.map(cat => transformedData[cat].noSistemas);

    return {
      legend: {
        data: ['Sistemas', 'No Sistemas']
      },
      xAxis: {
        type: 'category',
        data: categories // Mostrar categorías como `adc`, `mid`, `top`, etc.
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Sistemas',
          type: 'bar',
          data: sistemasData,
          label: {
            show: true,
            position: 'top',
            formatter: '{c}'
          }
        },
        {
          name: 'No Sistemas',
          type: 'bar',
          data: noSistemasData,
          label: {
            show: true,
            position: 'top',
            formatter: '{c}'
          }
        }
      ]
    };
  }

  getData(): void {
    this._playerService.getPlayers().subscribe({
      next: (data: any[]) => {
        this.jsonData = data;
        if (this.chartDom) {
          this.myChart = echarts.init(this.chartDom);
          this.option = this.getChartOptions();
          this.myChart.setOption(this.option);
        }
      },
      error: (error) => {
        console.error('Error fetching players', error);
      }
    });
  }

  ngAfterViewInit(): void {
    this.chartDom = document.getElementById('main2')!;
    if (this.chartDom) {
      this.myChart = echarts.init(this.chartDom);
    }
  }


}



