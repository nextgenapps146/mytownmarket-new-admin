import {
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/services/utility.service';

@Component({
    selector: 'app-personal-details',
    templateUrl: './personal-details.component.html',
    styleUrls: ['./personal-details.component.scss'],
})

export class PersonalDetailsComponent implements OnInit, OnDestroy {

    routerSub: Subscription;

    constructor(public utils: UtilityService, private route: ActivatedRoute) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.routerSub.unsubscribe();
    }
}
