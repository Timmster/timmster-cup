import { genUUID } from '../control/Helpers';
import { TcTeam } from './TcTeam';

export class TcPlayer {
  id: string;
  public team: TcTeam;

  constructor(public name: string) {
    this.id = genUUID();
  }
}
