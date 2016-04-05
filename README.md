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
