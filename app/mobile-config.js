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
    iphone_2x: 'resources/icons/120.png',
    iphone_3x: 'resources/icons/180.png',
    ipad: 'resources/icons/76.png',
    ipad_2x: 'resources/icons/152.png',
    ipad_pro: 'resources/icons/167.png',
    ios_settings: 'resources/icons/29.png',
    ios_settings_2x: 'resources/icons/58.png',
    ios_settings_3x: 'resources/icons/87.png',
    ios_spotlight: 'resources/icons/40.png',
    ios_spotlight_2x: 'resources/icons/80.png',
    android_mdpi: 'resources/icons/48.png',
    android_hdpi: 'resources/icons/72.png',
    android_xhdpi: 'resources/icons/96.png',
    android_xxhdpi: 'resources/icons/144.png',
    android_xxxhdpi: 'resources/icons/192.png'
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
App.setPreference('StatusBarOverlaysWebView', true);
App.setPreference('StatusBarStyle', 'lightcontent');

// Access rule
App.accessRule('*');
