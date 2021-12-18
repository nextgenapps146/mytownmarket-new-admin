import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CategoryService } from 'src/services/category.service';
import { LocationService } from 'src/services/location.service';
import { NotificationService } from 'src/services/notification.service';
import { StoreService } from 'src/services/store.service';
import { UtilityService } from 'src/services/utility.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})

export class ListPage implements OnInit {
    uid = '';
    // location: string;
    listType: string;
    entitiesList: Array<any> = [];
    hospitals = [];
    locationDetails: any;
    // city : string;
    shop: any;
    selectedStore: any;
    totalCartItems = 0;

    constructor(
        private activatedRoute: ActivatedRoute,
        private locationService: LocationService,
        private router: Router,
        private storeService: StoreService,
        private alertController: AlertController,
        private utils: UtilityService

    ) { }

    ngOnInit() {
        this.locationDetails = JSON.parse(localStorage.getItem('location'));
        // this.city = localStorage.getItem('location');
        this.activatedRoute.queryParams.subscribe((params) => {
            // this.location = params['location'];
            this.listType = params['type']
            this.getEntitiesList();
            this.getCityHospitals();
        });

    }

    getEntitiesList() {
        if (this.listType === 'mandals') {
            this.locationService.getMandals(this.locationDetails.name).subscribe((data) => {
                this.entitiesList = data;
            });
        } else if (this.listType === 'villages') {
            this.locationService.getVillages(this.locationDetails.name).subscribe((data) => {
                this.entitiesList = data;
            });
        } else if (this.listType === 'parties') {
            this.entitiesList = [
                { name: 'Telangana Rashtra Samithi' },
                { name: 'Indian National Congress' },
                { name: 'Bharathiya Janatha Party' }
            ];
        }

    }

    goToListDetails(item) {
        localStorage.setItem('location', JSON.stringify(item));
        this.router.navigate(['home']);
    }

    getCityHospitals() {
        this.storeService.getLocationHospitals(this.locationDetails.name, this.locationDetails.entity).subscribe((data) => {
            this.hospitals = data;
            console.log(this.hospitals);
            // if (data && data.length > 0) {
            //     this.processCityInfo(data);
            // }
        });
    }

    async goToShop(shop) {
        this.selectedStore = shop;
        const prevStoreId = localStorage.getItem('storeid');
        if (
            this.totalCartItems > 0 &&
            prevStoreId !== null &&
            prevStoreId !== undefined &&
            prevStoreId !== shop.id
        ) {
            const alert = await this.alertController.create({
                cssClass: '',
                header: 'Confirm!',
                message:
                    'If you visit a different store, your cart will be cleared. Do you want to proceed?',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: '',
                        handler: () => { },
                    },
                    {
                        text: 'Okay',
                        handler: () => {
                            this.confirm();
                        },
                    },
                ],
            });
            await alert.present();
        } else {
            localStorage.setItem('storeid', this.selectedStore.id);
            localStorage.setItem('storename', this.selectedStore.name);
            localStorage.setItem('storeadmin', this.selectedStore.adminid);
            localStorage.setItem('bizcat', this.selectedStore.bizcat);
            if (this.uid !== undefined && this.uid !== null) {
                let tempIndex = -1;
                const tempstores =
                    JSON.parse(localStorage.getItem(this.uid + 'storesvisited')) || [];
                tempIndex = tempstores.findIndex((x) => x.id === shop.id);
                if (tempIndex === -1) {
                    tempstores.push(shop);
                }
                localStorage.setItem(
                    this.uid + 'storesvisited',
                    JSON.stringify(tempstores)
                );
            }
            const navigationExtras = {
                queryParams: {
                    shopId: this.selectedStore.id, // shop.id goes here
                },
            };
            this.router.navigate(['shop'], navigationExtras);
        }
    }

    confirm() {
        this.utils.setQPMap({});
        localStorage.setItem('storeid', this.selectedStore.id);
        localStorage.setItem('storename', this.selectedStore.name);
        localStorage.setItem('storeadmin', JSON.stringify(this.selectedStore.adminid));
        localStorage.setItem('bizcat', this.selectedStore.bizcat);
        if (this.uid !== undefined && this.uid !== null) {
            let tempIndex = -1;
            const tempstores =
                JSON.parse(localStorage.getItem(this.uid + 'storesvisited')) || [];
            tempIndex = tempstores.findIndex((x) => x.id === this.selectedStore.id);
            if (tempIndex === -1) {
                tempstores.push(this.selectedStore);
            }
            localStorage.setItem(
                this.uid + 'storesvisited',
                JSON.stringify(tempstores)
            );
        }
        const navigationExtras = {
            queryParams: {
                shopId: this.selectedStore.id,
            },
        };
        this.router.navigate(['shop'], navigationExtras);
    }
    changeLocation() {
        this.router.navigate(['./location']);
    }

}
