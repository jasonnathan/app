The codebase setup is currently in progress.
---

Part-up mobile app
==================

[![Join the chat at https://gitter.im/part-up/part-up](https://badges.gitter.im/part-up/part-up.svg)](https://gitter.im/part-up/part-up?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## OS Prerequisites
- [Meteor](https://www.meteor.com/install)

## Getting started
Before contributing, please read [CONTRIBUTING.md](https://github.com/part-up/app/blob/master/CONTRIBUTING.md) carefully.

- `cd app`
- `meteor npm install` - install all packages defined in package.json while staying in Meteor's NodeJS-container
- `cd ..`
- `./start` - start the application

## Running on iOS and Android
- `./run-ios` - start the application on a connected iOS device or in the simulator
- `./run-android` - start the application on a connected Android device or in the simulator

## Adding an npm package
To add an npm package:

- `cd app`
- `meteor npm install --save my-package` - write a module to package.json and install it while staying in Meteor's NodeJS-container

## Adding a Cordova plugin
To add a cordova plugin:

- `cd app`
- `meteor add cordova:<cordova-plugin-name>@<version>`

## releasing

### ios

<TODO>

### android

- Obtain the **android-keystore** file from a colleague, put it in the repo root and ask for the passphrase.
- To create the final APK before publishment, you have to sign and align it.
    - `cd app`
    - `meteor build ../output --server https://pu-acceptance.lifely.nl`
    - `cd ..`
    - `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore android-keystore output/android/project/build/outputs/apk/android-armv7-release-unsigned.apk part-up-android`
    - $ANDROID_HOME/build-tools/<build-tools-version>/zipalign 4 output/android/project/build/outputs/apk/android-armv7-release-unsigned.apk part-up.apk
- Test your build by running it on an Android device:
    - Connect an Android device.
    - Remove the app from the Android device if the app already exists.
    - Install the app using `adb part-up.apk`.
    - Start the app.
- If you are satisfied with the APK, publish it to Google Play:
    - Go to Google Play's Developer Console: **https://play.google.com/apps/publish**
    - Click on Alpha / Beta / Production.
    - Upload your new APK using the upload button.
    - After a few hours, the new version should be available to everyone.
