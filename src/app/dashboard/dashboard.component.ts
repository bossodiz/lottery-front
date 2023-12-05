import { Component, HostListener } from '@angular/core';
import { Chart } from 'chart.js';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  constructor(private _snackBar: MatSnackBar) {}
  selectedValue: string = '';
  lotteryDigit = '';
  name = '';
  ctx : any;
  config : any;
  chartData: number[] = [];
  chartDatalabels : any[] = [];
  checkLength : boolean = false;
  successMessage = '';
  showSuccess = false;

    ngOnInit(){

      this.chartData.push(10);
      this.chartData.push(9);
      this.chartData.push(8);
      this.chartData.push(7);
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
      this.checkLength = this.lotteryDigit.length >= 5;
      console.log(this.checkLength);
      console.log(this.lotteryDigit.length);

      if (event.keyCode > 31 && (event.keyCode < 48 || event.keyCode > 57))
        return false;
      return true;
    }
    registerLottery() {
      console.log("length: "+ this.lotteryDigit.length);

      if(this.lotteryDigit.length < 6){
        this.successMessage = 'Please fill 6 digit before register';
        this.showAlert();
      }
      else{
        this.successMessage = 'Register lottery for '+this.selectedValue +' number '+this.lotteryDigit+' is successful!';
        this.showAlert();
        this.lotteryDigit = '';
        this.selectedValue = '';
      }

    }
    registerPlayer() {
      this.successMessage = 'Register Player '+this.name +' is successful!';
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
