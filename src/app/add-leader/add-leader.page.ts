import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { Leader, LeaderService } from 'src/services/leader.service';
import { LocationService } from 'src/services/location.service';
import { NotificationService } from 'src/services/notification.service';
import { UtilityService } from 'src/services/utility.service';

@Component({
  selector: 'app-add-leader',
  templateUrl: './add-leader.page.html',
  styleUrls: ['./add-leader.page.scss'],
})
export class AddLeaderPage implements OnInit {
  isFormSubmitted = false;
  isLoggedIn = false;
  name = '';
  phone = '';
  leaderId = '';
  selectedLeader: any;
  mandals = [];
  districts = [];
  states = [];
  villages = [];
  localities = [];
  mandal = '';
  state = '';
  district = '';
  village = '';

  locality = '';
  bizCategories = [];
  leaderModel = new Leader();
  type = 'add';
  superAdmins = [];
  draftleaderid: any;
  date: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private utils: UtilityService,
    private locationService: LocationService,
    private leaderService: LeaderService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.checklogin();
    this.getSuperAdmins();
    this.getStates();
    this.getDistricts();
    this.getMandals();
    this.getVillages();
    // this.getLocalities();
  }

  getSuperAdmins() {
    this.authService.getUsers('superadmin').subscribe((users) => {
      this.superAdmins = users;
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

      //city-mandal
      getMandals() {
        this.locationService.getMandals(this.district).subscribe((mandals) => {
            this.mandals = mandals;
            this.mandals.sort();

            this.getLocalities();
            console.log(this.mandals)
        });
    }

    getVillages() {
        this.locationService.getVillages(this.mandal).subscribe((villages) => {
            this.villages = villages;
            this.villages.sort();
            this.getLocalities();
            console.log(this.villages)
        });
    }

    getStates() {
        this.locationService.getStates().subscribe((states) => {
            this.states = states;
            this.states.sort();
            console.log(this.states)
        });
    }

    getDistricts() {
        this.locationService.getDistricts(this.state).subscribe((districts) => {
            this.districts = districts;
            this.districts.sort();
            console.log(districts)
        });
    }






    setState(e) {
        this.state = e.target.value;
        this.leaderModel.state = this.state;
        console.log(this.state)
        this.locality = '';
        this.getDistricts();
    }

    setDistrict(e) {
        this.district = e.target.value;
        this.leaderModel.district = this.district;
        console.log(this.district)
        this.locality = '';
        this.getMandals();
    }

    setMandal(e) {
        this.mandal = e.target.value;
        this.leaderModel.mandal = this.mandal;
        console.log(this.mandal)
        this.locality = '';
        this.getVillages();
        this.getLocalities();
    }

    getLocalities() {
        this.locationService.getLocalities(this.mandal).subscribe((localities) => {
            this.localities = localities;
            this.localities.push({ locality: 'NA' });
            this.localities.sort();
            if (this.type === 'edit') {
                if (this.selectedLeader !== undefined) {
                    this.leaderModel.locality = this.selectedLeader['locality'];
                    this.locality = this.selectedLeader['locality'];
                }
            }
        });
    }

    setLocality(e) {
        if (e.target.value !== undefined && e.target.value !== null && e.target.value !== '') {
            this.locality = e.target.value;
            this.leaderModel.locality = this.locality;
        }
    }



    async Continue() {
      this.createLeader();
    }

    createLeader() {
        this.leaderService
            .createLeader(this.leaderModel)
            .then(async (res) => {
              this.isFormSubmitted = true;
              this.draftleaderid = res;
              this.utils.showToast('Waiting for Approval');
                // this.utils.showToast('New Leader is added successfully');
                // this.leaderModel = new Leader();
            })
            .catch((err) => console.log(err));
            this.date = new Date().toISOString().split('-').join('').split(':').join('').split('.').join('').split('T').join('').split('Z').join('');

            console.log(this.leaderModel.name)
            let notification = {
              createdon: this.date,
              fromuid: localStorage.getItem('uid'),
              fromname: localStorage.getItem('name'),
              trackingid: localStorage.getItem('draftleaderid'),
              to: '',
              type: 'Add Leader Request',
              status: 'new',
              trackingname: this.leaderModel.name,
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

    // updateLeader(params) {
    //     this.leaderService
    //         .updateLeader(this.leaderId, params)
    //         .then(async () => {
    //             this.utils.showToast('Leader is updated successfully');
    //             this.route.navigate(['all-stores']);
    //         })
    //         .catch((err) => console.log(err));
    // }


}