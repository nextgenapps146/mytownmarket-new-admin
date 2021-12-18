import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestedLocationsPage } from './requested-locations.page';

const routes: Routes = [
  {
    path: '',
    component: RequestedLocationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestedLocationsPageRoutingModule {}
