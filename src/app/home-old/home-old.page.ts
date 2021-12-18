import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';
import { NotificationService } from 'src/services/notification.service';
import { StoreService } from 'src/services/store.service';
import { LocationService } from 'src/services/location.service';
import { UtilityService } from 'src/services/utility.service';
import { MapboxService } from 'src/services/mapbox.service';
import { PartyService } from 'src/services/party.service';
import { LeaderService } from 'src/services/leader.service';

import { PopovermodelComponent } from '../components/popovermodel/popovermodel.component';

@Component({
    selector: 'app-home-old',
    templateUrl: './home-old.page.html',
    styleUrls: ['./home-old.page.scss'],
})

export class HomeOldPage {
    uid = '';
    // location = '';
    locality = '';
    officials = [];
    schemes = [];
    parties = [];
    leaders = [];
    govtofficials = [];
    offices = [];
    hospitals = [];
    locationDetails: any;
    visitedStores = [];
    selectedStore: any;
    totalCartItems = 0;
    newNotificationCount = 0;
    // notifications = [];
    qpMap = {};
    shop: any;
    isLoggedIn = false;
    lastNotificationPullDate: any;
    // reddot: boolean;
    notifications: Array<any>;
    date: any;
    reddot = false;



    constructor(
        private route: Router,
        private storeService: StoreService,
        private notificationService: NotificationService,
        private utils: UtilityService,
        private locationService: LocationService,
        private alertController: AlertController,
        private authService: AuthService,
        private partyService: PartyService,
        private leaderService: LeaderService,
        private popCtrl: PopoverController
    ) { }

    ionViewDidEnter() {
        this.uid = localStorage.getItem("uid");
        this.notifications = JSON.parse(localStorage.getItem(this.uid + 'notifications')) || [];
        localStorage.setItem('currentpage', 'home');
        this.isLoggedIn = this.authService.checkLogin();
        this.locationDetails = JSON.parse(localStorage.getItem('location'));
        // this.locality = localStorage.getItem('locality');
        this.utils.getQPMap().subscribe((res) => {
            if (res !== undefined) {
                this.qpMap = res;
                this.totalCartItems = res.totalQuantity;
            }
        });
        this.getNotification();
        // this.getLocationDetails();
        this.getAllLocationOfficials();
        this.getAllLocationGovtServants();
        this.getAllSchemes();
        this.getAllParties();
        this.getAllLeaders();
        this.getAllVisitedStores();
        this.getLocationOffices();
        this.getLocationHospitals();
    }

    getNotification() {
        this.date = new Date().toISOString().split('-').join('').split(':').join('').split('.').join('').split('T').join('').split('Z').join('');
         this.lastNotificationPullDate = localStorage.getItem('lastPullDate') || this.date ;
        this.notificationService
          .getNotificationsByDate(this.uid, this.lastNotificationPullDate)
          .subscribe((res) => {
            console.log(res);
            if (res) {
              this.processNotification(res);
            }
            
          });
      }
    
      processNotification(data) {
        if (data && data.length > 0) {
            this.reddot = data && data.length > 0;
            // localStorage.setItem('lastPullDate', this.date);
            data.forEach(element => {
              this.notifications.unshift(element);
            });
            localStorage.setItem(this.uid + 'notifications', JSON.stringify(this.notifications));
        } else {
            this.reddot = false;
        }
    }

    // getNotification() {
    //     this.date = new Date().toISOString().split('-').join('').split(':').join('').split('.').join('').split('T').join('').split('Z').join('');
    //     this.lastNotificationPullDate = localStorage.getItem('lastPullDate') || this.date ;
    //     // this.lastNotificationPullDate = localStorage.getItem('lastPullDate') || new Date();
    //     // console.log(this.lastNotificationPullDate)
    //     // let lastNotificationPullDate = window.localStorage.getItem('lastPullDate')|| new Date();
    //     // const lastNotificationPullDate = JSON.parse(window.localStorage.lastPullDate ||  new Date());
    //     // const lastNotificationPullDate = localStorage.getItem('lastPullDate' || new Date();
    //     // const notification;
    //     this.notificationService
    //         .getNotificationsByDate(this.uid, this.date)
    //         .subscribe((res) => {
    //             if (res) {
    //                 this.processNotification(res);
    //             }
    //         });
    // }

