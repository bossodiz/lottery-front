import { RewardsService } from './../../service/rewards.service';
import { Component } from '@angular/core';
import * as confetti from 'canvas-confetti';
import { lastValueFrom } from 'rxjs';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrl: './reward.component.css'
})
export class RewardComponent {

  constructor(private _rewardsService: RewardsService) { }

  color: ThemePalette = 'warn';
  isChecked = true

  lotteryType: any[] = []
  selectedValueType = 1;

  spin: any
  textSpin = 'SPIN'

  colors = ["#DA544A", "#444444"];
  currentColor = false;
  sectors: any[] = [];

  tot!: number;
  ctx!: any;
  dia!: number;
  rad!: number;
  PI!: number;
  TAU!: number;
  arc0!: number;

  friction = 0.995; // 0.995=soft, 0.99=mid, 0.98=hard
  angVel = 0; // Angular velocity
  ang = 0; // Angle in radians
  lastSelection!: number;

  isSpinner: boolean = false;
  freeText = '';

  ngOnInit() {
    this.loadRewardType();
    this.reload();
  }

  async loadRewardType() {
    const response = await lastValueFrom(this._rewardsService.getType$());
    if (response.code == 0) {
      this.lotteryType = response.data;
    }
  }

  concat(str: string, multiplier: number): string {
    let concat = ''
    for (let i = 0; i < multiplier; i++) {
      concat += str;
    }
    return concat;
  }


  async reload() {
    this.isSpinner = false;
    window.clearInterval(this.intervalID);
    if (!this.selectedValueType) return;
    const response = await lastValueFrom(this._rewardsService.getData$(this.selectedValueType));
    if (response.code == 0) {
      this.sectors = []
      this.currentColor = false;
      const list = response.data.lottery;
      var i: any;
      for (i in response.data.lottery) {
        this.sectors.push({ color: this.colors[this.currentColor ? 0 : 1], label: list[i] })
        this.currentColor = !this.currentColor
      }
      if (this.sectors.length % 2 == 1) {
        let char = this.sectors[0].label.length;
        this.freeText = this.concat('0', char);
        this.sectors.push({ color: this.colors[this.currentColor ? 0 : 1], label: this.freeText })
        this.currentColor = !this.currentColor
      }
      this.createWheel();
    }
  }

  createWheel() {
    this.spin = document.getElementById("spin");
    this.spin.textContent = 'SPIN';
    var canvas: any = document.getElementById("wheel");
    this.ctx = canvas.getContext("2d");
    this.dia = this.ctx.canvas.width;
    this.tot = this.sectors.length;
    this.rad = this.dia / 2;
    this.PI = Math.PI;
    this.TAU = 2 * this.PI;
    this.arc0 = this.TAU / this.sectors.length;
    this.sectors.forEach((sector, i) => this.drawSector(sector, i));
    this.rotate(true);
  }

  getIndex = () =>
    Math.floor(this.tot - (this.ang / this.TAU) * this.tot) % this.tot;

  drawSector(sector: { color: any; label: any; }, i: number) {
    const ang = this.arc0 * i;
    this.ctx.save();
    // COLOR
    this.ctx.beginPath();
    this.ctx.fillStyle = sector.color;
    this.ctx.moveTo(this.rad, this.rad);

    this.ctx.arc(this.rad, this.rad, this.rad, ang, ang + this.arc0);
    this.ctx.lineTo(this.rad, this.rad);
    this.ctx.fill();
    // TEXT
    this.ctx.translate(this.rad, this.rad);
    this.ctx.rotate(ang + this.arc0 / 2);
    this.ctx.textAlign = "right";
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "bold 30px sans-serif";
    this.ctx.fillText(sector.label, this.rad - 10, 10);
    //
    this.ctx.restore();
  }

  rotate(first = false) {
    const sector = this.sectors[this.getIndex()];
    this.ctx.canvas.style.transform = `rotate(${this.ang - this.PI / 2}rad)`;
    if (this.isSpinner) {
      this.spin.textContent = sector.label;
    }
    if (!first) {
      this.lastSelection = !this.angVel ? this.lastSelection : this.getIndex();
    }
    this.spin.style.background = sector.color;
  }

  intervalID: any
  rand = (m: number, M: number) => Math.random() * (M - m) + m;
  spinner() {
    if (!this.isSpinner) {
      if (!this.angVel) this.angVel = this.rand(0.25, 0.50);
      this.isSpinner = true
      this.intervalID = window.setInterval(() => this.frame(), 1);
    } else {
      this.angVel = this.rand(0.25, 0.50);
    }
  }

  frame() {
    this.angVel *= this.friction; // Decrement velocity by friction
    this.ang += this.angVel; // Update angle
    this.ang %= this.TAU; // Normalize angle
    if (this.angVel < 0.00003) this.angVel = 0; // Bring to stop
    if (this.angVel == 0) {
      this.wheelStop();
    }
    this.rotate();
  }

  wheelStop() {
    window.clearInterval(this.intervalID);
    this.isSpinner = false;
    this.launchConfetti()
    if (!this.isChecked && this.freeText != this.lastSelection.toString()) {
      this.submitLottery();
    }
  }

  async submitLottery() {
    const number = this.sectors[this.lastSelection].label;
    const response = await lastValueFrom(this._rewardsService.postSubmit$(number, this.selectedValueType));
    if (response.code == 0) {
      console.log('แจกรางวัล : ' + number);
    }
  }

  launchConfetti() {
    confetti.create(undefined, {
      resize: true,
      useWorker: true,
    })({
      particleCount: 1000,
      spread: 300,
      origin: { y: 0.6 },
    });
  }
}

