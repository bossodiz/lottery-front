import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  constructor(private http: HttpClient) {
  }

  getPlayers$() {
    return this.http.get<any>(`/lottery/get-players`);
  }

  getLottery$() {
    return this.http.get<any>(`/lottery/search`);
  }

}
