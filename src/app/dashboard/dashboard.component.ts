import { Component, HostListener } from '@angular/core';
import { Chart } from 'chart.js';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  constructor(private _snackBar: MatSnackBar) { }
  selectedValue: string = '';
  lotteryDigit = '';
  name = '';
  ctx: any;
  config: any;
  chartData: number[] = [];
  chartDatalabels: any[] = [];
  checkLength: boolean = false;
  successMessage = '';
  showSuccess = false;

  backgroundColors = [
    'rgb(255, 0, 0)',
    'rgb(0, 255, 0)',
    'rgb(0, 0, 255)',
    'rgb(255, 255, 0)',
    'rgb(255, 0, 255)',
    'rgb(0, 255, 255)',
    'rgb(128, 0, 0)',
    'rgb(0, 128, 0)',
    'rgb(0, 0, 128)',
    'rgb(128, 128, 0)',
    'rgb(128, 0, 128)',
    'rgb(0, 128, 128)',
    'rgb(128, 128, 128)',
    'rgb(192, 192, 192)',
    'rgb(255, 165, 0)',
    'rgb(128, 0, 64)',
    'rgb(0, 128, 64)',
    'rgb(0, 64, 128)',
    'rgb(64, 64, 64)',
    'rgb(255, 192, 203)',
  ];

  dataChart = [
    {
      id: 1, name: 'boss', value: 10
    },
    {
      id: 2, name: 'best', value: 10
    },
    {
      id: 3, name: 'jame', value: 10
    },
    {
      id: 4, name: 'jatt', value: 10
    },
    {
      id: 5, name: 'jj', value: 10
    },
  ];

  ngOnInit() {
    this.ctx = document.getElementById('myChart');
    this.config = {
      type: 'pie',
      options: {
        plugins: {
          legend: {
            position: 'right',
            align: 'center',
            labels: {
              padding: 20,
              font: {
                size: 20
              }
            }
          },
        }
      },
      data: {
        labels: this.dataChart.map(s => (s.name + ' : ' + s.value)),
        datasets: [{
          label: 'Lottery Total',
          data: this.dataChart.map(s => (s.value)),
          borderAlign: 'center',
          borderWidth: 2,
          borderColor: 'white',
          backgroundColor: this.backgroundColors,
        }],

      }
    }
    const myChart = new Chart(this.ctx, this.config);
  }

  onlyNumberKey(event: KeyboardEvent) {
    this.checkLength = this.lotteryDigit.length >= 5;
    console.log(this.checkLength);
    console.log(this.lotteryDigit.length);

    if (event.keyCode > 31 && (event.keyCode < 48 || event.keyCode > 57))
      return false;
    return true;
  }
  registerLottery() {
    console.log("length: " + this.lotteryDigit.length);

    if (this.lotteryDigit.length < 6) {
      this.successMessage = 'Please fill 6 digit before register';
      this.showAlert();
    }
    else {
      this.successMessage = 'Register lottery for ' + this.selectedValue + ' number ' + this.lotteryDigit + ' is successful!';
      this.showAlert();
      this.lotteryDigit = '';
      this.selectedValue = '';
    }

  }
  registerPlayer() {
    this.successMessage = 'Register Player ' + this.name + ' is successful!';
    this.showAlert();
  }
  showAlert() {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'bottom';
    const alertBar = this._snackBar.open(this.successMessage, 'Close', config);
    alertBar.onAction().subscribe(() => {
      alertBar.dismiss();
    });
  }



}
