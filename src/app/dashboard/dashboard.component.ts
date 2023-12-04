import { Component, HostListener } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  selectedValue: string = '';
  value = '';
  ctx : any;
  config : any;
  chartData : number[] = [];
  chartDatalabels : any[] = [];
  checkLength : boolean = false;

    ngOnInit(){

      this.chartData.push(5);
      this.chartData.push(7);
      this.chartData.push(6);
      this.chartData.push(10);


      this.chartDatalabels.push('Best: '+this.chartData[0]);
      this.chartDatalabels.push("P'Boss: "+this.chartData[1]);
      this.chartDatalabels.push('Dad: '+this.chartData[2]);
      this.chartDatalabels.push('Mom: '+this.chartData[3]);


      this.ctx = document.getElementById('myChart');
      this.config = {
        type : 'pie',
        options : {
        },
        data : {
          labels : this.chartDatalabels,
          datasets : [{
            label: 'Lottery Total',
            data: this.chartData,
            borderWidth: 2,
            borderColor: 'white',
            backgroundColor: ['green', 'yellow','red','blue'],

        }],

        }
      }
      const myChart = new Chart(this.ctx, this.config);
    }
    onlyNumberKey(event: KeyboardEvent) {
      this.checkLength = this.value.length >= 5;
      console.log(this.checkLength);
      console.log(this.value.length);
      if (event.keyCode > 31 && (event.keyCode < 48 || event.keyCode > 57))
        return false;
      return true;
    }
    registerLottery() {
      console.log('Button clicked!');
    }

}
