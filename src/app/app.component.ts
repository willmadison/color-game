import {Component} from '@angular/core';
import {ColorService} from "./color.service";

export enum GameState {
  NewGame = 0,
  Incorrect,
  Correct
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ColorService]
})
export class AppComponent {
  private readonly hardNumSquares = 6;
  private readonly easyNumSquares = 3;
  private numSquares: number = this.hardNumSquares;

  private gameStateEnum = GameState;
  private currentState = GameState.NewGame;
  private message: string;

  private colors: any;
  private goalColor: string;

  constructor(private colorService: ColorService) {
    this.reset();
  }

  private reset(): void {
    this.currentState = GameState.NewGame;
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
    let index = Math.floor(Math.random() * this.colors.length);
    this.goalColor = this.colors[index];
  }

  private changeMode(numSquares: number): void {
    this.numSquares = numSquares;
    this.reset();
  }

  private clickColor(color: string, index: number): void {
    if (color == this.goalColor) {
      this.handleSuccess(color);
    } else {
      this.handleFailure(index);
    }
  }

  private handleSuccess(color: string): void {
    this.currentState = GameState.Correct;
    this.message = 'Correct!';

    this.changeAllColors(color);
  }

  private changeAllColors(color: string): void {
    for (let i: number = 0; i < this.colors.length; i++) {
      this.colors[i] = color;
    }
  }

  private handleFailure(index: number): void {
    this.currentState = GameState.Incorrect;
    this.colors[index] = 'transparent';
    this.message = 'Try Again';
  }
}
