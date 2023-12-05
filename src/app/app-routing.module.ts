import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { LotteryComponent } from './lottery/lottery.component';
import { RewardComponent } from './reward/reward.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'stopwatch', component: StopwatchComponent },
  { path: 'lottery', component: LotteryComponent },
  { path: 'reward', component: RewardComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
