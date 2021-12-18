import { Injectable } from '@angular/core';
import {
    AngularFirestoreCollection,
    AngularFirestore,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class SchemeService {
    schemeRef: AngularFirestoreCollection;

    constructor(public Afs: AngularFirestore) { }

    public getParties() {
        this.schemeRef = this.Afs.collection('parties'
        );
        return this.schemeRef.snapshotChanges().pipe(
            map((res) =>
                res.map((dataItems) => {
                    const data = dataItems.payload.doc.data();
                    return { id: dataItems.payload.doc.id, ...data };
                })
            )
        );
    }

    public async getSchemeDetails(partyId) {
        if (partyId) {
            this.schemeRef = this.Afs.collection('schemes');
            return this.schemeRef.doc(partyId).snapshotChanges().pipe(map((res: any) => {
                const result = res.payload.data();
                if (result) {
                    result.id = res.payload.id;
                }
                return result;
            }));
        }
    }
}
