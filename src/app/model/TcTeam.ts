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
    if (team.nextPlayerIndex < players.length) {
      team.nextPlayerIndex++;
    } else {
      team.nextPlayerIndex = 1;
      const shuffleArray = function (inputArray) {
        inputArray.sort(() => Math.random() - 0.5);
      };
      // shuffleArray(players);
    }
    console.log('players', team.nextPlayerIndex);
    return players[team.nextPlayerIndex - 1];
  }

  static findPlayers(team: TcTeam) {
    return PLAYERS.filter((t) => t.team.id == team.id);
  }
}
