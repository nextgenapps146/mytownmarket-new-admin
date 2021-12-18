import { Injectable } from '@angular/core';
import {
    AngularFirestoreCollection,
    AngularFirestore,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class LeaderService {
    leaderRef: AngularFirestoreCollection;


    constructor(public Afs: AngularFirestore) { }

    public getLeaders(locationName: string, entity: string, level: string) {
        this.leaderRef = this.Afs.collection('stores', (ref) =>
            ref.where(entity, '==', locationName).where('level', '==', level)
        );
        return this.leaderRef.snapshotChanges().pipe(
            map((res) =>
                res.map((dataItems) => {
                    const data = dataItems.payload.doc.data();
                    return { id: dataItems.payload.doc.id, ...data };
                })
            )
        );
    }

    public async getLeaderDetails(leaderId) {
        if (leaderId) {
            this.leaderRef = this.Afs.collection('stores');
            return this.leaderRef.doc(leaderId).snapshotChanges().pipe(map((res: any) => {
                const result = res.payload.data();
                if (result) {
                    result.id = res.payload.id;
                }
                return result;
            }));
        }
    }

    public async createLeader(result) {
        result.createdbyname = localStorage.getItem('name');
        result.createdbyphoneno = localStorage.getItem('phonenumber');
        result.createdbyid = localStorage.getItem('uid');
        result.createdon = new Date();
        result.status = 'new',
        this.leaderRef = this.Afs.collection<Leader>("draftleaders");
        await this.leaderRef.add({ ...result }).then((snapshot) => {
            console.log(snapshot);
            localStorage.setItem("draftleaderid", snapshot.id);
        });
    }

    getLeaderParams(si: any) {
        let tempdesignation = si.designation.split(', ');
        return {
            name: si.name,
            about: si.about,
            streetaddress: si.streetaddress,
            district: si.district,
            village: si.village,
            mandal: si.mandal,
            locality: si.locality,
            state: si.state,
            zipcode: si.zipcode,
            designation: tempdesignation,
            // iscurbsidepickup: si.iscurbsidepickup || false,
            // isdelivery: si.isdelivery || false,
            // iscredit: si.iscredit || false,
            // ispayonline: si.ispayonline || false,
            // categoriescount: 0,
            // productscount: 0,
            // type: si.type,
            bizcat: si.bizcat,
            image: si.image,

            subtype: si.subtype,
            dob: si.dob,
            caste: si.caste,
            subcaste: si.subcaste,
            email: si.email,
            networth: si.networth,
            phonenumber: si.phonenumber,
            level: si.level,
            education: si.education,
            affiliation: si.affiliation


            // freedelivery: tempFreeDelivery,
            // deliveryduration: tempDeliveryDuration,
            // owners: tempOwners,
            // excludedcategories: tempexcludedcategories,
            // excludedproducts: tempexcludedproducts,
            // excludedpopularproducts: tempexcludedpopular,
            // categorysettings: tempcategorysettings,
            // pricechangepercent: si.pricechangepercent,
        };
    }
}
export class Leader {
    id: string;
    mandal: string;
    district: string;
    locality: string;
    iscredit: boolean;
    iscurbsidepickup: boolean;
    isdelivery: boolean;
    ispayonline: boolean;
    name: string;
    about: string;
    state: string;
    states: string;
    village: string;
    streetaddress: string;
    zipcode: string;
    categoriescount: number;
    productscount: number;
    bizcat: string;
    designation: [];
    image: string;
    freedelivery: string;
    deliveryduration: string;
    owners = [];
    excludedcategories = [];
    excludedproducts = [];
    excludedpopularproducts = [];
    categorysettings = [];
    pricechangepercent: number;
    adminid: string;
    adminname: string;
    deliverers: [];
    staffs: [];
    subtype: string;
    affiliation: string;
    storetype: string;
    dob: string;
    caste: string;
    subcaste: string;
    email: string;
    networth: string;
    phonenumber: string;
    level: string;
    education: string;


    constructor() {
        this.education = "";
        this.dob = "";
        this.caste = "";
        this.subcaste = "";
        this.email = "";
        this.networth = "";
        this.phonenumber = "";
        this.level = "";
        this.mandal = "";
        this.district = "";
        this.state = "";
        this.village = "";
        this.states = "";
        this.locality = "";
        this.iscredit = false;
        this.iscurbsidepickup = false;
        this.isdelivery = false;
        this.ispayonline = false;
        this.name = "";
        this.about = "";
        this.state = "";
        this.streetaddress = "";
        this.zipcode = "";
        this.categoriescount = 0;
        this.productscount = 0;
        this.bizcat = "";
        this.designation = [];
        this.image = "";
        this.freedelivery = "";
        this.deliveryduration = "";
        this.owners = [];
        this.excludedcategories = [];
        this.excludedproducts = [];
        this.excludedpopularproducts = [];
        this.categorysettings = [];
        this.pricechangepercent = 0;
        this.adminid = "";
        this.adminname = "";
        this.deliverers = [];
        this.staffs = [];
        this.subtype = '';
        this.affiliation = '';
        this.storetype = '';
        this.dob = '';
    }

    reset() {
        this.education = "";
        this.dob = "";
        this.caste = "";
        this.subcaste = "";
        this.email = "";
        this.networth = "";
        this.phonenumber = "";
        this.level = "";
        this.mandal = "";
        this.locality = "";
        this.iscredit = false;
        this.iscurbsidepickup = false;
        this.isdelivery = false;
        this.ispayonline = false;
        this.name = "";
        this.about = "";
        this.state = "";
        this.village = "";
        this.streetaddress = "";
        this.zipcode = "";
        this.categoriescount = 0;
        this.productscount = 0;
        this.bizcat = "";
        this.designation = [];
        this.image = "";
        this.freedelivery = "";
        this.deliveryduration = "";
        this.owners = [];
        this.excludedcategories = [];
        this.excludedproducts = [];
        this.excludedpopularproducts = [];
        this.categorysettings = [];
        this.pricechangepercent = 0;
        this.adminid = "";
        this.adminname = "";
        this.deliverers = [];
        this.staffs = [];
        this.subtype = '';
        this.affiliation = '';
        this.storetype = '';
    }



}

export class Store {
    name: string;
    address: string;
    locality: string;
    type: string;
 

    constructor() {
        this.name = "";
        this.address = "";
        this.type = "";
        this.locality = "";
      }

    reset() {
        this.name = "";
        this.address = "";
        this.type = "";
        this.locality = "";
    }



}