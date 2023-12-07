import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar) { }
  name = '';
  ctx: any;
  config: any;
  chartData: number[] = [];
  chartDatalabels: any[] = [];
  alertMessage = '';

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
      id: 2, name: 'best', value: 9
    },
    {
      id: 3, name: 'jame', value: 8
    },
    {
      id: 4, name: 'jatt', value: 7
    },
    {
      id: 5, name: 'jj', value: 6
    },
  ];

  playerList = [
    { id: 1, name: 'boss' },
    { id: 2, name: 'best' },
    { id: 3, name: 'jame' },
    { id: 4, name: 'jatt' },
    { id: 5, name: 'jj' },
  ]
  myControl = new FormControl('');
  players: string[] = ['One', 'Two', 'Three', '44522', '44523', '6442', '7442'];
  filteredOptions: Observable<string[]> | undefined;

  validateRegisterLottery = true;

  registerLoterry = {
    lottery: '',
    player: '',
  }


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
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.players.filter(player => player.toLowerCase().includes(filterValue));
  }

  onSelectionChange(event: any) {
    console.log(event.option.value);
  }

  onlyNumberKey(event: KeyboardEvent) {
    if (event.keyCode > 31 && (event.keyCode < 48 || event.keyCode > 57))
      return false;
    return true;
  }

  disableBtnRegisLot() {
    let validateLottery = this.registerLoterry.lottery.length < 6
    let validatePlayer = this.registerLoterry.player.length < 1
    if (validateLottery || validatePlayer) {
      return true;
    }
    else {
      return false;
    }
  }
  registerLotteryOnClick() {
    console.log("length: " + this.registerLoterry.lottery.length);
    console.log("length: " + this.registerLoterry.player);
    if (!this.players.includes(this.registerLoterry.player)) {
      this.alertMessage = 'This name does not exist in the system. Please register first.';
      this.showAlert();
    }
    else if (this.registerLoterry.lottery.length < 6) {
      this.alertMessage = 'Please fill 6 digit before register';
      this.showAlert();
    }
    else {
      this.alertMessage = 'Register lottery for ' + this.registerLoterry.player + ' number ' + this.registerLoterry.lottery + ' is successful!';
      this.showAlert();
      this.registerLoterry.lottery = '';
      this.registerLoterry.player = '';
    }

  }
  registerPlayerOnClick() {
    this.alertMessage = 'Register Player ' + this.name + ' is successful!';
    this.showAlert();
  }
  showAlert() {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'bottom';
    const alertBar = this._snackBar.open(this.alertMessage, 'Close', config);
    alertBar.onAction().subscribe(() => {
      alertBar.dismiss();
    });
  }



}

