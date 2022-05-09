import { Component, OnInit } from '@angular/core';
import { DATA } from '../../DB';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  getData() {
    return DATA;
  }
}
