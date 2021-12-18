import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLeaderPage } from './add-leader.page';

const routes: Routes = [
  {
    path: '',
    component: AddLeaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLeaderPageRoutingModule {}
