import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss'],
})
export class WeatherChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() hourlyWeatherData: any[] = [];

  private weatherChart: Chart | null = null;

  @ViewChild('weatherChartCanvas', { static: false }) weatherChartCanvas: ElementRef | undefined;

  ngOnInit(): void {
    if (this.weatherChart) {
      this.weatherChart.destroy();
    }
  }

  ngOnChanges(): void {
    if (this.hourlyWeatherData && this.hourlyWeatherData.length > 0) {
      this.createChart();
    }
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart() {
    let ctx: any;
  
    if (this.weatherChartCanvas) {
      ctx = this.weatherChartCanvas.nativeElement.getContext('2d');
    }
    
    if (!ctx) {
      return;
    }
  
    if (this.weatherChart) {
      this.weatherChart.destroy();
    }

    const times = this.hourlyWeatherData.map((data) => data.time);
    const temperatures = this.hourlyWeatherData.map((data) => data.temperature);

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: times,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temperatures,
            borderColor: 'blue',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  ngOnDestroy(): void {
    if (this.weatherChart) {
      this.weatherChart.destroy();
    }
  }
}