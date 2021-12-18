import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartyService } from 'src/services/party.service';
import { SchemeService } from 'src/services/scheme.service';
import { UtilityService } from 'src/services/utility.service';

@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.page.html',
  styleUrls: ['./scheme.page.scss'],
})
export class SchemePage implements OnInit {
  locationDetails: any;
  partyInfo: any;

  constructor(
    private schemeSevices: SchemeService,
    public utils: UtilityService,
    private route: Router
  ) { }

  ngOnInit() {
    const path = this.route.url;
    const partyId = path.split('/scheme/');
    if (partyId && partyId.length > 1) {
      this.locationDetails = JSON.parse(localStorage.getItem('location'));
      this.getStoreInfo(partyId[1]);
    }
  }

  getStoreInfo(partyId): void {
    this.schemeSevices.getSchemeDetails(partyId).then((data) => {
      data.subscribe((info) => {
        if (info !== undefined) {
          this.partyInfo = info;
        }
      });
    });
    console.log(this.partyInfo);

  }

}
