import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, lastValueFrom, map, startWith } from 'rxjs';
import { LotteryService } from '../../service/lottery.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
export interface LotteryData {
  no: string;
  number: string;
  playerId: string;
  threeDigitFront: string;
  threeDigitLast: string;
  twoDigitLast: string;
  playerName: string;
}
@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrl: './lottery.component.css'
})

export class LotteryComponent {
  constructor(private _service: LotteryService) {
  }
  searchLoterry = {
    lotteryType: '',
    lottery: '',
    player: '',
  }
  myControl = new FormControl('');
  myControl2 = new FormControl('');
  filteredOptions: Observable<any[]> | undefined;
  filteredOptions2: Observable<any[]> | undefined;
  playerList: any[] = []
  lotteryList: LotteryData[] = []


  displayedColumns: string[] = ['no', 'number', 'threeDigitFront', 'threeDigitLast', 'twoDigitLast', 'playerName'];

  dataSource = new MatTableDataSource<LotteryData>();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  async ngAfterViewInit() {
  }

  async ngOnInit() {
    this.lotteryList = [];
    await this.loadPlayers();
    await this.loadLottery();
    this.renderPlayer();
  }

  async loadPlayers() {
    const responsePlayer = await lastValueFrom(this._service.getPlayers$());
    if (responsePlayer.code == 0) {
      this.playerList = responsePlayer.data;
    }
  }

  async loadLottery() {
    const responseLottery = await lastValueFrom(this._service.getLottery$());
    if (responseLottery.code == 0) {
      let data = responseLottery.data.data;
      for (var index in data) {
        this.lotteryList.push(this.initLotteryData(data[index], +index + 1));
      }
    }
    this.onSearch();
  }

  searchButton() {
    let searchResults: LotteryData[] = this.lotteryList;
    if (this.searchLoterry.lottery.trim().length > 0) {
      if (this.searchLoterry.lotteryType == '1') {
        searchResults = searchResults.filter((element) => element.number === this.searchLoterry.lottery.trim());
      } else if (this.searchLoterry.lotteryType == '2') {
        searchResults = searchResults.filter((element) => element.threeDigitFront === this.searchLoterry.lottery.trim());
      } else if (this.searchLoterry.lotteryType == '3') {
        searchResults = searchResults.filter((element) => element.threeDigitLast === this.searchLoterry.lottery.trim());
      } else if (this.searchLoterry.lotteryType == '4') {
        searchResults = searchResults.filter((element) => element.twoDigitLast === this.searchLoterry.lottery.trim());
      }
    }
    if (this.searchLoterry.player.trim().length > 0) {
      console.log(this.searchLoterry.player.trim());
      searchResults = searchResults.filter((element) => element.playerName === this.searchLoterry.player.trim());
    }
    let newData: LotteryData[] = [];
    for (var index in searchResults) {
      newData.push(this.initLotteryData(searchResults[index], +index + 1));
    }
    this.reTable(newData);
  }

  onSearch() {
    this.dataSource = new MatTableDataSource<LotteryData>(this.lotteryList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  reTable(data: LotteryData[]) {
    this.dataSource = new MatTableDataSource<LotteryData>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private renderPlayer() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterName(value || '')),
    );
  }

  private _filterName(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.playerList.filter(player => player.name.toLowerCase().includes(filterValue));
  }

  onlyNumberKey(event: KeyboardEvent) {
    if (event.keyCode > 31 && (event.keyCode < 48 || event.keyCode > 57))
      return false;
    return true;
  }

  resetButton() {
    this.clearSelectPlayer();
    this.clearLottery();
    this.clearLotteryType();
    this.onSearch();
  }

  clearSelectPlayer() {
    this.searchLoterry.player = '';
  }

  clearLottery() {
    this.searchLoterry.lottery = '';
  }

  clearLotteryType() {
    this.searchLoterry.lotteryType = '';
  }

  initLotteryData(item: any, index: number): LotteryData {
    return {
      no: index.toString(),
      number: item.number,
      playerId: item.playerId,
      threeDigitFront: item.threeDigitFront,
      threeDigitLast: item.threeDigitLast,
      twoDigitLast: item.twoDigitLast,
      playerName: item.playerName || '-',
    }

  }
}
