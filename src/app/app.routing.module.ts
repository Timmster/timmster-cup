import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DataComponent } from './data/data.component';

@NgModule({
  declarations: [DataComponent],

  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'data' },
      { path: 'data', component: DataComponent },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
