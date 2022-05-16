import { genUUID } from '../control/Helpers';
import { TcPlayer } from './TcPlayer';

export class TcTeam {
  private nextPlayerIndex = 0;
  players: TcPlayer[] = [];
  public id: string;

  constructor(
    public name: string,
    public shortName: string,
    public color1: string,
    public color2: string
  ) {
    this.id = genUUID();
  }

  static addPlayer(team: TcTeam, player: TcPlayer) {
    if (!team.players.find((p) => p.id == player.id)) {
      team.players.push(player);
    }
    team.nextPlayerIndex = Math.floor(Math.random() * team.players.length);
  }

  static getNextPlayer(team: TcTeam) {
    team.nextPlayerIndex++;
    if (team.nextPlayerIndex >= team.players.length) {
      team.nextPlayerIndex = 0;
    }
    return team.players[team.nextPlayerIndex];
  }
}
