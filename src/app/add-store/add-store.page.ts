import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { DealService, Store } from 'src/services/deal.service';
import { LeaderService } from 'src/services/leader.service';
import { LocationService } from 'src/services/location.service';
import { NotificationService } from 'src/services/notification.service';
import { UtilityService } from 'src/services/utility.service';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.page.html',
  styleUrls: ['./add-store.page.scss'],
})
export class AddStorePage implements OnInit {
  isFormSubmitted = false;
  isLoggedIn = false;
  name = '';
  phone = '';
  leaderId = '';
  bizCategories = [];
  storeModel = new Store();
  type = 'add';
  superAdmins = [];
  date: any;
  locations = [];
  locality = '';
  cities = [];
  city = '';
  storeId = '';
  selectedStore: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private utils: UtilityService,
    private locationService: LocationService,
    private leaderService: LeaderService,
    private notificationService: NotificationService,
    public dealService: DealService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.checklogin();
    if (this.isLoggedIn) {
      this.activatedRoute.queryParams.subscribe((params) => {
        this.storeId = params['storeId'];
        if (params['type'] !== null && params['type'] !== undefined) {
          this.type = params['type'];
        }
        if (this.type === 'edit') {
          this.getStoreInfo();
        }
        console.log(this.storeId);
        console.log(this.type);
  
      });
   
      this.getCities()
    }
   
    
  }
  checklogin() {
    this.isLoggedIn = this.authService.checkLogin();
    if (this.isLoggedIn) {
      this.name = localStorage.getItem('name');
      this.phone = localStorage.getItem('phonenumber');
    } else {
      this.router.navigate(['./sign-in']);
    }
  }

  getStoreInfo() {
    this.dealService.getStore(this.storeId).then((result) => {
      if (result.data() !== undefined) {
        this.selectedStore = result.data();
        this.storeModel.name = this.selectedStore['name'];
        this.storeModel.address = this.selectedStore['address'];
        // this.storeModel.locality = this.selectedStore['locality'];
        this.storeModel.type = this.selectedStore['type'];
        // this.userid = this.selectedLocation['createdbyid'];
      }
    });
  }

  getCities() {
    this.dealService.getCities().subscribe((res) => {
      this.cities = res;
      this.cities.sort();
      console.log(this.cities);
    });
  }

  getLocalities(city) {
    this.dealService.getLocality(city).subscribe((res) => {
      this.locations = res;
      this.locations.sort();
      console.log(this.locations)
    });
  }

  

  // setCity(e) {
  //   this.city = e.target.value;
  //   this.storeModel.city = this.city;
  //   console.log(this.city)
  //   this.city = '';
  //   console.log(this.storeModel.city);
  //  this.getLocalities(this.storeModel.city);
  // }

  // setLocality(e) {
  //   this.locality = e.target.value;
  //   this.storeModel.locality = this.locality;
  //   console.log(this.locality)
  //   this.locality = '';
  // }

  async Continue() {
    if (this.type === 'add') {
      this.createStore();
    } else if (this.type === 'edit') {
      this.updateStore();
    }


  }

  createStore() {
    this.dealService
      .createStore(this.storeModel)
      .then(async (res) => {
        // this.isFormSubmitted = true;
        this.utils.showToast('Store Created successfully');
        this.router.navigate(['my-store']);

      })
      .catch((err) => console.log(err));
    // this.date = new Date().toISOString().split('-').join('').split(':').join('').split('.').join('').split('T').join('').split('Z').join('');
    // console.log(this.storeModel.name)
  }

  updateStore() {
    this.dealService.updateStore(this.storeId, this.storeModel)
      .then(async (result) => {
        this.utils.showToast("Store  is Updated");
        this.router.navigate(['my-store']);
      })
      .catch((err) => console.log(err));
    // this.date = new Date().toISOString().split('-').join('').split(':').join('').split('.').join('').split('T').join('').split('Z').join('');


  }

}
