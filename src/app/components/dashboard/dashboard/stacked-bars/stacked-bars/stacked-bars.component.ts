import { Component, inject, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { Player } from '../../../../../core/interfaces/player';
import { PlayerService } from '../../../../../core/services/player/player.service';

type EChartsOption = echarts.EChartsOption;

interface DataItem {
  otp: string;
  sistemas: number;
  nonSistemas: number;
}


@Component({
  selector: 'app-stacked-bars',
  standalone: true,
  imports: [],
  templateUrl: './stacked-bars.component.html',
  styleUrl: './stacked-bars.component.css'
})
export class StackedBarsComponent {


  private _playerService = inject(PlayerService);
  private chartDom?: HTMLElement;
  private myChart?: echarts.ECharts;
  public option: EChartsOption = {};

  jsonData: any[] = [];

  ngOnInit(): void {
    this.getData();
  }

  transformData(data: any[]): DataItem[] {
    const result: DataItem[] = data.reduce((acc: DataItem[], item: any) => {
      const otp = item.otp;
      const sistemas = item.sistemas === 1 ? 1 : 0;
      const found = acc.find(entry => entry.otp === otp);
      if (found) {
        found.sistemas += sistemas;
        found.nonSistemas += (1 - sistemas);
      } else {
        acc.push({ otp, sistemas, nonSistemas: 1 - sistemas });
      }
      return acc;
    }, []);

    return result;
  }

  getChartOptions(): EChartsOption {
    const transformedData = this.transformData(this.jsonData);
    const otps = transformedData.map(item => item.otp);
    const totalCounts = transformedData.map(item => item.sistemas + item.nonSistemas);
    const sistemasPercent = transformedData.map((item, index) => (item.sistemas / totalCounts[index]) * 100);
    const nonSistemasPercent = transformedData.map((item, index) => (item.nonSistemas / totalCounts[index]) * 100);

    return {
      legend: {
        selectedMode: false
      },
      grid: {
        left: 100,
        right: 100,
        top: 50,
        bottom: 50
      },
      xAxis: {
        type: 'category',
        data: otps
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}%'  // Mostrar porcentaje en el eje Y
        },
        max: 100  // Definir el máximo del eje Y como 100%
      },
      series: [
        {
          name: 'Sistemas',
          type: 'bar',
          stack: 'total',
          barWidth: '60%',
          data: sistemasPercent,
          label: {
            show: true,
            formatter: (params) => {
              const value = params.value as number | null | undefined;
              return value != null ? `${Math.round(value * 10) / 10}%` : '0%';  // Manejar null y undefined
            }
          }
        },
        {
          name: 'No Sistemas',
          type: 'bar',
          stack: 'total',
          barWidth: '60%',
          data: nonSistemasPercent,
          label: {
            show: true,
            formatter: (params) => {
              const value = params.value as number | null | undefined;
              return value != null ? `${Math.round(value * 10) / 10}%` : '0%';  // Manejar null y undefined
            }
          }
        }
      ]
    };
  }


  getData(): void {
    this._playerService.getPlayers().subscribe({
      next: (data: any[]) => {
        this.jsonData = data;
        // Initialize chart only if DOM element is available
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
    this.chartDom = document.getElementById('main1')!;
    if (this.chartDom) {
      this.myChart = echarts.init(this.chartDom);
    }
  }

}
