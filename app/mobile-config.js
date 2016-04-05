App.info({
    id: 'com.partup.app',
    name: 'Part-up',
    description: 'Enhance your Part-up experience with the app.',
    author: 'Part-up',
    email: 'info@part-up.com',
    website: 'https://part-up.com'
});

// Set up icons
App.icons({
    // 'iphone': 'icons/icon-60.png',
    // 'iphone_2x': 'icons/icon-60@2x.png',
    // ... more screen sizes and platforms ...
});

// Set up launch screens
App.launchScreens({
    // 'iphone': 'splash/Default~iphone.png',
    // 'iphone_2x': 'splash/Default@2x~iphone.png',
    // ... more screen sizes and platforms ...
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0x57c0c9ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'portrait');

// Access rule
App.accessRule('*');
