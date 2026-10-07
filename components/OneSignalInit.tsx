'use client';

import { useEffect } from 'react';
import OneSignal from '@onesignal/capacitor-plugin';
import { Capacitor } from '@capacitor/core';

export default function OneSignalInit() {
  useEffect(() => {
    // Prevent execution on Web / SSR (Only run natively inside Capacitor)
    if (!Capacitor.isNativePlatform()) return;

    const initPushNotifications = async () => {
      try {
        // 1. Initialize OneSignal with App ID
        OneSignal.initialize('f8ed9fac-d848-4ef6-be40-e7cc96ecaab4');

        // 2. Prompt user for native Push Permissions
        await OneSignal.Notifications.requestPermission(true);

        // 3. (Optional) Event listener for when user taps a notification
        OneSignal.Notifications.addEventListener('click', (event) => {
          console.log('Notification clicked by user:', event);
        });
      } catch (error) {
        console.error('Error initializing OneSignal:', error);
      }
    };

    initPushNotifications();
  }, []);

  return null;
}