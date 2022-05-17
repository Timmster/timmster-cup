import { Component, OnInit } from '@angular/core';
import { DATA, initAllGames, TEAMS } from '../../DB';
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

  JSON = JSON;

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
    return TEAMS.sort(sorter);
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
      match.running = false;
      let nextGames = DATA.matches.filter(
        (m) => m.game == match.game && !m.score && m.running != true
      );
      const thiz = this;
      const sorter = function (m: TcMatch, m2: TcMatch) {
        const t1 = m.playerHome1.team;
        const t2 = m.playerAway1.team;
        const running1 =
          1000 -
          thiz.getHearts(t1, true).length +
          thiz.getHearts(t1, false).length +
          thiz.getHearts(t2, true).length +
          thiz.getHearts(t2, false).length;
        //  +
        // TcTeam.countRunning(t1) +
        // TcTeam.countRunning(t2)
        const t3 = m.playerHome1.team;
        const t4 = m.playerAway1.team;
        const running2 =
          1000 -
          thiz.getHearts(t3, true).length +
          thiz.getHearts(t3, false).length +
          thiz.getHearts(t4, true).length +
          thiz.getHearts(t4, false).length;
        //  +
        // TcTeam.countRunning(t3) +
        // TcTeam.countRunning(t4)
        return running1 - running2;
      };
      nextGames = nextGames.sort(sorter);
      if (nextGames.length > 0) {
        nextGames[0].running = true;
      }
    }
  }
}
