import { Injectable } from '@angular/core';
import {
    AngularFirestoreCollection,
    AngularFirestore,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class PartyService {
    partyRef: AngularFirestoreCollection;

    constructor(public Afs: AngularFirestore) { }

    public getParties() {
        this.partyRef = this.Afs.collection('parties'
        );
        return this.partyRef.snapshotChanges().pipe(
            map((res) =>
                res.map((dataItems) => {
                    const data = dataItems.payload.doc.data();
                    return { id: dataItems.payload.doc.id, ...data };
                })
            )
        );
    }

    public async getPartyDetails(partyId) {
        if (partyId) {
            this.partyRef = this.Afs.collection('parties');
            return this.partyRef.doc(partyId).snapshotChanges().pipe(map((res: any) => {
                const result = res.payload.data();
                if (result) {
                    result.id = res.payload.id;
                }
                return result;
            }));
        }
    }
}
