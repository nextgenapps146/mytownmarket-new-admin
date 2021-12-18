import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPromotionPageRoutingModule } from './add-promotion-routing.module';

import { AddPromotionPage } from './add-promotion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPromotionPageRoutingModule
  ],
  declarations: [AddPromotionPage]
})
export class AddPromotionPageModule {}
