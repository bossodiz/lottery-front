import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  getChart$() {
    return this.http.get<any>('/dashboard/get-chart');
  }

  getPlayers$() {
    return this.http.get<any>(`/dashboard/get-players`);
  }

  addPlayer$(name: string) {
    return this.http.post<any>(`/dashboard/add-player`, {
      name: name.trim()
    });
  }

  deletePlayer$(name: string) {
    return this.http.post<any>(`/dashboard/delete-player`, {
      name: name.trim()
    });
  }

  addLottery$(lottery: string, playerName: string) {
    return this.http.post<any>(`/dashboard/add-lottery`, {
      lottery: lottery,
      playerName: playerName
    });
  }
}
