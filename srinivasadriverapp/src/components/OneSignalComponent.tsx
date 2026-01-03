// import React, {useCallback, useEffect, useRef} from 'react';
// import {OneSignal, LogLevel} from 'react-native-onesignal';
// import {Subscription} from 'rxjs/internal/Subscription';
// import {ENV} from '../constants';
// import {Communications} from '../shared/services';
//
// const OneSignalComponent = () => {
//   const updateActiveUserIdSubscription = useRef<Subscription | null>(null);
//   const setPushNotificationMap = useCallback(
//     (externalUserId?: string | null) => {
//       console.log(externalUserId, 'externalUserId');
//
//       if (externalUserId) {
//         console.log('logging in');
//         const id = `user_${externalUserId}`;
//         console.log(id, 'externalId');
//         OneSignal.login(id);
//       } else {
//         OneSignal.logout();
//       }
//     },
//     [],
//   );
//
//   useEffect(() => {
//     /* O N E S I G N A L   S E T U P */
//     if (ENV.onesignalId != null) {
//       console.log(ENV.onesignalId, 'llkkkkkkk');
//       OneSignal.initialize(ENV.onesignalId);
//     }
//     OneSignal.Debug.setLogLevel(LogLevel.Verbose);
//     // OneSignal.setRequiresUserPrivacyConsent(false);
//     // OneSignal.User.pushSubscription.getPushSubscriptionId();
//     console.log('Came here....');
//
//     // if (CommonFunctions.isIOS()) {
//     // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
//     OneSignal.Notifications.requestPermission(true);
//     // }
//
//     OneSignal.User.pushSubscription.addEventListener('change', subscription => {
//       console.log('OneSignal: subscription changed:', subscription);
//     });
//
//     const onesignalEvents = async () => {
//       console.log('coming here');
//       await OneSignal.User.pushSubscription.getTokenAsync();
//       await OneSignal.User.pushSubscription.getIdAsync();
//     };
//
//     onesignalEvents();
//
//     // Removes the previously added listener
//     // OneSignal.User.pushSubscription.removeEventListener('change', myListener);
//     OneSignal.Notifications.addEventListener('click', event => {
//       console.log('OneSignal: notification clicked:', event.result.url);
//       Communications.getNotificationSubject.next(event.result.url);
//     });
//   }, []);
//
//   useEffect(() => {
//     updateActiveUserIdSubscription.current =
//       Communications.updateActiveUserIdSubject.subscribe(value => {
//         setPushNotificationMap(value);
//       });
//     return () => {
//       updateActiveUserIdSubscription.current?.unsubscribe();
//     };
//   }, [setPushNotificationMap]);
//   return <></>;
// };
//
// export default OneSignalComponent;
