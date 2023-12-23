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
  chartData: number[] = [];
  chartDatalabels: any[] = [];
  alertMessage = '';

  myChart: any = [];

  dataChart: any = [];

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
      this.lotteryLeft = responseChart.data.lotteryLeft;
    }
  }

  async loadPlayers() {
    const responsePlayer = await lastValueFrom(this._service.getChart$());
    if (responsePlayer.code == 0) {
      this.playerList = responsePlayer.data.lotteryPlayer;
    }
  }

  async ngOnInit() {
    await this.loadChart();
    await this.loadPlayers();

    this.createChart();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.playerList.filter(player => player.playerName.toLowerCase().includes(filterValue));
  }

  createChart() {
    let config: any = {
      type: 'pie',
      options: {
        layout: {
          padding: {
            top: 50,
            bottom: 50
          }
        },
        plugins: {
          tooltip: {
            bodyFont: {
              size: 25
            },
            callbacks: {
              label: (context: any) => {
                console.log(context);
                let name = this.dataChart[context.dataIndex].playerName
                return ' ' + name + ' : ' + context.raw + ' ';
              }
            }
          },
          legend: {
            display: false,
            labels: {
              font: {
                size: 30
              }
            }
          },
          emptyDoughnut: {
            color: 'rgba(255, 128, 0, 0.5)',
            width: 2,
            radiusDecrease: 20
          },
        }
      },
      data: {
        // labels: this.dataChart.map((s: { playerName: any; }) => (s.playerName)),
        datasets: [{
          label: 'Lottery ',
          data: this.dataChart.map((s: { total: any; }) => (s.total)),
          borderAlign: 'center',
          borderWidth: 2,
          borderColor: 'white',
          backgroundColor: this.dataChart.map((s: { color: any; }) => (s.color)),
        }],

      },
    }
    this.myChart = new Chart('myChart', config);
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
  async registerLotteryOnClick() {
    const response = await lastValueFrom(this._service.addLottery$(this.registerLoterry.lottery, this.registerLoterry.player));
    if (response.code == 1) {
      this.alertMessage = response.error;
      this.showAlert();
      return;
    }
    this.alertMessage = 'ลงทะเบียนสำเร็จ : ' + this.registerLoterry.lottery + ' :  ' + this.registerLoterry.player;
    this.showAlert();
    this.registerLoterry.lottery = '';
    this.registerLoterry.player = '';
    await this.loadChart();
    await this.loadPlayers();
    this.myChart.config.data.datasets[0].data = this.dataChart.map((s: { total: any; }) => (s.total));
    this.myChart.config.data.datasets[0].backgroundColor = this.dataChart.map((s: { color: any; }) => (s.color)),
      this.myChart.update();
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

