import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  randomColor() {
    const r = this.randomInt(256);
    const g = this.randomInt(256);
    const b = this.randomInt(256);

    return `rgb(${r}, ${g}, ${b})`;
  }

  private randomInt(upperBound) {
    return Math.floor(Math.random() * Math.floor(upperBound));
  }
}
