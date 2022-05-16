import { Component, OnInit } from '@angular/core';
import { DATA } from '../../DB';
import { TcScore } from '../../model/tc-score';
import { TcMatch } from '../../model/TcMatch';
import { TcTeam } from '../../model/TcTeam';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit {
  SCORES = [TcScore.HOME, TcScore.DRAW, TcScore.AWAY];

  constructor() {}

  ngOnInit() {}

  getTeams() {
    return DATA.teams;
  }

  getHearts(team: TcTeam, wins: boolean) {
    return DATA.matches.filter(
      (m) =>
        (m.getTeamHome()?.id == team.id && m.score == TcScore.HOME && wins) ||
        (m.getTeamAway()?.id == team.id && m.score == TcScore.AWAY && wins) ||
        (m.getTeamHome()?.id == team.id && m.score == TcScore.AWAY && !wins) ||
        (m.getTeamAway()?.id == team.id && m.score == TcScore.HOME && !wins)
    );
  }

  getMatchesFiltered(runningFilter: boolean) {
    return DATA.matches.filter((m) => m.running == runningFilter);
  }

  getMatches() {
    const sorter = function (m1: TcMatch, m2: TcMatch) {
      if (m1.running) {
        return -1;
      }
      if (m2.running) {
        return 1;
      }
      if (m1.score) {
        return 1;
      }
      if (m2.score) {
        return -1;
      }
      return 0;
    };
    return DATA.matches.sort(sorter);
  }

  onChangeScore(event, match: TcMatch) {
    if (match.score) {
      const nextGames = this.getMatchesFiltered(false).filter(
        (m) => m.game == match.game
      );
      if (nextGames.length > 0) {
        nextGames[0].running = true;
      }
      match.running = false;
    }
  }
}
