import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestedLocationsPageRoutingModule } from './requested-locations-routing.module';

import { RequestedLocationsPage } from './requested-locations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestedLocationsPageRoutingModule
  ],
  declarations: [RequestedLocationsPage]
})
export class RequestedLocationsPageModule {}
