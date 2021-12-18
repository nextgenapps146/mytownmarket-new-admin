import { Component } from "@angular/core";
import { ModalController, NavController, Platform } from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthService } from "src/services/auth.service";
import { UtilityService } from "src/services/utility.service";
// import { FCMService } from "src/services/fcm.service";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase';
import { FirebaseAuthentication } from "@ionic-native/firebase-authentication/ngx";


// import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.page.html",
  styleUrls: ["./sign-in.page.scss"],
})

export class SignInPage {
  windowRef: any;
  prefix: any;
  verifCode: any;
  phoneNumber = "";
  otp = "";
  verificationId: any;
  isOTPRequested = false;
  enableResend = false;
  remainingSecond = 60;
  interval: any;
  params: any;
  isVerificationInprogress = false;
  value = '';
  uid = '';

  constructor(
    private navCtrl: NavController,
    private modalController: ModalController,
    private authService: AuthService,
    private utils: UtilityService,
    private utilityService: UtilityService,
    private route: Router,
    private afs: AngularFirestore,
    public platform: Platform,
    private fireAuth: FirebaseAuthentication
  ) { }

  ionViewWillEnter() {
    this.uid = localStorage.getItem("uid");
    this.windowRef = this.authService.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' });
  }

  home() {
    this.navCtrl.navigateRoot(["./home"]);
  }

  sign_up() {
    this.route.navigate(["./sign-up"]);
  }

  dismiss() {
    this.route.navigate(["./home"]);
  }

  signIn() {
    console.log(this.platform);
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.handleIOSLogin();
      } else {
        this.handleWebAndroidLogin();
      }
    });
  }

  // This needs to be worked on
  validatePhoneNumber() {
    return true;
  }

  handleIOSLogin() {
    if (this.interval !== undefined) {
      clearInterval(this.interval);
    }
    if (!this.phoneNumber && !this.validatePhoneNumber()) {
      this.utils.showToast("Phone number is required");
    } else {
      this.authService.getOtp(this.phoneNumber).then(
        (res) => {
          this.utils.showToast("OTP request is sent");
          this.utils.phonenumber = this.phoneNumber;
          this.isOTPRequested = true;
          this.enableResend = false;
          this.remainingSecond = 60;
          this.verificationId = res;

          console.log('res', res);

          console.log('verification', this.verificationId);
          this.value = JSON.stringify(this.verificationId)
          console.log(this.value);

        },
        (err) => {
          alert(err);
        }
      );
      this.interval = setInterval(() => {
        this.remainingSecond = this.remainingSecond - 1;
        if (this.remainingSecond === 0) {
          this.enableResend = true;
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }

  handleWebAndroidLogin() {
    if (this.interval !== undefined) {
      clearInterval(this.interval);
    }

    if (!this.phoneNumber && !this.validatePhoneNumber()) {
      this.utils.showToast("Phone number is required");
      return;
    }

    this.sendLoginCode().then(
      (res) => {
        this.utils.showToast("OTP request is sent");
        this.utils.phonenumber = this.phoneNumber;
        this.isOTPRequested = true;
        this.enableResend = false;
        this.remainingSecond = 60;
      },
      (err) => {
        alert(err);
      }
    );
    this.interval = setInterval(() => {
      this.remainingSecond = this.remainingSecond - 1;
      if (this.remainingSecond === 0) {
        this.enableResend = true;
        clearInterval(this.interval);
      }
    }, 1000);
  }

  sendLoginCode() {
    //Make sure phone number in e164 format
    const num = this.prefix.toString() + this.phoneNumber.toString();
    const appVerifier = this.windowRef.recaptchaVerifier;
    return firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
        console.log('otp sent')
      }).catch(err => console.log('err1', err))
  }

  confirmOtp() {
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.confirmOtpForIOS();
      } else {
        this.confirmOtpForWebAndroid();
      }
    });
  }

  confirmOtpForIOS() {
    this.verifCode = this.verifCode.toString();
    const signInCredential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, this.verifCode);

    firebase.auth().signInWithCredential(signInCredential).then((result) => {
      console.log(result);
      console.log('verify result', result);
      localStorage.setItem("uid", result.user.uid);
      this.uid = result.user.uid;
      this.authService.getUserDetails(result.user.uid).then((res) => {
        this.isVerificationInprogress = true;
        console.log('user result', res);
        if (res.data() === undefined) {
          this.route.navigate(["./sign-up"]);
        } else {
          localStorage.setItem("uid", result.user.uid)
          localStorage.setItem(this.uid + 'role', res.data()['role']);
          localStorage.setItem(this.uid + 'name', res.data()['fullname']);
          this.utils.isLoggedIn = true;
          localStorage.setItem("isloggedin", "true");
          //  console.log(res.data());

          //  localStorage.setItem("phonenumber", res.data()['phoneNumber']);
          this.routeUser();
        }
      },
        (err) => {
          alert(err);
          this.route.navigate(["./sign-in"]);
        }
      );
    })
  }

  confirmOtpForWebAndroid() {
    return this.windowRef.confirmationResult.confirm(this.verifCode).then((result) => {
      this.uid = result.user.uid;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('uid', this.uid);
      localStorage.setItem(this.uid + "phonenumber", this.phoneNumber);
      this.utils.isLoggedIn = true;
      this.utils.phonenumber = this.phoneNumber;
      this.authService.getUserDetails(this.uid).then((res) => {
        this.isVerificationInprogress = true;
        // this.platform.ready().then(() => {
        //   if (this.platform.is('cordova')) {
        //     console.log('not working');
        //     this.checkUser(result.user.uid);
        //   }
        // });
        const userInfo = res.data();
        if (userInfo === undefined) {
          this.route.navigate(["./sign-up"]);
        } else {
          this.processAfterLoginSuccess(userInfo);
        }
      },
        (err) => {
          alert(err);
          this.route.navigate(["./sign-in"]);
        }
      );
    });
  }

  processAfterLoginSuccess(userInfo) {
    localStorage.setItem(this.uid + 'role', userInfo['role']);
    localStorage.setItem(this.uid + 'fullname', userInfo['fullname']);
    this.routeUser();
  }

  routeUser() {
    if (
      localStorage.getItem("currentpage") === null ||
      localStorage.getItem("currentpage") === undefined ||
      localStorage.getItem("currentpage") === "home"
    ) {
      this.route.navigate(["home"]);
    } else if (localStorage.getItem("currentpage") === "cart") {
      this.route.navigate(["cart"]);
    } else if (localStorage.getItem("currentpage") === "shop") {
      const navigationExtras = {
        queryParams: {
          shopId: localStorage.getItem("storeid"),
        },
      };
      this.route.navigate(["shop"], navigationExtras);
    } else if (localStorage.getItem("currentpage") === "products") {
      const navigationExtras = {
        queryParams: {
          shopId: localStorage.getItem("storeid"),
          categoryId: localStorage.getItem("categoryid"),
          categoryName: localStorage.getItem("categoryname"),
        },
      };
      this.route.navigate(["products"], navigationExtras);
    } else if (localStorage.getItem("currentpage") === "select-address") {
      this.route.navigate(["select-address"]);
    } else if (localStorage.getItem("currentpage") === "offers") {
      this.route.navigate(["offers"]);
    } else {
      this.route.navigate(["home"]);
    }
  }
  saveTokenToFirestore(token, uid) {
    if (!token) return;
    const devicesRef = this.afs.collection("devices");
    const docData = {
      token,
      userid: uid,
    };
    return devicesRef.doc(uid).set(docData);
  }
}
