import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <div>
    <details>
      <summary class="title">TIMMSTER CUP 2022</summary>
      <p>
        <button (click)="admin()">Admin</button>
        <a [routerLink]="['/score']">Spielplan</a>
        <a [routerLink]="['/data']">Stammdaten</a>
      </p>
    </details>
  </div>
  <router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  static ADMIN = true;

  admin() {
    AppComponent.ADMIN = !AppComponent.ADMIN;
  }
}
