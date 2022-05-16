import { genUUID } from '../control/Helpers';
import { DATA } from '../DB';
import { TcTeam } from './TcTeam';

export class TcPlayer {
  id: string;
  public active: boolean = true;

  constructor(public name: string) {
    this.id = genUUID();
  }

  getTeam(): TcTeam {
    let team = null;
    DATA.teams.forEach((t) => {
      t.players.forEach((p) => {
        if (p.id == this.id) {
          team = t;
        }
      });
    });
    return team;
  }
}
