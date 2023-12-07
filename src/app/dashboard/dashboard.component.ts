import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { DashboardService } from '../../service/dashboard.service';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar, private _service: DashboardService) { }
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

  dataChart: any = [
  ];

  playerList: any[] = []
  myControl = new FormControl('');
  filteredOptions: Observable<any[]> | undefined;

  validateRegisterLottery = true;

  registerLoterry = {
    lottery: '',
    player: '',
  }
  lotteryLeft = 0;

  async loadChart() {
    const responseChart = await lastValueFrom(this._service.getChart$());
    if (responseChart.code == 0) {
      this.dataChart = responseChart.data.lotteryPlayer;
      this.lotteryLeft = responseChart.data.lotteryLeft
    }
  }

  async loadPlayers() {
    const responsePlayer = await lastValueFrom(this._service.getChart$());
    if (responsePlayer.code == 0) {
      console.log(responsePlayer);
      this.playerList = responsePlayer.data.lotteryPlayer;
    }
  }

  async ngOnInit() {
    this.loadChart();
    this.loadPlayers();
    const plugin = {
      id: 'emptyDoughnut',
      afterDraw(chart: any, args: any, options: any) {
        const { datasets } = chart.data;
        const { color, width, radiusDecrease } = options;
        let hasData = false;

        for (let i = 0; i < datasets.length; i += 1) {
          const dataset = datasets[i];
          let total = 0;
          for (let item in dataset.data) {
            total += dataset.data[item];
          }
          hasData = hasData || (total > 0);
        }
        if (!hasData) {
          const { chartArea: { left, top, right, bottom }, ctx } = chart;
          const centerX = (0 + right) / 2;
          const centerY = (0 + bottom) / 2;
          const r = Math.min(right - 0, bottom - 0) / 2;
          ctx.beginPath();
          ctx.lineWidth = width || 2;
          ctx.strokeStyle = color || 'rgba(255, 128, 0, 0.5)';
          ctx.arc(centerX, centerY, (r - radiusDecrease || 0), 0, 2 * Math.PI);
          ctx.stroke();
        }
      }
    };

    this.ctx = document.getElementById('myChart');
    this.config = {
      type: 'pie',
      options: {
        plugins: {
          emptyDoughnut: {
            color: 'rgba(255, 128, 0, 0.5)',
            width: 2,
            radiusDecrease: 20
          },
        }
      },
      data: {
        datasets: [{
          label: 'Lottery Total',
          data: this.dataChart.map((s: { total: any; }) => (s.total)),
          borderAlign: 'center',
          borderWidth: 2,
          borderColor: 'white',
          backgroundColor: this.backgroundColors,
        }],

      },
      plugins: [plugin]
    }
    const myChart = new Chart(this.ctx, this.config);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.playerList.filter(player => player.playerName.toLowerCase().includes(filterValue));
  }

  onSelectionChange(event: any) {
    console.log(event.option.value);
  }

  clearSelectPlayer() {
    this.registerLoterry.player = '';
  }

  onlyNumberKey(event: KeyboardEvent) {
    if (event.keyCode > 31 && (event.keyCode < 48 || event.keyCode > 57))
      return false;
    return true;
  }
  playerNameKeypress(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      this.registerPlayerOnClick();
    }
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
    this.alertMessage = 'Register lottery for ' + this.registerLoterry.player + ' number ' + this.registerLoterry.lottery + ' is successful!';
    this.showAlert();
    this.registerLoterry.lottery = '';
    this.registerLoterry.player = '';

  }
  async registerPlayerOnClick() {
    const responsePlayer = await lastValueFrom(this._service.addPlayer$(this.name));
    if (responsePlayer.code == 0) {
      this.name = ''
      this.playerList = responsePlayer.data.lotteryPlayer;
      this.alertMessage = 'Register Player ' + this.name + ' is successful!';
      this.showAlert();
      this.loadChart();
      this.loadPlayers();
    } else {
      this.alertMessage = 'Register Player ' + this.name + ' is failed!';
      this.showAlert();
    }
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

