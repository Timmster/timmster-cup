import { Component, Input, OnInit, Output } from '@angular/core';
import { DATA } from '../../DB';
import { TcPlayer } from '../../model/TcPlayer';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
})
export class BadgeComponent implements OnInit {
  @Input()
  player: TcPlayer;

  constructor() {}

  ngOnInit() {}

  findTeam(s: TcPlayer) {
    let team = null;
    DATA.teams.forEach((t) => {
      t.players.forEach((p) => {
        if (p.id === s.id) {
          console.log(p, s);
          team = t;
        }
      });
    });
    return team;
  }
}
