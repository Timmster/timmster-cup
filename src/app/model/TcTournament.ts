import { TcGame } from './tc-game.enum';
import { TcMatch } from './TcMatch';
import { TcPlayer } from './TcPlayer';
import { TcTeam } from './TcTeam';

export class TcTournament {
  games: TcMatch[] = [];

  constructor(public players: TcPlayer[], public teams: TcTeam[]) {}

  initGames(game: TcGame) {
    if (game == TcGame.SACKEN){
      this.games = this.games.filter(g => g.game != game);
      this.teams.forEach();
    }
  }
}
