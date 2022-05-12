import { Component, Input, OnInit, Output } from '@angular/core';
import { DATA } from '../../DB';
import { TcGame } from '../../model/tc-game.enum';
import { TcPlayer } from '../../model/TcPlayer';
import { TcTeam } from '../../model/TcTeam';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
})
export class BadgeComponent implements OnInit {
  @Input()
  game: TcGame;
  @Input()
  player1: TcPlayer;
  @Input()
  player2: TcPlayer;
  team: TcTeam;

  constructor() {}

  ngOnInit() {
    if (this.player1) {
      DATA.teams.forEach((t) => {
        t.players.forEach((p) => {
          if (p.id === this.player1.id) {
            this.team = t;
          }
        });
      });
    }
  }

  gameTitle() {
    if (this.game == TcGame.SACKEN) {
      return 'Sacken';
    } else if (this.game == TcGame.FIFA) {
      return 'FIFA';
    } else if (this.game == TcGame.KICKERN) {
      return 'Kickern';
    } else if (this.game == TcGame.LOOPING_LOUIE) {
      return 'Looping Louie';
    } else if (this.game == TcGame.MARIO_KART) {
      return 'Mario Kart';
    } else if (this.game == TcGame.TIPPKICK) {
      return 'Tippkick';
    }
    return '';
  }
}
