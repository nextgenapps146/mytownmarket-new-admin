import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocationService } from 'src/services/location.service';
import { UtilityService } from 'src/services/utility.service';

@Component({
  selector: 'app-requested-locations',
  templateUrl: './requested-locations.page.html',
  styleUrls: ['./requested-locations.page.scss'],
})
export class RequestedLocationsPage implements OnInit {
  uid = "";
  name = "";
  draftlocations: Array<any> = [];
  draftleaders: Array<any> = [];
  constructor(
    private locationService: LocationService,
    private utils: UtilityService,
    private alertController: AlertController,
    private route: Router
  ) { }

  ngOnInit() {
    this.uid = localStorage.getItem("uid");
    this.name = localStorage.getItem("name");
    this.getLocationsNotifications();
    this.getLeadersNotifications()
  }
  getLocationsNotifications() {
    this.locationService.getDraftlocations(this.uid).subscribe((items) => {
      this.draftlocations = items;
      console.log(this.draftlocations)
    });
  }

  getLeadersNotifications() {
    this.locationService.getDraftleaders(this.uid).subscribe((items) => {
      this.draftleaders = items;
      console.log(this.draftleaders)
    });
  }

}
