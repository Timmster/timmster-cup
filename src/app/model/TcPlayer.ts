import { genUUID } from '../control/Helpers';
import { DATA } from '../DB';
import { TcTeam } from './TcTeam';

export class TcPlayer {
  id: string;
  public active: boolean = true;

  constructor(public name: string) {
    this.id = genUUID();
  }

  static getTeam(player: TcPlayer): TcTeam {
    let team = null;
    DATA.teams.forEach((t) => {
      t.players.forEach((p) => {
        if (p.id == player.id) {
          team = t;
        }
      });
    });
    return team;
  }
}
