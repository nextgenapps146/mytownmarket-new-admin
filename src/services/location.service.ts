import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LocationService {
  uid = '';
  locationRef: AngularFirestoreCollection;

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

  getLocality() {
    this.locationRef = this.Afs.collection('availablelocations', (ref) =>
      ref.where('entity', '==', 'locality')
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

  getMandals(district: string) {
    this.locationRef = this.Afs.collection('availablelocations', (ref) =>
      ref.where('l', '==', district).where('entity', '==', 'mandal')
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

  
  getStates() {
    this.locationRef = this.Afs.collection('availablelocations', (ref) =>
        ref.where('entity', '==', 'state')
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

getDistricts(state) {
  this.locationRef = this.Afs.collection('availablelocations', (ref) =>
      ref.where('entity', '==', 'district').where('state', '==', state)
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

  getVillages(mandal: string) {
    this.locationRef = this.Afs.collection('availablelocations', (ref) =>
      ref.where('mandal', '==', mandal).where('entity', '==', 'village')
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
  public async createCity(result) {
    this.uid = localStorage.getItem('uid');
    var nearbylocalities = result.nearbylocalities.split(","); 
    result.nearbylocalities = nearbylocalities;
    result.createdbyname = localStorage.getItem(this.uid + 'fullname');
    console.log(localStorage.getItem(this.uid + 'fullname'));
    result.createdbyphoneno = localStorage.getItem(this.uid + 'phonenumber');
    result.createdbyid = localStorage.getItem('uid');
    result.createdon = new Date();
    // result.status = 'new',
    this.locationRef = this.Afs.collection('availablelocations');
    await this.locationRef.add({ ...result }).then((snapshot) => {
      // console.log(snapshot.id);
      // localStorage.setItem("draftrecordid", snapshot.id);
    });
  }


  getDraftlocations(uid) {
    this.locationRef = this.Afs.collection('draftlocations', (ref) =>
      ref.where('createdbyid', '==', uid).where('status', '==', 'Location Approved')
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

  getDraftleaders(uid) {
    this.locationRef = this.Afs.collection('draftleaders', (ref) =>
      ref.where('createdbyid', '==', uid).where('status', '==', 'Leader Approved')
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








  getLocationDetails(locationName) {
    this.locationRef = this.Afs.collection("availablelocations", (ref) =>
      ref.where("name", "==", locationName));
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

  getLocalities(locationName) {
    this.locationRef = this.Afs.collection("availablelocalities", (ref) =>
      ref.where("city", "==", locationName)
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

}


export class City {
  name: string;
  mandal: string;
  state: string;
  country: string;
  district: string;
  entity: string;

  constructor() {
    this.name = '';
    this.mandal = '';
    this.state = '';
    this.country = '';
    this.district = '';
    this.entity = 'village';
  }
}

export class Locality {
  name: string;
  city: string;
  entity: string;
  zone: string;
  nearbylocalities: string;
  zipcode: string;

  constructor() {
    this.name = '';
    this.city = '';
    this.zone = '';
    this.nearbylocalities = '';
    this.zipcode = '';
    this.entity = '';
  }
}