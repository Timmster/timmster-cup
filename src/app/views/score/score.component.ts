import { Component, OnInit } from '@angular/core';
import { DATA } from '../../DB';
import { TcPlayer } from '../../model/TcPlayer';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  getTeams() {
    return DATA.teams;
  }

  getMatches() {
    return DATA.matches;
  }

  findTeam(s: TcPlayer) {
    let team = null;
    DATA.teams.forEach((t) => {
      t.players.forEach((p) => {
        if (p.id === s.id) {
          console.log(p, s);
          team = t;
        }
      });
    });
    return team;
  }
}
