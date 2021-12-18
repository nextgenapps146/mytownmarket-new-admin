import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CategoryService } from 'src/services/category.service';
import { DealService } from 'src/services/deal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage {
 
  isLoggedIn = false;
  uid = '';
  locationDetails: any;
  promotions = [];
  stores = [];
  selectLocation = '';
  locationsList = [];
  originalList = [];
  role = "";
  category = "";
  categories = [];

  constructor(
    private dealService: DealService,
    private route: Router,
    private categoryService: CategoryService,
    private authService: AuthService
  ) { }

  

  ionViewWillEnter() {   
    this.uid = localStorage.getItem("uid");
    this.locationDetails = JSON.parse(localStorage.getItem('location'));
    console.log(this.locationDetails);

    if(this.locationDetails !== null) {
      this.selectLocation = this.locationDetails.name;
   
      this.isLoggedIn = this.dealService.checkLogin();
      this.getPromotions();
      this.getStores();
      this.getCategories();
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

  getStores() {
    this.dealService.getStoreswithlocality(this.selectLocation).subscribe((res) => {
      this.stores = res;
      this.stores.sort();
      console.log(this.stores)
    });
  }

  getCategories() {
    this.categories = this.categoryService.getCategories();
  }

  changeLocation() {
    this.route.navigate(['./location']);
  }

  gotoCategories(item) {
    const navigationExtras = {
      queryParams: {category: item},
    };
    console.log(this.category);
    this.route.navigate(["search-promotion"], navigationExtras);
  }

  gotoStores() {
    this.route.navigate(["stores"]);
  }

}
