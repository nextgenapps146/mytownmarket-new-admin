import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartyService } from '../../services/party.service';
import { UtilityService } from '../../services/utility.service';

@Component({
    selector: 'app-party',
    templateUrl: './party.page.html',
    styleUrls: ['./party.page.scss'],
})

export class PartyPage implements OnInit {

    locationDetails: any;
    partyInfo: any;

    constructor(
        private route: Router,
        private partyService: PartyService,
        public utils: UtilityService
    ) { }

    ngOnInit() {
        const path = this.route.url;
        const leaderId = path.split('/party/');
        if (leaderId && leaderId.length > 1) {
            this.locationDetails = JSON.parse(localStorage.getItem('location'));
            this.getStoreInfo(leaderId[1]);
        }
    }

    getStoreInfo(partyId): void {
        this.partyService.getPartyDetails(partyId).then((data) => {
            data.subscribe((info) => {
                if (info !== undefined) {
                    this.partyInfo = info;
                }
            });
        });
        console.log(this.partyInfo);

    }

}