    // processNotification(data) {
    //     if (data && data.length > 0) {
    //         this.reddot = data && data.length > 0;
    //         // localStorage.setItem('lastPullDate', this.date);
    //         data.forEach(element => {
    //           this.notifications.unshift(element);
    //         });
    //         localStorage.setItem(this.uid + 'notifications', JSON.stringify(this.notifications));
    //     } else {
    //         this.reddot = false;
    //     }
    // }

    // getLocationDetails() {
    //     this.locationService.getLocationDetails(this.location).subscribe((data) => {
    //         this.locationDetails = data && data[0];
    //         console.log(this.locationDetails)

    //     });
    // }
    getLevel() {
        if (this.locationDetails.entity === 'state') {
            return '2';
        }
        if (this.locationDetails.entity === 'district') {
            return '3';
        }
    }

    getAllLeaders() {
        const level = this.getLevel();
        this.leaderService.getLeaders(this.locationDetails.name, this.locationDetails.entity, level).subscribe((data) => {
            this.leaders = data;
            console.log(this.leaders);
            // if (data && data.length > 0) {
            //     this.processCityInfo(data);
            // }
            // this.getAllNotifications();
        });
    }

    getAllLocationOfficials() {
        const level = this.getLevel();

        this.storeService.getLocationOfficials(this.locationDetails.name, this.locationDetails.entity, level).subscribe((data) => {
            this.officials = data;
            console.log(this.officials);
            // if (data && data.length > 0) {
            //     this.processCityInfo(data);
            // }
            // this.getAllNotifications();
        });
    }

    getAllLocationGovtServants() {
        const level = '10' + this.getLevel();
        this.storeService.getLocationOfficials(this.locationDetails.name, this.locationDetails.entity, level).subscribe((data) => {
            this.govtofficials = data;
            console.log(this.govtofficials);
            // if (data && data.length > 0) {
            //     this.processCityInfo(data);
            // }
            // this.getAllNotifications();
        });
    }

    getAllParties() {
        this.partyService.getParties().subscribe((items) => {
            this.parties = items;
            console.log(this.parties);
            // if (data && data.length > 0) {
            //     this.processCityInfo(data);
            // }
            // this.getAllNotifications();
        });
    }

    getAllSchemes() {
        this.storeService.getSchemes().subscribe((items) => {
            this.schemes = items;
            console.log(this.schemes);
            // if (data && data.length > 0) {
            //     this.processCityInfo(data);
            // }
            // this.getAllNotifications();
        });
    }

    getLocationOffices() {
        this.storeService.getLocationOffices(this.locationDetails.name, this.locationDetails.entity).subscribe((data) => {
            this.offices = data;
            // if (data && data.length > 0) {
            //     this.processCityInfo(data);
            // }
            // this.getAllNotifications();
        });
    }

    getLocationHospitals() {
        this.storeService.getLocationHospitals(this.locationDetails.name, this.locationDetails.entity).subscribe((data) => {
            this.hospitals = data;
            console.log(this.hospitals);
            // if (data && data.length > 0) {
            //     this.processCityInfo(data);
            // }
            // this.getAllNotifications();
        });
    }

    goToListPage(type) {
        const navigationExtras = {
            queryParams: {
                // location: this.locationDetails.city,
                type,
            },
        };
        this.route.navigate(['list'], navigationExtras);
    }



    // processCityInfo(data) {
    //     data.forEach(element => {
    //         if (element.type === 'mla') {
    //             this.mlas.push(element);
    //         } else if (element.type === 'mp') {
    //             this.mps.push(element);
    //         }
    //     });
    // }

    getAllVisitedStores() {
        if (JSON.parse(localStorage.getItem(this.uid + 'storesvisited')) !== null) {
            this.visitedStores = JSON.parse(
                localStorage.getItem(this.uid + 'storesvisited')
            );
        }
    }

