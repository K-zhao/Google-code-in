# ![Fedora-Logo](https://pagure.io/Fedora-app/raw/master/f/Screenshots/FedoraLogo.png) Fedora App

![Screenshot](https://pagure.io/Fedora-app/raw/master/f/Screenshots/HomeScreen.png)

The Fedora App provides a central location for Fedora users and contributors to stay updated on The Fedora Project. News updates, social posts, Ask Fedora, as well as articles from Fedora Magazine are all held under this app.

This is the source for the Fedora App.

## Technologies Used

Angular, Ionic 3, TypeScript, SCSS

## Current features

1. Fedora Magazine
    * Browse recent articles from Fedora Magazine
    * Share articles via Facebook, e-Mail, text, and more
    * Be taken directly to Fedora Magazine official site.
2. Fedora Social
    * View updates of Fedora's Facebook news Feed
    * Also links to official Facebook page
3. Ask Fedora
    * Browse and ask questions about Fedora Linux to Ask Fedora
    * Share questions and comments.
    * Search, vote, and answer questions.
4. Fedora Calendar
    * View events for Fedora from all different SIGs including QA, budget, classroom, etc.
    * Add event to device calendar directly from app.
    * View the date, time, and description of the event.

## Pre-requisites

* [Download the installer](https://nodejs.org/) for Node.js 6 or greater.
  * You can also install NodeJS LTS from Fedora repos using dnf: `sudo dnf install nodejs`
* Install the ionic CLI globally: `npm install -g ionic`
* Install compilers and headers, required by native addons:
  * [Python](https://developer.fedoraproject.org/tech/languages/python/python-installation.html)
    * `sudo dnf install python2`
    * Note: Python 3 is _not supported_. See the requirements [here](https://github.com/nodejs/node-gyp#installation).
  * [GCC, G++ and make](https://developer.fedoraproject.org/tech/languages/c/c_installation.html)
    * `sudo dnf install gcc gcc-c++ make`
  * [GNU Autotools](https://developer.fedoraproject.org/tech/languages/c/autotools.html)
    * `sudo dnf install autoconf automake`
  * libpng headers
    * `sudo dnf install libpng-devel`

_Note: You may need to add “sudo” in front of any global commands to install the utilities. See [npm documentation](https://docs.npmjs.com/getting-started/fixing-npm-permissions) for more details._

### Building for Android

* Install Java compilers: `sudo dnf install java-devel`
* Install [Android SDK](https://developer.android.com/studio/index.html) and the system packages documented [here](https://developer.fedoraproject.org/start/sw/mobile-app/mobile-installation.html)
* Install Gradle. Unfortunately, Fedora repos includes a rather old version of Gradle, so we recommend you to follow the instructions documented [here](https://gradle.org/install/#with-a-package-manager)
* Configure your `JAVA_HOME` and `ANDROID_HOME` to point to Java and Android SDK installation directories respectively.

## Getting Started

* Clone this repository: `git clone https://pagure.io/Fedora-app.git`.
* Run `npm install` from the project root.
* Copy `src/app/config.env.ts.example` to `src/app/config.dev.ts` and `src/app/config.prod.ts`. Replace the example API keys inside them with real API keys.
* Run `ionic serve` in a terminal from the project root.
* Open http://localhost:8100 to preview your app.
* Profit. :tada:

## Deploying

* PWA - Run `npm run ionic:build --prod` and then push the `www` folder to your favorite hosting service
* Android - Run `ionic cordova run android --prod`
* iOS - Run `ionic cordova run ios --prod`

_Ommitting the `--prod` will generate a debug build which is useful for Android/iOS remote debugging._

### Using Ionic DevApp for rapid testing on mobile devices

[Ionic DevApp](https://ionicframework.com/docs/pro/devapp/) is a free app that makes it easy to run your Ionic apps directly on an iOS or Android device. This avoids the cumbersome Native SDK installations.

* Install Ionic DevApp on your phone.
* Connect your phone and computer to the same network.
* Run `ionic serve -c` from the project root.
* Open Ionic DevApp and lanuch Fedora app from the list of available apps.

_Note: Network policies and firewalls may interfere with Ionic DevApp, in that case try on a different network_

### Running unit tests

#### Unit tests
`npm test` runs all unit tests defined in the app.

#### Integration tests

1. Start the ionic dev server with `npm run ionic:serve -b`. Wait for the dev
   server to start.
2. In a different terminal window start the tests with `npm run e2e`

#### Contributors

* Sudhir Dharanendraiah
* Arvind Chembarpu
* Sumantro Mukherjee
* Kanika Murarka
* Amitosh Swain Mahapatra
* Abhishek Sharma
* RP Herrold
* Manaswini Das
* Lauren LeGardye