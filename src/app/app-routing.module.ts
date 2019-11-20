import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HometweetsComponent } from '../app/components/hometweets/hometweets.component';


const routes: Routes = [
  { path: 'tweets/:tipo', component: HometweetsComponent },

  { path: 'tweets/:tipo/:page', component: HometweetsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
