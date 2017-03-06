import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private colors: any;
  private goalColor: string;

  private message: string;

  constructor() {
    this.colors = [
      'rgb(255, 0, 0)',
      'rgb(255, 255, 0)',
      'rgb(0, 255, 0)',
      'rgb(0, 255, 255)',
      'rgb(0, 0, 255)',
      'rgb(255, 0, 255)'
    ];

    this.pickGoalColor();
  }

  private pickGoalColor(): void {
    let index = Math.floor(Math.random() * this.colors.length);
    this.goalColor = this.colors[index];
  }

  private clickColor(color: string, index: number): void {
    if (color == this.goalColor) {
      this.message = 'Correct!';
      this.changeAllColors(color);
    } else {
      this.colors[index] = 'transparent';
      this.message = 'Try Again';
    }
  }

  private changeAllColors(color: string): void {
    for (let i: number = 0; i < this.colors.length; i++) {
      this.colors[i] = color;
    }
  }
}
