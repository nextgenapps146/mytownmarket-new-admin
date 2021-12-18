
import { Injectable } from '@angular/core';
import {
    AngularFirestoreCollection,
    AngularFirestore,
} from '@angular/fire/firestore';

import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class DealService {
    uid = '';
    storeid = '';
    locationRef: AngularFirestoreCollection;
    storeRef: AngularFirestoreCollection;
    usersRef: AngularFirestoreCollection;
    keyword: any;
    constructor(public Afs: AngularFirestore) { }

    getLocations() {
        this.locationRef = this.Afs.collection("availablelocations");
        return this.locationRef.snapshotChanges().pipe(
          map((res) =>
            res.map((dataItems) => {
              const data = dataItems.payload.doc.data(),
                id = dataItems.payload.doc.id;
              return { id, ...data };
            })
          )
        );
      }

    checkLogin(): boolean {
        if (localStorage.getItem("isloggedin") === "true") {
          return true;
        } else {
          return false;
        }
      }

    getLocality(city) {
        this.locationRef = this.Afs.collection('availablelocations', (ref) =>
            ref.where('entity', '==', 'locality').where('city', '==', city)
        );
        return this.locationRef.snapshotChanges().pipe(
            map((res) =>
                res.map((dataItems) => {
                    const data = dataItems.payload.doc.data(),
                        id = dataItems.payload.doc.id;
                    return { id, ...data };
                })
            )
        );
    }

    getCities() {
        this.locationRef = this.Afs.collection('availablelocations', (ref) =>
            ref.where('entity', '==', 'city')
        );
        return this.locationRef.snapshotChanges().pipe(
            map((res) =>
                res.map((dataItems) => {
                    const data = dataItems.payload.doc.data(),
                        id = dataItems.payload.doc.id;
                    return { id, ...data };
                })
            )
        );
    }

    getStoreDetails() {
        this.uid = localStorage.getItem("uid");
        this.storeRef = this.Afs.collection('stores', (ref) =>
            ref.where('createdbyid', '==', this.uid)
        );
        return this.storeRef.snapshotChanges().pipe(
            map((res) =>
                res.map((dataItems) => {
                    const data = dataItems.payload.doc.data(),
                        id = dataItems.payload.doc.id;
                    return { id, ...data };
                })
            )
        );
    }

    getPromotions() {
        this.storeid = localStorage.getItem(this.uid + "storeid");
        this.locationRef = this.Afs.collection('promotions', (ref) =>
            ref.where('storeid', '==', this.storeid)
        );
        return this.locationRef.snapshotChanges().pipe(
            map((res) =>
                res.map((dataItems) => {
                    const data = dataItems.payload.doc.data(),
                        id = dataItems.payload.doc.id;
                    return { id, ...data };
                })
            )
        );
    }

    getPromotionswithlocality(storelocality) {
        this.locationRef = this.Afs.collection('promotions', (ref) =>
            ref.where('storelocality', '==', storelocality)
        );
        return this.locationRef.snapshotChanges().pipe(
            map((res) =>
                res.map((dataItems) => {
                    const data = dataItems.payload.doc.data(),
                        id = dataItems.payload.doc.id;
                    return { id, ...data };
                })
            )
        );
    }

    getStoreswithlocality(storelocality) {
        this.locationRef = this.Afs.collection('stores', (ref) =>
            ref.where('storelocality', '==', storelocality)
        );
        return this.locationRef.snapshotChanges().pipe(
            map((res) =>
                res.map((dataItems) => {
                    const data = dataItems.payload.doc.data(),
                        id = dataItems.payload.doc.id;
                    return { id, ...data };
                })
            )
        );
    }

    // .where('name', '==', search)
    getPromotionssearch(storelocality, searchKey) {
        this.locationRef = this.Afs.collection('promotions', (ref) =>
            ref.where('storelocality', '==', storelocality).where("keywords", "array-contains", searchKey)
        );
        return this.locationRef.snapshotChanges().pipe(
            map((res) =>
                res.map((dataItems) => {
                    const data = dataItems.payload.doc.data(),
                        id = dataItems.payload.doc.id;
                    return { id, ...data };
                })
            )    
        );
    }

    // getPromotionsearch(storelocality){}

  

    public async createStore(result) {
        localStorage.setItem('storename', result.name);
        result.storelocality = localStorage.getItem('storelocality');
        result.storecity = localStorage.getItem('storecity');
        result.storezipcode = localStorage.getItem('storezipcode');
        result.createdbyname = localStorage.getItem(this.uid + 'fullname');
        result.createdbyphoneno = localStorage.getItem(this.uid + 'phonenumber');
        result.createdbyid = localStorage.getItem('uid');
        result.createdon = new Date();
        // result.status = 'new',
        this.storeRef = this.Afs.collection<Store>("stores");
        await this.storeRef.add({ ...result }).then((snapshot) => {
            console.log(snapshot);
            localStorage.setItem(this.uid + 'storeid', snapshot.id);
            this.uid = localStorage.getItem('uid');
            this.usersRef = this.Afs.collection("users");
            this.usersRef.doc(this.uid).update({ role : 'owner'})
            .then((snapshot) => {
              localStorage.setItem(this.uid + 'role', 'owner');
            });
        });
          
    }

    public async updateStore(id, result) {
        result.storelocality = localStorage.getItem('storelocality');
        result.storecity = localStorage.getItem('storecity');
        result.storezipcode = localStorage.getItem('storezipcode');
        localStorage.setItem(this.uid + 'storename', result.name)
        result.createdbyname = localStorage.getItem(this.uid + 'fullname');
        result.createdbyphoneno = localStorage.getItem(this.uid + 'phonenumber');
        result.createdbyid = localStorage.getItem('uid');
        result.createdon = new Date();
        // result.status = 'Location Approved',
        this.locationRef = this.Afs.collection("stores");
        await this.locationRef.doc(id).set({ ...result });
    }


    getStore(id) {
        return this.Afs.collection("stores").doc(id).ref.get();
    }


    public async createPromotion(result) {
        result.keyword = result.name.split('');
        result.storecity = localStorage.getItem('storecity');
        result.storezipcode = localStorage.getItem('storezipcode');
        result.storeid = localStorage.getItem(this.uid + 'storeid');
        result.storeaddress = localStorage.getItem(this.uid + 'storeaddress');
        result.storename = localStorage.getItem(this.uid + 'storename');
        result.storelocality = localStorage.getItem('storelocality');
        result.createdbyname = localStorage.getItem(this.uid + 'fullname');
        result.createdbyphoneno = localStorage.getItem(this.uid + 'phonenumber');
        result.createdbyid = localStorage.getItem('uid');
        result.createdon = new Date();
        // result.status = 'new',
        this.storeRef = this.Afs.collection<Store>("promotions");
        await this.storeRef.add({ ...result }).then((snapshot) => {
            console.log(snapshot);
            // localStorage.setItem('storeid', snapshot.id);
            // localStorage.setItem("draftleaderid", snapshot.id);
        });
    }

    getPromotion(id) {
        return this.Afs.collection("promotions").doc(id).ref.get();
    }

    public async updatePromotion(id, result) {
        var keywords = result.name.split(" "); 
        result.keywords = keywords;
        result.storecity = localStorage.getItem('storecity');
        result.storezipcode = localStorage.getItem('storezipcode');
        result.storeid = localStorage.getItem(this.uid + 'storeid');
        result.storeaddress = localStorage.getItem(this.uid + 'storeaddress');
        result.storename = localStorage.getItem(this.uid + 'storename');
        result.storelocality = localStorage.getItem('storelocality');
        result.createdbyid = localStorage.getItem("uid");
        result.createdbyname = localStorage.getItem(this.uid + "name");
        result.createdbyphoneno = localStorage.getItem(this.uid + "phonenumber");
        // result.status = 'Location Approved',
        result.createdon = new Date();
        this.locationRef = this.Afs.collection("promotions");
        await this.locationRef.doc(id).set({ ...result });
    }

    
    public async contactus(result) {
        // result.storelocality = localStorage.getItem('storelocality');
        // result.storecity = localStorage.getItem('storecity');
        // result.storezipcode = localStorage.getItem('storezipcode');
        // result.createdbyname = localStorage.getItem(this.uid + 'name');
        // result.createdbyphoneno = localStorage.getItem(this.uid + 'phonenumber');
        // result.createdbyid = localStorage.getItem('uid');
        result.createdon = new Date();
        // result.status = 'new',
        this.storeRef = this.Afs.collection<Store>("contactforms");
        await this.storeRef.add({ ...result }).then((snapshot) => {
            
            });
        };
          
    }




