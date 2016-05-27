Part-up mobile app
==================

This app uses Meteor's `DDP.connect()` to manually connect to the server hosted at [the part-up/part-up repository](https://github.com/part-up/part-up).

[![Join the chat at https://gitter.im/part-up/part-up](https://badges.gitter.im/part-up/part-up.svg)](https://gitter.im/part-up/part-up?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

OS Prerequisites
----------------

Nothing but [Meteor](https://www.meteor.com/install)

Getting started
---------------

Before contributing, please read [CONTRIBUTING.md](https://github.com/part-up/app/blob/master/CONTRIBUTING.md) carefully.

    $ cd app
    $ meteor npm install
    $ cd ..
    $ ./start

In another terminal, start the app from the [part-up/part-up repository](https://github.com/part-up/part-up).

    $ ./start

Visit the app at [http://localhost:4000](http://localhost:4000).

Running on iOS and Android
--------------------------

**iOS**

    $ ./run-ios

**Android**

    $ ./run-android

Adding an npm package
---------------------

    $ cd app
    $ meteor npm install --save some-package

Adding a Cordova plugin
-----------------------

    $ cd app
    $ meteor add cordova:<cordova-plugin-name>@<version>

Releasing
---------

### iOS

- `$ cd app`
- `$ meteor npm install`
- `$ meteor build ../output --mobile-settings ../config/<environment>/settings.json --server <partup-url>` (replace <environment> with acceptance or production and <partup-url> with the part-up server url)
- Open the project **/output/ios/project/Part-up.xcodeproj** in Xcode.
- Go to Part-up's General settings
    - Select "8.0" (under Deployment Info > Deployment Target)
    - Select "iPhone" (under Deployment Info > Devices)
    - Uncheck "Upside Down" (under Deployment Info > Device Orientation)
    - Select "Light" (under Deployment Info > Status Bar Style)
    - Check "Hide status bar" (under Deployment Info > Status Bar Style)
- Go to Part-up's Build settings
    - Add "@executable_path/Frameworks" to Release (under Linking > Runpath Search Paths)
- From the top menu, select "Product > Archive" and wait untill the process completes
- An archives window should pop up.
- Select the latest version and hit "Upload to App Store..."
- When asked, choose the correct Development Team.
- Check the Binary and Entitlements and hit Upload.
- Wait until the build is processed by Apple at itunesconnect.apple.com.
- Release the build for internal testing, external testing or production.

### Android

- Obtain the **android-keystore** file from a colleague, put it in the repo root and ask for the passphrase.
- To create the final APK before publishment, you have to sign and align it.
    - `$ cd app`
    - `$ meteor npm install`
    - `$ meteor build ../output --mobile-settings ../config/<environment>/settings.json --server <partup-url>` (replace <environment> with acceptance or production and <partup-url> with the part-up server url)
    - `$ cd ..`
    - `$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore android-keystore output/android/project/build/outputs/apk/android-armv7-release-unsigned.apk part-up-android`
    - $ANDROID_HOME/build-tools/<build-tools-version>/zipalign 4 output/android/project/build/outputs/apk/android-armv7-release-unsigned.apk part-up.apk
- Test your build by running it on an Android device:
    - Connect an Android device.
    - Remove the app from the Android device if the app already exists.
    - Install the app using `adb install part-up.apk`.
    - Start the app.
- If you are satisfied with the APK, publish it to Google Play:
    - Go to Google Play's Developer Console: **https://play.google.com/apps/publish**
    - Click on Alpha / Beta / Production.
    - Upload your new APK using the upload button.
    - After a few hours, the new version should be available to everyone.
