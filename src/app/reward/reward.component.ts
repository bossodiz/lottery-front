import { Component } from '@angular/core';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrl: './reward.component.css'
})
export class RewardComponent {

  constructor() {
  }

  spin: any

  winner!: ''

  colors = ["#f82", "#0bf"];
  sectors: any[] = [
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },
    { color: this.colors[0], label: '155676' },
    { color: this.colors[1], label: '536154' },
    { color: this.colors[0], label: '101010' },
    { color: this.colors[1], label: '123141' },

  ];

  rand = (m: number, M: number) => Math.random() * (M - m) + m;
  tot!: number;
  ctx!: any;
  dia!: number;
  rad!: number;
  PI!: number;
  TAU!: number;
  arc0!: number;

  winners = [];

  modeDelete = true;

  friction = 0.997; // 0.995=soft, 0.99=mid, 0.98=hard
  angVel = 0; // Angular velocity
  ang = 0; // Angle in radians
  lastSelection!: number;

  isSpinner: boolean = false;

  ngDoCheck(): void {
    this.engine();
  }

  engine() {
    requestAnimationFrame(this.frame.bind(this));
  }

  ngOnInit() {
    this.createWheel();
  }

  createWheel() {
    this.spin = document.getElementById("spin");
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

  spinner() {
    if (!this.angVel) this.angVel = this.rand(0.25, 0.35);
    this.isSpinner = true
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
    this.spin.textContent = !this.angVel ? "spin (" + this.sectors.length + ")" : sector.label;
    if (this.isSpinner) {
      this.spin.textContent = sector.label;
      this.winner = sector.label;
    }
    if (!first) {
      this.lastSelection = !this.angVel ? this.lastSelection : this.getIndex();
    }
    this.spin.style.background = sector.color;
  }

  frame() {
    if (!this.angVel) return;
    this.angVel *= this.friction; // Decrement velocity by friction
    if (this.angVel < 0.0002) this.angVel = 0; // Bring to stop
    this.ang += this.angVel; // Update angle
    this.ang %= this.TAU; // Normalize angle
    this.rotate();
  }
}