export class Contact {
    subject: string;
    name: string;
    phonenumber: string;
    email: string;
    message: string;

    constructor() {
        this.name = "";
        this.subject = "";
        this.phonenumber = "";
        this.email = "";
        this.message = "";
    }

    reset() {
        this.name = "";
        this.subject = "";
        this.phonenumber = "";
        this.email = "";
        this.message = "";
    }
}


export class Store {
    name: string;
    address: string;
    type: string;
    contactphone : string;
    about : string;

    constructor() {
        this.name = "";
        this.address = "";
        this.type = "";
        this.contactphone = "";
        this.about = "";
    }

    reset() {
        this.name = "";
        this.address = "";
        this.type = "";
        this.contactphone = "";
        this.about = "";
    }
}

export class Promotion {
    name: string;
    quantity: string;
    saleprice: string;
    regularprice: string;
    type: string;
    category: string;
    offer: string;
    // locality: string;s
    // city: string;
    // streetaddress: string;
    // zipcode: string;
    constructor() {
        this.name = "";
        this.quantity = "";
        this.type = "";
        this.category = "";
        this.saleprice = "";
        this.regularprice = "";
        this.offer = "";
    }

    reset() {
        this.name = "";
        this.quantity = "";
        this.type = "";
        this.category = "";
        this.saleprice = "";
        this.regularprice = "";
        this.offer = "";
    }
}
function arrayContains(arg0: string, arrayContains: any, searchKey: any): import("@angular/fire/firestore").Query<import("firebase").firestore.DocumentData> {
    throw new Error('Function not implemented.');
}

