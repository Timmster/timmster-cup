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
    if (game == TcGame.SACKEN) {
      this.matches = this.matches.filter((g) => g.game != game);
      this.createGamesForDay(1, TcGame.SACKEN);
      this.createGamesForDay(2, TcGame.SACKEN);
      this.createGamesForDay(3, TcGame.SACKEN);
    }
  }

  createGamesForDay(day: number, game: TcGame) {
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
        this.matches.push(
          TcMatch.create1on1(
            game,
            team.getNextPlayer(),
            rows[index + half].getNextPlayer()
          )
        );
      }
    });
  }
}
