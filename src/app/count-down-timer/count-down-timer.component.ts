import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-count-down-timer',
  templateUrl: './count-down-timer.component.html',
  styleUrls: ['./count-down-timer.component.css']
})
export class CountDownTimerComponent implements OnDestroy {
  minutes: any = 0;
  seconds: any = 0;
  remainingSeconds: number = 0;
  keepTime: number = 0;
  convertMinToSecond : number = 60;
  countdownSubscription: Subscription | undefined;
  isCounting: boolean = false;
  showTime: boolean = false;
  isTimeUp: boolean = false;
  audioLongTime = new Audio('../assets/180sec.mp3');
  audio10Sec = new Audio('../assets/10sec.mp3');
  audio9Sec = new Audio('../assets/9sec.mp3');
  audio8Sec = new Audio('../assets/8sec.mp3');
  audio7Sec = new Audio('../assets/7sec.mp3');
  audio6Sec = new Audio('../assets/6sec.mp3');
  audio5Sec = new Audio('../assets/5sec.mp3');
  audio4Sec = new Audio('../assets/4sec.mp3');
  audio3Sec = new Audio('../assets/3sec.mp3');
  audio2Sec = new Audio('../assets/2sec.mp3');
  audio1Sec = new Audio('../assets/1sec.mp3');
  audioTimeUp = new Audio('../assets/timeup.mp3');

  // disableStartBtn() {
  //   let validateMinutes = this.minutes < 1;
  //   let validateSecond =  this.seconds < 11;
  //   if (this.remainingSeconds < 11 && this.remainingSeconds != 0){
  //     return true
  //   }
  //   if (validateMinutes && validateSecond){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }

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
      this.remainingSeconds = (parseInt(this.minutes) * this.convertMinToSecond ) + parseInt(this.seconds);
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
    this.isTimeUp = false;
  }

  stopCountdown() {
    this.audioLongTime.pause();

    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
      this.isCounting = false;
      this.keepTime = this.remainingSeconds;
    }
  }
  getDefaultTime(){
    if (!this.showTime){
      return `0`;
    }
    else{
      return null;
    }
  }


  resetCountdown() {
    this.stopCountdown();
    this.minutes = 0;
    this.seconds = 0;
    this.remainingSeconds = 0;
    this.keepTime = 0;
    this.showTime = false;
  }

  getRemainingTime() {
    let time = this.remainingSeconds;
    switch (time) {
      case 10:
        this.audioLongTime.pause();
        this.audio10Sec.play();
        break;
      case 9:
        this.audio9Sec.play();
        break;
      case 8:
        this.audio8Sec.play();
        break;
      case 7:
        this.audio7Sec.play();
        break;
      case 6:
        this.audio6Sec.play();
        break;
      case 5:
        this.audio5Sec.play();
        break;
      case 4:
        this.audio4Sec.play();
        break;
      case 3:
        this.audio3Sec.play();
        break;
      case 2:
        this.audio2Sec.play();
        break;
      case 1:
        this.audio1Sec.play();
        break;
      case 0:
        if(!this.isTimeUp){
          this.isTimeUp = true;
          this.audioTimeUp.play();
        }
        return "Time's up";
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

