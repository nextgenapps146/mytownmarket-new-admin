building aab file for playstore

step 1 required for generating (only once)

1.generate jks file

keytool -genkey -v -keystore release.jks -keyalg RSA -storepass nov2021 -alias release -keypass nov2021 -keysize 2048 -validity 10000 -dname "cn=rishi"

(or)

keytool -genkey -v -keystore release.jks
-keyalg RSA
-keysize 2048 -validity 10000

--------
Generating 2,048 bit RSA key pair and self-signed certificate (SHA256withRSA) with a validity of 10,000 days
        for: CN=rishi s, OU=mytownpolitics, O=mytownpolitics, L=warangal, ST=telangana, C=in

nov2021

2. building apk,aab

ionic cordova build android --prod  --release -- -- --packageType=bundle

3. signing aab

jarsigner -sigalg SHA256withRSA -digestalg SHA-256 -keystore release.jks ./platforms/android/app/build/outputs/bundle/release/app-release.aab release

Build notes :

For Android : need to comment 
google.services 
under plaform/android/app/build.gradle

for Ios : need to 
Info - url schema for recaptcha under xcode -
 target- info - url schema
com.googleusercontent.apps.748047954314-ivcm30t9qbir1aeiu1sf28ilq4cr8qi9
