import { genUUID } from '../control/Helpers';

export class TcPlayer {
  id: string;

  constructor(public name: string) {
    this.id = genUUID();
  }
}
