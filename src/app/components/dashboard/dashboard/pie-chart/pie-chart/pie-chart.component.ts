import { Component, inject, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { Player } from '../../../../../core/interfaces/player';
import { PlayerService } from '../../../../../core/services/player/player.service';

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  private _playerService = inject(PlayerService);
  private chartDom?: HTMLElement;
  private myChart?: echarts.ECharts;
  public option: EChartsOption = {};

  jsonData: any[] = [];

  ngOnInit(): void {
    this.getData();
  }

  transformData(data: any[]): any[] {
    const result = [];
    const sistemasCount = data.filter((item) => item.sistemas === 1).length;
    const nonSistemasCount = data.filter((item) => item.sistemas === 0).length;

    if (sistemasCount > 0) {
      result.push({ value: sistemasCount, name: 'sistemas' });
    }
    if (nonSistemasCount > 0) {
      result.push({ value: nonSistemasCount, name: 'otros' });
    }

    return result;
  }

  getChartOptions(): EChartsOption {
    return {
      title: {
        text: 'Gente de sistemas',
        subtext: 'Real Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Sistemas',
          type: 'pie',
          radius: '50%',
          data: this.transformData(this.jsonData),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
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
        // Update chart after data is received
        if (this.myChart) {
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
    this.chartDom = document.getElementById('main')!;
    if (this.chartDom) {
      this.myChart = echarts.init(this.chartDom);
    }
  }
}



