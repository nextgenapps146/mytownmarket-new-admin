import { Injectable } from '@angular/core';
import {
    AngularFirestoreCollection,
    AngularFirestore,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class StoreService {
    storeRef: AngularFirestoreCollection;

    constructor(public Afs: AngularFirestore) { }

    public getLocationOfficials(locationName: string, entity: string, level: string) {
        this.storeRef = this.Afs.collection('stores', (ref) =>
            ref.where(entity, '==', locationName).where('level', '==', level)
        );
        return this.storeRef.snapshotChanges().pipe(
            map((res) =>
                res.map((dataItems) => {
                    const data = dataItems.payload.doc.data();
                    return { id: dataItems.payload.doc.id, ...data };
                })
            )
        );
    }

    public getSchemes() {
        this.storeRef = this.Afs.collection('schemes');
        return this.storeRef.snapshotChanges().pipe(
            map((res) =>
                res.map((dataItems) => {
                    const data = dataItems.payload.doc.data();
                    return { id: dataItems.payload.doc.id, ...data };
                })
            )
        );
    }


    public getLocationOffices(locationName: string, entity: string) {
        this.storeRef = this.Afs.collection('stores', (ref) =>
            ref.where(entity, '==', locationName).where('type', '==', 'Office')
        );
        return this.storeRef.snapshotChanges().pipe(
            map((res) =>
                res.map((dataItems) => {
                    const data = dataItems.payload.doc.data();
                    return { id: dataItems.payload.doc.id, ...data };
                })
            )
        );
    }

    public getLocationHospitals(locationName: string, entity: string) {
        this.storeRef = this.Afs.collection('stores', (ref) =>
            ref.where(entity, '==', locationName).where('type', '==', 'hospital')
        );
        return this.storeRef.snapshotChanges().pipe(
            map((res) =>
                res.map((dataItems) => {
                    const data = dataItems.payload.doc.data();
                    return { id: dataItems.payload.doc.id, ...data };
                })
            )
        );
    }


    public async getStoreInfo(shopId) {
        if (shopId) {
            this.storeRef = this.Afs.collection('stores');
            return this.storeRef
                .doc(shopId)
                .snapshotChanges()
                .pipe(
                    map((res: any) => {
                        const result = res.payload.data();
                        if (result) {
                            result.id = res.payload.id;
                        }
                        return result;
                    })
                );
        }
    }
}
