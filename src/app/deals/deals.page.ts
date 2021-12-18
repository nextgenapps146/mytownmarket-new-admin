import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DealService } from 'src/services/deal.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.page.html',
  styleUrls: ['./deals.page.scss'],
})

export class DealsPage {
  isLoggedIn = false;
  uid = '';
  locationDetails: any;
  promotions = [];
  selectLocation = '';
  locationsList = [];
  originalList = [];
  category : any;

  constructor(
    private dealService: DealService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  
  ionViewWillEnter() {
    this.locationDetails = JSON.parse(localStorage.getItem('location'));
    console.log(this.locationDetails);
    this.activatedRoute.queryParams.subscribe((params) => {
      this.category = params['category'];
      console.log(this.category);
    });
    
    if(this.locationDetails !== null){
      this.selectLocation = this.locationDetails.name;
      this.uid = localStorage.getItem("uid");
      this.isLoggedIn = this.dealService.checkLogin();
      this.getPromotions();
    }
  }

  
  searchPromotion(){
    this.route.navigate(['./search-promotion']);
  }

  getPromotions() {
    this.dealService.getPromotionswithlocality(this.selectLocation).subscribe((res) => {
      this.promotions = res;
      this.promotions.sort();
      console.log(this.promotions)
    });
  }

  changeLocation() {
    this.route.navigate(['./location']);
  }

}
