import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, lastValueFrom, map, startWith } from 'rxjs';
import { LotteryService } from '../../service/lottery.service';
export interface Lottery {
  order: number;
  lotteryNumber: string;
  ownerName: string;
}
@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrl: './lottery.component.css'
})

export class LotteryComponent {
  constructor(private _service: LotteryService) { }
  searchLoterry = {
    lottery: '',
    player: '',
  }
  myControl = new FormControl('');
  myControl2 = new FormControl('');
  filteredOptions: Observable<any[]> | undefined;
  filteredOptions2: Observable<any[]> | undefined;
  playerList: any[] = []
  lotteryList: any[] = []


  displayedColumns: string[] = ['order', 'lotteryNumber', 'ownerName'];
  dataSource: Lottery[] = [
    { order: 1, lotteryNumber: '123456', ownerName: 'Best' },
    { order: 2, lotteryNumber: '123123', ownerName: 'Best' },
    { order: 3, lotteryNumber: '555555', ownerName: 'Best' },
    { order: 4, lotteryNumber: '431234', ownerName: 'Best' },
    { order: 5, lotteryNumber: '574884', ownerName: 'Best' },

  ];

  async ngOnInit() {
    await this.loadPlayers();
    await this.loadLottery();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterName(value || '')),
    );
    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filterLottery(value || '')),
    );
  }
  async loadPlayers() {
    const responsePlayer = await lastValueFrom(this._service.getPlayers$());
    if (responsePlayer.code == 0) {
      this.playerList = responsePlayer.data.lotteryPlayer;
    }
  }

  async loadLottery() {
    const responseLottery = await lastValueFrom(this._service.getLottery$());
    if (responseLottery.code == 0) {
      this.lotteryList = responseLottery.data.number;
    }
  }

  private _filterName(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.playerList.filter(player => player.playerName.toLowerCase().includes(filterValue));
  }

  private _filterLottery(value: string): any[] {
    const filterValue2 = value;
    return this.lotteryList.filter(lottery => lottery.number.includes(filterValue2));
  }

  onlyNumberKey(event: KeyboardEvent) {
    if (event.keyCode > 31 && (event.keyCode < 48 || event.keyCode > 57))
      return false;
    return true;
  }

  resetButton() {
    this.searchLoterry.player = '';
    this.searchLoterry.lottery = '';
  }

  onSelectionChange(event: any) {
    console.log(event.option.value);
  }

  clearSelectPlayer() {
    this.searchLoterry.player = '';
  }

  clearLottery() {
    this.searchLoterry.lottery = '';
  }

}
