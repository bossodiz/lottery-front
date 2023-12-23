import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  constructor(private http: HttpClient) {
  }

  getType$() {
    return this.http.get<any>(`/awards/type`);
  }

  getData$(type: any) {
    return this.http.get<any>(`/awards/data`, { params: { type: type } });
  }

  postSubmit$(number: string, lotteryTypeId: number) {
    return this.http.post<any>(`/awards/submit`, { number: number, lotteryTypeId: lotteryTypeId });
  }

}
