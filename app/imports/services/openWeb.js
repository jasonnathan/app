'use strict';

export default function openWeb(url) {
    const encodedUrl = window.encodeURI(url);
    let executeScript;

    if (window.cordova) {
        const closeButton = 'Done';
        const inAppBrowserInstance = window.cordova.InAppBrowser.open(encodedUrl, '_system', `location=no,zoom=yes,enableViewportScale=yes,closebuttoncaption=${closeButton}`);

        executeScript = (fnString) => {
            inAppBrowserInstance.executeScript({code: fnString});
        }
    } else {
        let w = 992, h = 600, l = 50, t = 50;

        if (window.screen) {
            w = window.screen.availWidth * 90 / 100;
            h = window.screen.availHeight * 80 / 100;
            l = window.screen.availWidth * 5 / 100
            t = window.screen.availHeight * 10 / 100
        }

        const popupInstance = window.open(encodedUrl, 'popup', `width=${w},height=${h},left=${l},top=${t},location=0,resizable=1`);

        executeScript = (fnString) => {
            //todo
        };
    }

    const loginToken = window.localStorage.getItem('Meteor.loginToken');
    // executeScript(`Meteor.loginWithToken('${loginToken}');`);
};
