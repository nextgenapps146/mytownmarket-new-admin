// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBBrrBTvqhr8CKL01_Ub8kzDBQDt7kCIPg",
    authDomain: "my-town-market-new.firebaseapp.com",
    projectId: "my-town-market-new",
    storageBucket: "my-town-market-new.appspot.com",
    messagingSenderId: "748047954314",
    appId: "1:748047954314:web:5dfa6636c374be9860d873"
  },
  mapbox: {
    accessToken:
      'pk.eyJ1IjoibmV4dGdlbmFwcHMxNDYiLCJhIjoiY2ttOThxb241MDhpNDJ2cWwyNmY5emdmMiJ9.H_zdfR-03qKtQhignrDSng',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
