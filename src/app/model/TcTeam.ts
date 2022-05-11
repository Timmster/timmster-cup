import { TcPlayer } from './TcPlayer';

export class TcTeam {
  players: TcPlayer[] = [];

  constructor(
    public id: number,
    public name: string,
    public shortName: string,
    public color1: string,
    public color2: string
  ) {}

  addPlayer(player: TcPlayer) {
    if (!this.players.find((p) => p.id == player.id)) {
      this.players.push(player);
    }
  }
}
