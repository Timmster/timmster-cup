import { Component } from '@angular/core';
import { TcPlayer } from './model/TcPlayer';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  spieler: TcPlayer[] = [];

  constructor() {}

  getErgebnis() {
    return localStorage.getItem('');
  }
}
