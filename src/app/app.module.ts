import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CountDownTimerComponent } from './count-down-timer/count-down-timer.component';
import { LotteryComponent } from './lottery/lottery.component';
import { RewardComponent } from './reward/reward.component';
import { Chart } from 'chart.js'
import { registerables } from 'chart.js';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../service/auth.interceptor';
import { MatListModule } from '@angular/material/list';
Chart.register(...registerables)

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    LotteryComponent,
    RewardComponent,
    CountDownTimerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor]),
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
