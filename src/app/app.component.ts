import { Component } from '@angular/core';
import { DATA, saveData } from './data/DB';
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
    return DATA.players;
  }

  getTeams() {
    return DATA.teams;
  }

  save() {
    saveData();
  }
}
