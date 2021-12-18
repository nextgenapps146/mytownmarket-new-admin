import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';
import { PopovermodelComponent } from './popovermodel/popovermodel.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule
    ],
    declarations: [
        PopovermodelComponent
    ],
    exports: [
        PopovermodelComponent
    ]
})

export class ComponentsModule { }
