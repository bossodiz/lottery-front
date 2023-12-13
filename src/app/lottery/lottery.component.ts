import { Component } from '@angular/core';
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
  name: string = '';
  digit: string = '';


  displayedColumns: string[] = ['order', 'lotteryNumber', 'ownerName'];
  dataSource: Lottery[] = [
    { order: 1, lotteryNumber: '123456', ownerName: 'Best' },
    { order: 2, lotteryNumber: '123123', ownerName: 'Best' },
    { order: 3, lotteryNumber: '555555', ownerName: 'Best' },
    { order: 4, lotteryNumber: '431234', ownerName: 'Best' },
    { order: 5, lotteryNumber: '574884', ownerName: 'Best' },

  ];

  onlyNumberKey(event: KeyboardEvent) {
    if (event.keyCode > 31 && (event.keyCode < 48 || event.keyCode > 57))
      return false;
    return true;
  }

  resetButton() {
    this.name = '';
    this.digit = '';
  }
}
