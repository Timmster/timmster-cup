import { Component, OnInit } from '@angular/core';
import { DATA } from '../../DB';

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

  getMatchesFiltered(runningFilter: boolean) {
    return DATA.matches.filter((m) => m.running == runningFilter);
  }

  getMatches() {
    return this.getMatchesFiltered(true).concat(this.getMatchesFiltered(false));
  }
}
