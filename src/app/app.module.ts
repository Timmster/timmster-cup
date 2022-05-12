import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { BadgeComponent } from './views/badge/badge.component';
import { DataComponent } from './views/data/data.component';
import { ScoreComponent } from './views/score/score.component';

@NgModule({
  declarations: [AppComponent, DataComponent, ScoreComponent, BadgeComponent],
  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    RouterModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
