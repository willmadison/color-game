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
  private gameStateEnum = GameState;
  private currentState = GameState.NewGame;

  private colors: any;
  private goalColor: string;

  private message: string;

  constructor(private colorService: ColorService) {
    this.reset();
  }

  private reset() {
    this.currentState = GameState.NewGame;
    this.message = '';

    this.generateColors();
    this.pickGoalColor();
  }

  private generateColors() {
    this.colors = [];

    for (let i = 0; i < 6; i++) {
      this.colors[i] = this.colorService.randomColor();
    }
  }

  private pickGoalColor(): void {
    let index = Math.floor(Math.random() * this.colors.length);
    this.goalColor = this.colors[index];
  }

  private clickColor(color: string, index: number): void {
    if (color == this.goalColor) {
      this.handleSuccess(color);
    } else {
      this.handleFailure(index);
    }
  }

  private handleSuccess(color: string) {
    this.currentState = GameState.Correct;
    this.message = 'Correct!';

    this.changeAllColors(color);
  }

  private changeAllColors(color: string): void {
    for (let i: number = 0; i < this.colors.length; i++) {
      this.colors[i] = color;
    }
  }

  private handleFailure(index: number) {
    this.currentState = GameState.Incorrect;
    this.colors[index] = 'transparent';
    this.message = 'Try Again';
  }
}
