import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MasterService } from '../../services/master.services';
import { salesdata } from '../../model/salesdata';

Chart.register(...registerables);

@Component({
  selector: 'app-mychart',
  standalone: true,
  templateUrl: './mychart.component.html',
  styleUrls: ['./mychart.component.css']
})
export class MychartComponent implements OnInit, AfterViewInit {

  chartdata: salesdata[] = [];
  labeldata: number[] = [];
  realdata: number[] = [];
  colordata: string[] = [];
  isScaled: boolean = false; 
  barChartInstance: any;  
  lineChartInstance: any;  

  constructor(private service: MasterService) { }

  ngOnInit(): void {
    this.loadchartdata();
    this.setupSidebarToggle();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadchartdata(); 
    }, 1000); 
  }

  loadchartdata() {
    this.service.loadsalesdata().subscribe(item => {
      this.chartdata = item;
      if (this.chartdata != null) {
        this.chartdata.map(o => {
          this.labeldata.push(o.year);
          this.realdata.push(o.amount);
          this.colordata.push(o.colorcode);
        });
        this.Renderbarchart(this.labeldata, this.realdata, this.colordata);
        this.Renderlinechart(this.labeldata, this.realdata, this.colordata);
      }
    });
  }

  Renderbarchart(labeldata: any, valuedata: any, colordata: any) {
    this.Renderchart(labeldata, valuedata, colordata, 'barchart', 'bar');
  }

  Renderlinechart(labeldata: any, valuedata: any, colordata: any) {
    this.Renderchart(labeldata, valuedata, colordata, 'linechart', 'line');
  }

  Renderchart(labeldata: any, valuedata: any, colordata: any, chartid: string, charttype: any) {
    
    if (chartid === 'barchart' && this.barChartInstance) {
      this.barChartInstance.destroy();
    }
    if (chartid === 'linechart' && this.lineChartInstance) {
      this.lineChartInstance.destroy();
    }

    const chartInstance = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Sales',
          data: valuedata,
          backgroundColor: colordata,
          borderColor: colordata.map((color: string) => this.darkenColor(color)),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: true,
              color: '#e2e2e2'
            }
          },
          y: {
            beginAtZero: true,
            min: 0,
            max: this.isScaled ? Math.max(...valuedata) * 1.5 : Math.max(...valuedata) * 1.2,
            ticks: {
              stepSize: 5000,
              color: '#333'
            },
            grid: {
              display: true,
              color: '#e2e2e2'
            }
          }
        }
      }
    });

    
    if (chartid === 'barchart') {
      this.barChartInstance = chartInstance;
    } else if (chartid === 'linechart') {
      this.lineChartInstance = chartInstance;
    }
  }

  changeScale() {
    this.isScaled = !this.isScaled; 
  
    this.Renderbarchart(this.labeldata, this.realdata, this.colordata); 
    this.Renderlinechart(this.labeldata, this.realdata, this.colordata); 
  }

  darkenColor(color: string): string {
    const hex = color.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16) - 20;
    const g = parseInt(hex.slice(2, 4), 16) - 20;
    const b = parseInt(hex.slice(4, 6), 16) - 20;
    return `#${this.toHex(r)}${this.toHex(g)}${this.toHex(b)}`;
  }

  toHex(value: number): string {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  setupSidebarToggle() {
    (window as any).toggleSidebar = function () {
      const sidebar = document.getElementById('sidebar');
      sidebar?.classList.toggle('sidebar-active');
    };
  }
}
