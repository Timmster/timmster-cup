import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DataComponent } from './views/data/data.component';
import { ScoreComponent } from './views/score/score.component';

const routes: Routes = [
  { path: '', redirectTo: '/data', pathMatch: 'full' },
  { path: 'data', component: DataComponent },
  { path: 'score', component: ScoreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
