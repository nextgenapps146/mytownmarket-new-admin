import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { City, LocationService } from 'src/services/location.service';
import { NotificationService } from 'src/services/notification.service';
import { UtilityService } from 'src/services/utility.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.page.html',
  styleUrls: ['./add-location.page.scss'],
})
export class AddLocationPage implements OnInit {
  isFormSubmitted = false;
  locationDetails: any;
  isLoggedIn = false;
  name = '';
  phone = '';
  cityModel = new City();
  superAdmins = [];
  draftrecord: any;
  date: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private locationService: LocationService,
    private utils: UtilityService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.locationDetails = JSON.parse(localStorage.getItem('location'));
    this.checklogin()
    this.getSuperAdmins();
    
  }


  getSuperAdmins() {
    this.authService.getUsers('superadmin').subscribe((users) => {
      this.superAdmins = users;
      console.log(this.superAdmins)
    });
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

  async Continue() {
    this.createCity();
  }
  createCity() {
    this.locationService
      .createCity(this.cityModel)
      .then(async (result) => {
        this.isFormSubmitted = true;
        //   this.draftrecord = result;
        //   // Sucess -- Go to add city page
        //   console.log(this.draftrecord)
        //  localStorage.setItem('draftrecord', this.draftrecord);
        this.utils.showToast('Waiting for Approval');
      })
      .catch((err) => console.log(err));
    console.log(this.cityModel.name)

    this.date = new Date().toISOString().split('-').join('').split(':').join('').split('.').join('').split('T').join('').split('Z').join('');
    let notification = {
      createdon: this.date,
      fromuid: localStorage.getItem('uid'),
      fromname: localStorage.getItem('name'),
      trackingid: localStorage.getItem('draftrecordid'),
      to: '',
      type: 'Add Location Request',
      status: 'new',
      trackingname: this.cityModel.name,
      // entity: 'village',
      // message:
      //   'User: ' +
      //   localStorage.getItem('name') +
      //   ' has requested  Village : ' +
      //   this.cityModel.name +
      //   ' for location: ' +
      //   this.cityModel.mandal + this.cityModel.district + this.cityModel.state,
      // isNew: true,

      // mandal: this.cityModel.mandal,
      // state: this.cityModel.state,
      // district: this.cityModel.district,
      // country: this.cityModel.country,
    };
    for (const user of this.superAdmins) {
      notification.to = user.id;
      this.notificationService.addNotification(notification);
    }
  }


}
