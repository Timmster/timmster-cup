import { PLAYERS } from '../DB';

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

  static findPlayers(team: TcTeam) {
    return PLAYERS.filter((t) => t.team.id == team.id);
  }
}
