import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DATA, TEAMS } from '../../DB';
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

  @Input() player1: TcPlayer;
  @Output() player1Change = new EventEmitter<TcPlayer>();

  @Input() player2: TcPlayer;
  @Output() player2Change = new EventEmitter<TcPlayer>();

  @Input()
  team: TcTeam;

  editingPlayer = 0;

  constructor() {}

  ngOnInit() {
    if (this.player1) {
      this.team = this.player1.team;
    }
  }

  changePlayer1(event) {
    this.editingPlayer = 0;
    this.player1Change.emit(this.player1);
  }

  changePlayer2(event) {
    this.editingPlayer = 0;
    this.player2Change.emit(this.player2);
  }

  getPlayers(team1: TcTeam) {
    return TcTeam.findPlayers(team1);
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
