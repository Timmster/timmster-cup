import { Component, OnInit } from '@angular/core';
import { DATA, loadData, saveData } from '../../DB';
import { TcPlayer } from '../../model/TcPlayer';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  spieler: TcPlayer[] = [];

  constructor() {}

  ngOnInit() {}

  getSpieler() {
    return DATA.players;
  }

  getTeams() {
    return DATA.teams;
  }

  savePlan() {
    saveData();
  }

  loadPlan() {
    loadData();
  }

  update() {
    DATA.matches.forEach((m) => {
      m.playerAway1 = DATA.players.find((p) => p.id == m.playerAway1?.id);
      m.playerAway2 = DATA.players.find((p) => p.id == m.playerAway2?.id);
      m.playerHome1 = DATA.players.find((p) => p.id == m.playerHome1?.id);
      m.playerHome2 = DATA.players.find((p) => p.id == m.playerHome2?.id);
    });
  }

  newPlayer() {
    DATA.players.push(new TcPlayer('Neu' + Math.floor(Math.random() * 100)));
  }

  newPlan() {
    DATA.initAllGames();
  }

  deletePlayer(player: TcPlayer) {
    const index = DATA.players.findIndex((p) => p.id == player.id);
    if (index >= 0) {
      DATA.players.splice(index, 1);
    }
  }
}
