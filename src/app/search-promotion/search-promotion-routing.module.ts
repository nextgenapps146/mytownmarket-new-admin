import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPromotionPage } from './search-promotion.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPromotionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPromotionPageRoutingModule {}
