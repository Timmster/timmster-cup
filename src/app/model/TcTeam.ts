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

  addPlayer(player: TcPlayer) {
    if (!this.players.find((p) => p.id == player.id)) {
      this.players.push(player);
    }
    this.nextPlayerIndex = Math.floor(Math.random() * this.players.length);
  }

  getNextPlayer() {
    this.nextPlayerIndex++;
    if (this.nextPlayerIndex >= this.players.length) {
      this.nextPlayerIndex = 0;
    }
    return this.players[this.nextPlayerIndex];
  }
}
