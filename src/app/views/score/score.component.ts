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

  getTeamHome(m: TcMatch) {
    return TcMatch.getTeamHome(m);
  }

  getTeamAway(m: TcMatch) {
    return TcMatch.getTeamAway(m);
  }

  getTeams() {
    const thiz = this;
    const sorter = function (m1: TcTeam, m2: TcTeam) {
      const wins1 = thiz.getHearts(m2, true)?.length;
      const wins2 = thiz.getHearts(m1, true)?.length;
      const los1 = thiz.getHearts(m2, false)?.length;
      const los2 = thiz.getHearts(m1, false)?.length;
      if (wins1 != wins2) {
        return wins1 - wins2;
      }
      if (los1 != los2) {
        return los2 - los1;
      }
      return 0;
    };
    return DATA.teams.sort(sorter);
  }

  getHearts(team: TcTeam, wins: boolean) {
    return DATA.matches.filter(
      (m) =>
        (TcMatch.getTeamHome(m)?.id == team.id &&
          m.score == TcScore.HOME &&
          wins) ||
        (TcMatch.getTeamAway(m)?.id == team.id &&
          m.score == TcScore.AWAY &&
          wins) ||
        (TcMatch.getTeamHome(m)?.id == team.id &&
          m.score == TcScore.AWAY &&
          !wins) ||
        (TcMatch.getTeamAway(m)?.id == team.id &&
          m.score == TcScore.HOME &&
          !wins)
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
