import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { HomeOldPageRoutingModule } from './home-old-routing.module';

import { HomeOldPage } from './home-old.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule,
        HomeOldPageRoutingModule
    ],
    declarations: [HomeOldPage]
})
export class HomeOldPageModule { }
