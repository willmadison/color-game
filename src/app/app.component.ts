import {Component} from '@angular/core';
import {ColorService} from './color.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ColorService]
})
export class AppComponent {
  private readonly hardNumSquares = 6;
  private readonly easyNumSquares = 3;

  private numSquares: number = this.hardNumSquares;
  private squares = Array.from(Array(this.hardNumSquares).keys());

  private colors: any;
  private goalColor: string;

  private message: string;
  private hasWon = false;

  constructor(private colorService: ColorService) {
    this.reset();
  }

  private reset(): void {
    this.hasWon = false;
    this.message = '';

    this.generateColors();
    this.pickGoalColor();
  }

  private generateColors() {
    this.colors = [];

    for (let i = 0; i < this.numSquares; i++) {
      this.colors[i] = this.colorService.randomColor();
    }
  }

  private pickGoalColor(): void {
    const index = Math.floor(Math.random() * this.colors.length);
    this.goalColor = this.colors[index];
  }

  private changeMode(numSquares: number): void {
    this.numSquares = numSquares;
    this.reset();
  }

  private clickColor(index: number): void {
    const color = this.colors[index];

    if (color === this.goalColor) {
      this.handleSuccess(color);
    } else {
      this.handleFailure(index);
    }
  }

  private handleSuccess(color: string): void {
    this.hasWon = true;
    this.message = 'Correct!';

    this.changeAllColors(color);
  }

  private changeAllColors(color: string): void {
    for (let i = 0; i < this.colors.length; i++) {
      this.colors[i] = color;
    }
  }

  private handleFailure(index: number): void {
    this.colors[index] = 'transparent';
    this.message = 'Try Again';
  }
}
