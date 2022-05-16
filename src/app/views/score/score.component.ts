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

  getMatches(runningFilter: boolean) {
    return DATA.matches.filter((m) => m.running == runningFilter);
  }
}
