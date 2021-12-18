import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { LeaderPageRoutingModule } from './leader-routing.module';

import { LeaderPage } from './leader.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule,
        ComponentsModule,
        LeaderPageRoutingModule
    ],
    declarations: [LeaderPage]
})
export class LeaderPageModule { }
