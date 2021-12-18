import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { DealService, Promotion } from 'src/services/deal.service';
import { LeaderService } from 'src/services/leader.service';
import { LocationService } from 'src/services/location.service';
import { NotificationService } from 'src/services/notification.service';
import { UtilityService } from 'src/services/utility.service';

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.page.html',
  styleUrls: ['./my-store.page.scss'],
})
export class MyStorePage {
  promotions = [];
  promotionModel = new Promotion;
  store: any;
  promotionId = '';
  storeId = '';
  uid = '';
  locationDetails : any;
  isLoggedIn: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private utils: UtilityService,
    private locationService: LocationService,
    private leaderService: LeaderService,
    private notificationService: NotificationService,
    public dealService: DealService
  ) { }

  ionViewWillEnter() {
    this.uid = localStorage.getItem("uid");
    this.locationDetails = JSON.parse(localStorage.getItem('location'));
    this.isLoggedIn = this.authService.checkLogin();
    if(this.isLoggedIn === true){
      if (this.locationDetails.entity === 'locality'){
      localStorage.setItem('storecity', this.locationDetails.city);
      localStorage.setItem('storelocality', this.locationDetails.name);
      localStorage.setItem('storezipcode', this.locationDetails.zipcode);
      }
  }
    this.getPromotions();
    this.getStoreDetails();
  }

  getStoreDetails() {
    this.dealService.getStoreDetails().subscribe((res) => {
      this.store = res[0];
      // this.store.sort();
      console.log(this.store);
      localStorage.setItem(this.uid + 'storename', this.store.name);
      localStorage.setItem(this.uid +  'storeid', this.store.id);
      localStorage.setItem(this.uid + 'storeaddress', this.store.address);
    });
  }

  getPromotions() {
    this.dealService.getPromotions().subscribe((res) => {
      this.promotions = res;
      this.promotions.sort();
      console.log(this.promotions)
    });
  }

  addPromotion() {
    this.router.navigate(['./add-promotion']);
  }

  editPromotion(item) {
    const navigationExtras = {
      queryParams: {
        promotionId: item.id,
        type: 'edit',
      },
    };
    console.log(this.promotionId);

    this.router.navigate(["add-promotion"], navigationExtras);
  }

  editStore(item) {
    const navigationExtras = {
      queryParams: {
        storeId: item.id,
        type: 'edit',
      },
    };
    console.log(this.storeId);

    this.router.navigate(["add-store"], navigationExtras);
  }

}
