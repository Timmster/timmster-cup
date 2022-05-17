import { TEAMS } from '../DB';
import { TcGame } from './tc-game.enum';
import { TcMatch } from './TcMatch';
import { TcPlayer } from './TcPlayer';
import { TcTeam } from './TcTeam';

export class TcTournament {
  matches: TcMatch[] = [];

  constructor(public players: TcPlayer[]) {}

  initAllGames() {
    this.initGames(TcGame.SACKEN);
    this.initGames(TcGame.KICKERN);
    this.initGames(TcGame.TIPPKICK);
    this.initGames(TcGame.MARIO_KART);
    this.initGames(TcGame.FIFA);
    // this.initGames(TcGame.LOOPING_LOUIE);
  }

  initGames(game: TcGame) {
    this.matches = this.matches.filter((g) => g.game != game);
    if (game == TcGame.SACKEN) {
      for (let season = 0; season < 5; season++) {
        for (let day = 1; day < TEAMS.length; day++) {
          this.createGamesForDay(day, TcGame.SACKEN, 1, false);
        }
      }
    } else if (game == TcGame.FIFA) {
      for (let day = 1; day < TEAMS.length; day++) {
        this.createGamesForDay(day, TcGame.FIFA, 1, true);
      }
    } else if (game == TcGame.KICKERN) {
      for (let day = 1; day < TEAMS.length; day++) {
        this.createGamesForDay(day, TcGame.KICKERN, 1, true);
      }
    } else if (game == TcGame.TIPPKICK) {
      for (let season = 0; season < 2; season++) {
        for (let day = 1; day < TEAMS.length; day++) {
          this.createGamesForDay(day, TcGame.TIPPKICK, 1, false);
        }
      }
    } else if (game == TcGame.MARIO_KART) {
      for (let day = 1; day < TEAMS.length; day++) {
        this.createGamesForDay(day, TcGame.MARIO_KART, 1, true);
      }
    }
  }

  createGamesForDay(day: number, game: TcGame, sets: number, is2On2: boolean) {
    const count = TEAMS.length;
    const half = count / 2;
    const rows = [];
    TEAMS.forEach((team, index) => {
      if (index == 0 || index < half - day + 1 || index > count - day) {
        rows.push(team);
      }
    });
    TEAMS.forEach((team, index) => {
      if (!rows.find((t) => t.id == team.id)) {
        rows.splice(half, 0, team);
      }
    });
    rows.forEach((team, index) => {
      if (index < half) {
        for (let set = 0; set < sets; set++) {
          let home1 = TcTeam.getNextPlayer(team);
          let away1 = TcTeam.getNextPlayer(rows[index + half]);
          if (index == 0 && day % 2 == 0) {
            const swap = home1;
            home1 = away1;
            away1 = swap;
          }
          if (!is2On2) {
            this.matches.push(TcMatch.create1on1(game, home1, away1));
          } else {
            let home2 = TcTeam.getNextPlayer(team);
            let away2 = TcTeam.getNextPlayer(rows[index + half]);
            if (index == 0 && day % 2 == 0) {
              const swap = home2;
              home2 = away2;
              away2 = swap;
            }
            this.matches.push(
              TcMatch.create2on2(game, home1, home2, away1, away2)
            );
          }
        }
      }
    });
  }
}
