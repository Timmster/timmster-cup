import { PLAYERS } from '../DB';

export class TcTeam {
  private nextPlayerIndex = 0;

  constructor(
    public id: number,
    public name: string,
    public shortName: string,
    public color1: string,
    public color2: string
  ) {}

  static getNextPlayer(team: TcTeam) {
    const players = this.findPlayers(team);
    team.nextPlayerIndex++;
    if (team.nextPlayerIndex >= players.length) {
      team.nextPlayerIndex = 0;
      const shuffleArray = function (inputArray) {
        inputArray.sort(() => Math.random() - 0.5);
      };
      shuffleArray(players);
    }
    return players[team.nextPlayerIndex];
  }

  static findPlayers(team: TcTeam) {
    return PLAYERS.find((t) => t.team.id == team.id);
  }
}
