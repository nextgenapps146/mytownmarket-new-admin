import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLeaderPageRoutingModule } from './add-leader-routing.module';

import { AddLeaderPage } from './add-leader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLeaderPageRoutingModule
  ],
  declarations: [AddLeaderPage]
})
export class AddLeaderPageModule {}
