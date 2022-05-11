import { TcPlayer } from './TcPlayer';

export class TcTeam {
  players: TcPlayer[] = [];

  constructor(
    id: number,
    public name: string,
    shortName: string,
    color1: string,
    color2: string
  ) {}

  addPlayer(player: TcPlayer) {
    if (!this.players.find((p) => p.id == player.id)) {
      this.players.push(player);
    }
  }
}
