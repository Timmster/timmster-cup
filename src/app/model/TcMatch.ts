import { TcGame } from './tc-game.enum';
import { TcScore } from './tc-score';
import { TcPlayer } from './TcPlayer';

export class TcMatch {
  running: boolean = false;
  playerHome1: TcPlayer;
  playerAway1: TcPlayer;
  playerHome2: TcPlayer;
  playerAway2: TcPlayer;
  score: TcScore;

  private constructor(public game: TcGame) {}

  static create1on1(game: TcGame, playerHome: TcPlayer, playerAway: TcPlayer) {
    const match = new TcMatch(game);
    match.playerHome1 = playerHome;
    match.playerAway1 = playerAway;
    return match;
  }

  static create2on2(
    game: TcGame,
    playerHome1: TcPlayer,
    playerHome2: TcPlayer,
    playerAway1: TcPlayer,
    playerAway2: TcPlayer
  ) {
    const match = new TcMatch(game);
    match.playerHome1 = playerHome1;
    match.playerAway1 = playerAway1;
    match.playerHome2 = playerHome2;
    match.playerAway2 = playerAway2;
    return match;
  }
}
