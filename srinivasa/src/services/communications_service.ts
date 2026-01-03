import {Subject} from 'rxjs';
const logoutSubject: Subject<any> = new Subject<boolean>();
const updateLoginUserTokenSubject: Subject<string | undefined> = new Subject<
  string | undefined
>();
const NetworkChangeSubject: Subject<boolean> = new Subject<boolean>();
const updateActiveUserIdSubject: Subject<string | undefined | null> =
  new Subject<string | undefined | null>();

const getNotificationSubject: Subject<string | undefined> = new Subject<
  string | undefined
>();
// const ReloadStateSubject: Subject<boolean> = new Subject<boolean>();

export {
  logoutSubject,
  updateLoginUserTokenSubject,
  NetworkChangeSubject,
  // ReloadStateSubject,
  updateActiveUserIdSubject,
  getNotificationSubject,
};
