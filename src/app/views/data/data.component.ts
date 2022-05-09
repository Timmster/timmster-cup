import { Component, OnInit } from '@angular/core';
import { DATA, saveData } from '../../DB';
import { TcPlayer } from '../../model/TcPlayer';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
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

  newPlayer() {
    DATA.players.push(new TcPlayer('Neu' + Math.floor(Math.random() * 100)));
  }

  deletePlayer(player: TcPlayer) {
    const index = DATA.players.findIndex((p) => p.id == player.id);
    if (index >= 0) {
      DATA.players.splice(index, 1);
    }
  }
  ngOnInit() {}
}
