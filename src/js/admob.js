import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

export async function initializeAdMob() {
    // Only run AdMob on native platforms (Android/iOS)
    if (!Capacitor.isNativePlatform()) {
        console.log('AdMob skipped (Web Platform detected)');
        return;
    }

    try {
        await AdMob.initialize({
            requestTrackingAuthorization: true,
            // testingDevices: ['YOUR_DEVICE_ID'], 
            initializeForTesting: false,
        });

        console.log('AdMob initialized');
        showBanner();
    } catch (e) {
        console.error('Failed to initialize AdMob', e);
    }
}

async function showBanner() {
    if (!Capacitor.isNativePlatform()) return;

    try {
        const options = {
            adId: 'ca-app-pub-6712736690824258/7826723318',
            adSize: BannerAdSize.BANNER,
            position: BannerAdPosition.BOTTOM,
            margin: 0,
        };

        await AdMob.showBanner(options);
        console.log('Banner shown');
    } catch (e) {
        console.error('Failed to show banner', e);
    }
}
