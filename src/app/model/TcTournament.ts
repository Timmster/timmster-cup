import { TcGame } from './tc-game.enum';
import { TcMatch } from './TcMatch';
import { TcPlayer } from './TcPlayer';
import { TcTeam } from './TcTeam';

export class TcTournament {
  matches: TcMatch[] = [];

  constructor(public players: TcPlayer[], public teams: TcTeam[]) {}

  initGames(game: TcGame) {
    if (game == TcGame.SACKEN) {
      this.matches = this.matches.filter((g) => g.game != game);
      this.teams.forEach((home) => {
        this.teams.forEach((away) => {
          if (home.id != away.id) {
            this.matches.push(
              TcMatch.create1on1(
                game,
                home.getNextPlayer(),
                away.getNextPlayer()
              )
            );
          }
        });
      });
    }
  }
}
