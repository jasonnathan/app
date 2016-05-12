App.info({
    id: 'com.partup.app',
    name: 'Part-up',
    version: '0.1.4',
    description: 'Enhance your Part-up experience with the app.',
    author: 'Part-up',
    email: 'info@part-up.com',
    website: 'https://part-up.com'
});

// Set up icons
App.icons({
    iphone_2x: 'resources/icons/iphone_2x.png',
    iphone_3x: 'resources/icons/iphone_3x.png',
    ipad: 'resources/icons/ipad.png',
    ipad_2x: 'resources/icons/ipad_2x.png',
    ipad_pro: 'resources/icons/ipad_pro.png',
    ios_settings: 'resources/icons/ios_settings.png',
    ios_settings_2x: 'resources/icons/ios_settings_2x.png',
    ios_settings_3x: 'resources/icons/ios_settings_3x.png',
    ios_spotlight: 'resources/icons/ios_spotlight.png',
    ios_spotlight_2x: 'resources/icons/ios_spotlight_2x.png',
    android_mdpi: 'resources/icons/android_mdpi.png',
    android_hdpi: 'resources/icons/android_hdpi.png',
    android_xhdpi: 'resources/icons/android_xhdpi.png',
    android_xxhdpi: 'resources/icons/android_xxhdpi.png',
    android_xxxhdpi: 'resources/icons/android_xxxhdpi.png'
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
App.setPreference('HideKeyboardFormAccessoryBar', false);
App.setPreference('DisallowOverscroll', true);
App.setPreference('Orientation', 'portrait');
App.setPreference('StatusBarOverlaysWebView', true);
App.setPreference('StatusBarStyle', 'lightcontent');
App.setPreference('AutoHideSplashScreen', false);
App.setPreference('ShowSplashScreenSpinner', false);
App.setPreference('FadeSplashScreenDuration', 300);

// Configure Push Notifications plugin
App.configurePlugin('phonegap-plugin-push', {
    'SENDER_ID': '963161275015' // only for Android
});

// Access rule
App.accessRule('*');
