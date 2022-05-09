import { Component } from '@angular/core';
import { PLAYERS } from './data/DB';
import { TcPlayer } from './model/TcPlayer';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  spieler: TcPlayer[] = [];

  constructor() {}

  getSpieler() {
    return PLAYERS;
  }
}
