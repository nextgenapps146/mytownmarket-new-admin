import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popovermodel',
  templateUrl: './popovermodel.component.html',
  styleUrls: ['./popovermodel.component.scss'],
})
export class PopovermodelComponent implements OnInit {
  uid = '';
  // notifications = [];
  @Input() notifications: Array<any>;
  constructor(
    private route: Router,
    private popCtrl: PopoverController
  ) { }

  ngOnInit() {
    this.uid = localStorage.getItem("uid");
  }

  gotoRequestedLocation() {
    this.popCtrl.dismiss();
    this.route.navigate(["requested-locations"]);
  }
}
