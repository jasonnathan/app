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
    iphone_2x: 'resources/splash/iphone_2x.png',
    iphone5: 'resources/splash/iphone5.png',
    iphone6: 'resources/splash/iphone6.png',
    iphone6p_portrait: 'resources/splash/iphone6p_portrait.png',
    ipad_portrait: 'resources/splash/ipad_portrait.png',
    ipad_portrait_2x: 'resources/splash/ipad_portrait_2x.png',
    android_mdpi_portrait: 'resources/splash/android_mdpi_portrait.png',
    android_hdpi_portrait: 'resources/splash/android_hdpi_portrait.png',
    android_xhdpi_portrait: 'resources/splash/android_xhdpi_portrait.png',
    android_xxhdpi_portrait: 'resources/splash/android_xxhdpi_portrait.png'
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0x57c0c9ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'portrait');
App.setPreference('StatusBarOverlaysWebView', true);
App.setPreference('StatusBarStyle', 'lightcontent');

// Access rule
App.accessRule('*');
