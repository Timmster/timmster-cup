import { DATA, PLAYERS } from '../DB';
import { TcPlayer } from './TcPlayer';

export class TcTeam {
  public nextPlayerIndex = 0;
  public lastPlayerIndexStart = 0;

  constructor(
    public id: number,
    public name: string,
    public shortName: string,
    public color1: string,
    public color2: string
  ) {}

  static findPlayers(team: TcTeam): TcPlayer[] {
    return PLAYERS.filter((t) => t.team.id == team.id);
  }

  static countRunning(team: TcTeam) {
    return DATA.matches
      .filter((m) => m.running)
      .filter(
        (m) =>
          m.playerAway1.team.id == team.id || m.playerHome1.team.id == team.id
      ).length;
  }
}
