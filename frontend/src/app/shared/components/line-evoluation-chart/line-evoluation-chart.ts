import { Component, Input, ViewChild, OnInit, inject } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { InvitationService } from '@/core/http/invitation';
import { ChartOptions, ChartResponse, RegistrationData } from '@/core/@types/chart-analitics';

@Component({
  selector: 'app-line-evoluation-chart',
  imports: [ChartComponent],
  templateUrl: './line-evoluation-chart.html',
})
export class LineEvoluationChart implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  @Input() eventId!: string;
  private readonly invitationService = inject(InvitationService);

  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Registos',
          data: [],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
        width: 3,
        colors: ['#374151'],
      },
      title: {
        text: 'Evolução dos Registos ao Longo do Tempo',
        align: 'left',
        style: {
          fontSize: '16px',
          fontWeight: '600',
          color: '#374151',
          fontFamily: 'GeistSans',
        },
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
        borderColor: '#e5e7eb',
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: '#6b7280',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Número de Registos',
          style: {
            color: '#6b7280',
          },
        },
        labels: {
          style: {
            colors: '#6b7280',
          },
        },
      },
      tooltip: {
        x: {
          format: 'dd/MM/yyyy',
        },
        y: {
          formatter: function (value: number) {
            return value + ' registos';
          },
        },
      },
      colors: ['#374151'],
    };
  }

  ngOnInit(): void {
    if (this.eventId) {
      this.loadRegistrationData();
    }
  }

  private loadRegistrationData(): void {
    this.invitationService.getEvolution(this.eventId).subscribe({
      next: (response: ChartResponse) => {
        console.log('Chart data received:', response);
        this.updateChartData(response.data);
      },
      error: (error) => {
        console.error('Erro ao carregar dados do gráfico:', error);
        this.updateChartData([]);
      },
    });
  }

  updateChartData(data: RegistrationData[]): void {
    const categories = data.map((item) => {
      const date = new Date(item.date);
      return date.toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' });
    });

    const seriesData = data.map((item) => item.registrations);

    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          name: 'Registos',
          data: seriesData,
        },
      ],
      xaxis: {
        ...this.chartOptions.xaxis,
        categories: categories,
      },
    };
  }
}