    async _popOver(ev: any) {
        this.date = new Date().toISOString().split('-').join('').split(':').join('').split('.').join('').split('T').join('').split('Z').join('');
        console.log(this.date);
        localStorage.setItem('lastPullDate', this.date);
        const popOver = await this.popCtrl.create({
            component: PopovermodelComponent,
            componentProps: { notifications: this.notifications },
            cssClass: 'my-popover-class',
            event: ev,
        })

        popOver.onDidDismiss().then(data => {
            this.reddot = false;
        })

        return await popOver.present()
    }




    // getAllNotifications() {
    //     this.notificationService
    //         .getNotificationsByUserId(this.uid)
    //         .subscribe((data) => {
    //             this.notifications = data || [];
    //             if (this.notifications !== undefined && this.notifications !== null) {
    //                 this.notifications.sort((a, b) =>
    //                     a.createdon > b.createdon ? -1 : b.createdon > a.createdon ? 1 : 0
    //                 );
    //             }
    //             let count = 0;
    //             let tempIndex = -1;
    //             let tempOrders = [];
    //             if (
    //                 JSON.parse(localStorage.getItem(this.uid + 'orders')) !== undefined &&
    //                 JSON.parse(localStorage.getItem(this.uid + 'orders')) !== null
    //             ) {
    //                 tempOrders = JSON.parse(localStorage.getItem(this.uid + 'orders'));
    //             }

    //             const tempNotifications = [];
    //             for (let i = this.notifications.length - 1; i >= 0; i--) {
    //                 tempNotifications.push(this.notifications[i].id);
    //                 tempIndex = -1;
    //                 if (
    //                     this.notifications[i] !== undefined &&
    //                     this.notifications[i].isNew
    //                 ) {
    //                     count++;
    //                 }
    //                 if (
    //                     this.notifications[i] !== undefined &&
    //                     this.notifications[i].type === 'order'

    //                 ) {
    //                     tempIndex = tempOrders.findIndex(
    //                         (x) => x.id === this.notifications[i].orderid
    //                     );
    //                     if (tempIndex > -1) {
    //                         tempOrders[tempIndex].status = this.notifications[i].status;
    //                         if (this.notifications[i].newTotalCharges !== undefined && this.notifications[i].newTotalCharges !== null) {
    //                             tempOrders[tempIndex].totalcharges = this.notifications[i].newTotalCharges;
    //                         }
    //                         if (this.notifications[i].newTotalQuantity !== undefined && this.notifications[i].newTotalQuantity !== null) {
    //                             tempOrders[tempIndex].totalitemsquantity = this.notifications[i].newTotalQuantity;
    //                         }
    //                     }
    //                 }
    //             }

    //             if (this.uid !== undefined && this.uid !== null) {
    //                 localStorage.setItem(
    //                     this.uid + 'notifications',
    //                     JSON.stringify(tempNotifications)
    //                 );
    //                 localStorage.setItem(this.uid + 'orders', JSON.stringify(tempOrders));
    //             }
    //             this.newNotificationCount = count;
    //         });
    // }

    changeLocation() {
        this.route.navigate(['./location']);
    }

    item_details() {
        this.route.navigate(['./item-detail']);
    }

    item() {
        this.route.navigate(['./item']);
    }

    search() {
        this.route.navigate(['./search-store']);
    }

    show_notifications() {
        this.route.navigate(['./notifications']);
    }

    cart() {
        this.route.navigate(['./cart']);
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
            this.route.navigate(['shop'], navigationExtras);
        }
    }

    goToLeaderDetails(leader) {
        this.route.navigate(['leader/' + leader.id]);
    }

    goToPartyDetails(party) {
        this.route.navigate(['party/' + party.id]);
    }

    goToSchemeDetails(scheme) {
        this.route.navigate(['scheme/' + scheme.id]);
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
        this.route.navigate(['shop'], navigationExtras);
    }
}
