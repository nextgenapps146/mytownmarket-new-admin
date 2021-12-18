import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeOldPage } from './home-old.page';

const routes: Routes = [
  {
    path: '',
    component: HomeOldPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeOldPageRoutingModule {}
