import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaderService } from '../../services/leader.service';
import { UtilityService } from '../../services/utility.service';

@Component({
    selector: 'app-leader',
    templateUrl: './leader.page.html',
    styleUrls: ['./leader.page.scss'],
})

export class LeaderPage implements OnInit {

    locationDetails: any;
    leaderInfo: any;

    constructor(
        private route: Router,
        private leaderService: LeaderService,
        public utils: UtilityService
    ) { }

    ngOnInit() {
        const path = this.route.url;
        const leaderId = path.split('/leader/');
        if (leaderId && leaderId.length > 1) {
            this.locationDetails = JSON.parse(localStorage.getItem('location'));
            this.getStoreInfo(leaderId[1]);
        }
    }

    getStoreInfo(leaderId): void {
        this.leaderService.getLeaderDetails(leaderId).then((data) => {
            data.subscribe((info) => {
                if (info !== undefined) {
                    this.leaderInfo = info;
                }
            });
        });
    }

}
