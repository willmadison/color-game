import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private colors : any;
  private goalColor : string;

  constructor() {
    this.colors = [
      'rgb(255, 0, 0)',
      'rgb(255, 255, 0)',
      'rgb(0, 255, 0)',
      'rgb(0, 255, 255)',
      'rgb(0, 0, 255)',
      'rgb(255, 0, 255)'
    ];

    this.goalColor = this.colors[3];
  }
}
