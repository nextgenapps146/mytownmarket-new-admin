import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { PartyPageRoutingModule } from './party-routing.module';

import { PartyPage } from './party.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule,
        ComponentsModule,
        PartyPageRoutingModule
    ],
    declarations: [PartyPage]
})
export class PartyPageModule { }
