import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { LocationService } from 'src/services/location.service';

@Component({
    selector: 'app-location',
    templateUrl: './location.page.html',
    styleUrls: ['./location.page.scss'],
})

export class LocationPage implements OnInit {
    locationsList = [];
    originalList = [];
    uid = '';
    isLoggedIn = false;

    constructor(
        private locationService: LocationService,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.uid = localStorage.getItem("uid");
        this.getLocations();
    }

    addlocation() {
        this.router.navigate(["./add-location"]);
    }

    getLocations() {
        this.locationService.getLocations().subscribe((items) => {
            this.locationsList = items;
            this.originalList = items; // saving original

            this.locationsList = this.locationsList.filter(location => location.entity === 'district');
        });
    }

    updateLocationList(event) {
        const fullList = this.originalList.map(a => Object.assign({}, a));
        if (!event.currentTarget.value) {
            this.locationsList = fullList;
            return;
        }
        const filtered = fullList.filter((location) => location.name.startsWith(event.currentTarget.value));
        this.locationsList = filtered;
    }

    confirmLocation(location) {
        localStorage.setItem('location', JSON.stringify(location));
        this.isLoggedIn = this.authService.checkLogin();
        if(this.isLoggedIn === true){
        if (location.entity === 'locality'){
        localStorage.setItem('storecity', location.city);
        localStorage.setItem( 'storelocality', location.name);
        localStorage.setItem('storezipcode', location.zipcode);
        }
    }
        this.router.navigate(['./home']);
    }
}
