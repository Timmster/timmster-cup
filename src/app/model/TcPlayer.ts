import { genUUID } from '../control/Helpers';

export class TcPlayer {
  id: string;
  name: string;

  constructor() {
    this.id = genUUID();
  }
}
