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

      const count = this.teams.length;
      const upper: TcTeam[] = [];
      const lower: TcTeam[] = [];
      this.teams.forEach((team, index: number) => {
        if (index == 0 || index < count) {
          upper.push(team);
        } else {
          lower.push(team);
        }
      });

      upper.forEach((team, index) => {
        this.matches.push(
          TcMatch.create1on1(
            game,
            team.getNextPlayer(),
            lower[index].getNextPlayer()
          )
        );
      });
      /*
      this.teams.forEach((home, index1: number) => {
        this.teams.forEach((away, index2: number) => {
          if (index2 > index1) {
            const switchSides = (index2 + index1) % 2 == 1;
            this.matches.push(
              TcMatch.create1on1(
                game,
                switchSides ? home.getNextPlayer() : away.getNextPlayer(),
                switchSides ? away.getNextPlayer() : home.getNextPlayer()
              )
            );
          }
        });
      });*/
    }
  }
}
