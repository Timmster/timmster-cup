import { Component, OnInit } from '@angular/core';
import {
  DATA,
  initAllGames,
  loadData,
  saveData,
  TEAMS,
  SAVEGAMES,
} from '../../DB';
import { TcPlayer } from '../../model/TcPlayer';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  SAVEGAMES = SAVEGAMES;
  savegame: string;
  byClub = false;

  spieler: TcPlayer[] = [];

  constructor() {}

  ngOnInit() {}

  getSpieler() {
    let sorter = function (a: TcPlayer, b: TcPlayer) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    };
    if (this.byClub) {
      sorter = function (a: TcPlayer, b: TcPlayer) {
        if (a.team.id < b.team.id) {
          return -1;
        }
        if (a.team.id > b.team.id) {
          return 1;
        }
        return 0;
      };
    }
    return DATA.players.sort(sorter);
  }

  getTeams() {
    return TEAMS;
  }

  savePlan() {
    saveData();
  }

  loadPlan() {
    loadData(this.savegame);
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
    initAllGames();
  }

  deletePlayer(player: TcPlayer) {
    const index = DATA.players.findIndex((p) => p.id == player.id);
    if (index >= 0) {
      DATA.players.splice(index, 1);
    }
  }
}
