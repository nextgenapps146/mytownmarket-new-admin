import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLocalityPage } from './add-locality.page';

const routes: Routes = [
  {
    path: '',
    component: AddLocalityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLocalityPageRoutingModule {}
