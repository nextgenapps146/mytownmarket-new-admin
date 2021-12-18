import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLocalityPageRoutingModule } from './add-locality-routing.module';

import { AddLocalityPage } from './add-locality.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLocalityPageRoutingModule
  ],
  declarations: [AddLocalityPage]
})
export class AddLocalityPageModule {}
