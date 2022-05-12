import { TcGame } from './tc-game.enum';
import { TcMatch } from './TcMatch';
import { TcPlayer } from './TcPlayer';
import { TcTeam } from './TcTeam';

export class TcTournament {
  matches: TcMatch[] = [];

  constructor(public players: TcPlayer[], public teams: TcTeam[]) {}

  initAllGames() {
    this.initGames(TcGame.SACKEN);
    this.initGames(TcGame.FIFA);
    this.initGames(TcGame.KICKERN);
    this.initGames(TcGame.LOOPING_LOUIE);
    this.initGames(TcGame.MARIO_KART);
    this.initGames(TcGame.TIPPKICK);
  }

  initGames(game: TcGame) {
    this.matches = this.matches.filter((g) => g.game != game);
    if (game == TcGame.SACKEN) {
      for (let day = 1; day < this.teams.length; day++) {
        this.createGamesForDay(day, TcGame.SACKEN, 5, false);
      }
    } else if (game == TcGame.FIFA) {
      for (let day = 1; day < this.teams.length; day++) {
        this.createGamesForDay(day, TcGame.FIFA, 1, true);
      }
    }
  }

  createGamesForDay(day: number, game: TcGame, sets: number, is2On2: boolean) {
    const count = this.teams.length;
    const half = count / 2;
    const rows = [];
    this.teams.forEach((team, index) => {
      if (index == 0 || index < half - day + 1 || index > count - day) {
        rows.push(team);
      }
    });
    this.teams.forEach((team, index) => {
      if (!rows.find((t) => t.id == team.id)) {
        rows.splice(half, 0, team);
      }
    });
    rows.forEach((team, index) => {
      if (index < half) {
        for (let set = 0; set < sets; set++) {
          let home = team.getNextPlayer();
          let away = rows[index + half].getNextPlayer();
          if (index == 0 && day % 2 == 0) {
            const swap = home;
            home = away;
            away = swap;
          }
          this.matches.push(TcMatch.create1on1(game, home, away));
        }
      }
    });
  }
}
