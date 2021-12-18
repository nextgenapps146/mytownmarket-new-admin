import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPromotionPageRoutingModule } from './search-promotion-routing.module';

import { SearchPromotionPage } from './search-promotion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPromotionPageRoutingModule
  ],
  declarations: [SearchPromotionPage]
})
export class SearchPromotionPageModule {}
