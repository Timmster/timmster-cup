import { PLAYERS } from '../DB';

export class TcTeam {
  private nextPlayerIndex = 0;
  private nextPlayerIndexRandom = 0;

  constructor(
    public id: number,
    public name: string,
    public shortName: string,
    public color1: string,
    public color2: string
  ) {}

  static getNextPlayer(team: TcTeam) {
    const players = this.findPlayers(team);
    if (team.nextPlayerIndex < players.length) {
      team.nextPlayerIndex++;
    } else {
      team.nextPlayerIndex = 1;
      team.nextPlayerIndexRandom = Math.floor(Math.random() * players.length);
    }
    let index = team.nextPlayerIndex - 1 + team.nextPlayerIndexRandom;
    if (index >= players.length) {
      index = index - players.length;
    }
    return players[index];
  }

  static findPlayers(team: TcTeam) {
    return PLAYERS.filter((t) => t.team.id == team.id);
  }
}
