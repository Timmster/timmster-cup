import { genUUID } from '../control/Helpers';
import { TcTeam } from './TcTeam';

export class TcPlayer {
  id: string;
  public active: boolean = false;
  public team: TcTeam;

  constructor(public name: string) {
    this.id = genUUID();
  }
}
