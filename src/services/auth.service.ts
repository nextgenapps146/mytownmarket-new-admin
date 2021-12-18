import { Injectable } from "@angular/core";
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { FirebaseAuthentication } from "@ionic-native/firebase-authentication/ngx";
import { Router } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import firebase from "firebase";
import { result } from "lodash";
import { UtilityService } from "./utility.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  usersRef: AngularFirestoreCollection;
  uid = '';

  constructor(
    private firebase: FirebaseX,
    private fireAuth: FirebaseAuthentication,
    private router: Router,
    public Afs: AngularFirestore,
    private utils: UtilityService
  ) { }

  get windowRef() {
    return window;
  }

  getUsers(type) {
    this.usersRef = this.Afs.collection("users", (ref) =>
      ref.where("role", "==", type)
    );
    return this.usersRef.snapshotChanges().pipe(
      map((res) =>
        res.map((dataItems) => {
          const data = dataItems.payload.doc.data(),
            id = dataItems.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    console.log('id');
  }

  getUserDetails(uid) {
    return this.Afs.collection("users").doc(uid).ref.get();
  }

  public async updateUser(uid, name) {
    this.usersRef = this.Afs.collection("users");
    await this.usersRef.doc(uid).update({ fullname: name })
      .then((snapshot) => {
        console.log('user registered', snapshot);
        localStorage.setItem(uid + "name", name);
        this.utils.showToast('Full Name Updated');
      });
    return result;
  }

  checkLogin(): boolean {
    if (localStorage.getItem("isLoggedIn") === "true") {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("uid");
    this.router.navigate(["./home"]);
  }

  getOtp(phoneNumber) {
    console.log('phone', phoneNumber);

    return this.fireAuth.verifyPhoneNumber("+91" + phoneNumber, 60);
  }

  verifyOtp(verificationId, otp) {

    // const signInCredential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);           

    // return firebase.auth().signInWithCredential(signInCredential).then((success) => {
    //   console.log(success);

    // })

    // console.log('verifyid', verificationId);

    // console.log('otp', otp);

    // this.fireAuth.signInWithVerificationId(verificationId,otp);
  }

  getUserInfo() {
    return this.firebase.getCurrentUser();
  }

  checkUser(userId) {
    if (userId) {
      this.usersRef = this.Afs.collection("users");
      return this.usersRef
        .doc(userId)
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

  createUser(name) {
    this.usersRef = this.Afs.collection("users");
    const uid = localStorage.getItem("uid");

    this.usersRef.doc(uid).set({
      fullname: name,
      created_on: new Date(),
      role: "user",
    }).then((snapshot) => {
        localStorage.setItem(uid + "fullname", name);
        this.router.navigate(["./home"]);
      });
  }
}
