import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-countdowntimer',
  templateUrl: './countdowntimer.component.html',
  styleUrls: ['./countdowntimer.component.css']
})
export class CountDownTimerComponent implements OnDestroy {
  minutes: number = 0;
  seconds: number = 0;
  remainingSeconds: number = 0;
  keepTime: number = 0;
  countdownSubscription: Subscription | undefined;
  isCounting: boolean = false;
  showTime: boolean = false;
  audioLongTime = new Audio('../assets/180sec.mp3');
  audio10Sec = new Audio('../assets/10sec.mp3');

  disableStartBtn() {
    let validateMinutes = this.minutes < 1;
    let validateSecond =  this.seconds < 11;
    if (this.remainingSeconds < 11 && this.remainingSeconds != 0){
      return true
    }
    if (validateMinutes && validateSecond){
      return true;
    }
    else{
      return false;
    }
  }

  disableInput(){
    let timeIsCounting = this.remainingSeconds > 0;
    if (timeIsCounting){
      return true;
    }
    else{
      return false;
    }
  }

  toggleCountdown() {
    if (this.isCounting) {
      this.stopCountdown();
    } else {
      this.startCountdown();
    }
  }

  startCountdown() {
    if (this.minutes === 0 && this.seconds === 0){
      return ;
    }
    if (this.remainingSeconds === 0) {
      this.remainingSeconds = this.minutes * 60 + this.seconds;
    }

    this.audioLongTime.play();
    this.countdownSubscription = interval(1000).subscribe(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.showTime = true;
      }
      else {
        this.stopCountdown();
      }
    });
    this.isCounting = true;
  }

  stopCountdown() {
    this.audioLongTime.pause();


    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
      this.isCounting = false;
      this.keepTime = this.remainingSeconds;
    }
  }

  resetCountdown() {
    this.audio10Sec.pause();
    this.stopCountdown();
    this.minutes = 0;
    this.seconds = 0;
    this.remainingSeconds = 0;
    this.keepTime = 0;
    this.showTime = false;
  }

  getRemainingTime() {
    if (this.remainingSeconds === 0) {
      return "Time's up";
    }
    else if(this.remainingSeconds < 11){
      this.audioLongTime.pause();
      this.audio10Sec.play();
      this.disableStartBtn();
    }
    return this.getFormattedTime();
  }

  getFormattedTime() {
    return `${this.remainingSeconds}`;
  }

  ngOnDestroy() {
    this.stopCountdown();
  }
  ggetCircleStyles() {
    const isFinalCountdown = this.isCounting && this.remainingSeconds <= 10;
    return {
      'border-color': isFinalCountdown ? 'red' : 'gainsboro',
      'animation': isFinalCountdown ? 'pulse 0.5s infinite alternate' : 'none'
    };
  }

  onlyNumberKey(event: KeyboardEvent) {
    if (event.keyCode > 31 && (event.keyCode < 48 || event.keyCode > 57))
      return false;
    return true;
  }

}
