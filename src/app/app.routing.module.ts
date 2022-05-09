import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DataComponent } from './views/data/data.component';

const routes: Routes = [
  { path: '', redirectTo: '/data', pathMatch: 'full' },
  { path: 'data', component: DataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}