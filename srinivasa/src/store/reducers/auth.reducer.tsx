import {
  LOGIN_USER,
  LOGIN_USER_DATA,
  LOGOUT_USER,
  SET_MESSAGE_COUNT,
  DEEPLINK,
  SHOW_VIDEO,
} from '../actions/auth.action';

export interface AuthParams {
  token?: string;
  videoPlayed?: boolean;
  deeplink?: string;
  user?: any;
  count?: number;
}

const initialData: AuthParams = {
  token: undefined,
  user: undefined,
  videoPlayed: false,
  count: undefined,
  deeplink: undefined,
};
const authReducer = (state = initialData, action: any): AuthParams => {
  switch (action.type) {
    case LOGIN_USER:
      state = {...state, token: action.token};
      console.log(action.token, 'token from redux');
      // LocalStorage.setItem('userData', action.token);
      // Communications.updateLoginUserTokenSubject.next(action.token);
      return state;
    case LOGIN_USER_DATA:
      state = {...state, user: action.user};
      // LocalStorage.setItem('userId', action.user?.id.toString());
      // console.log(action.user, action.user?.id, 'token from redux-----');
      // Communications.updateActiveUserIdSubject.next(action.user?.id.toString());
      return state;
    case SET_MESSAGE_COUNT:
      state = {...state, count: action.count};
      return state;
    case SHOW_VIDEO:
      state = {...state, videoPlayed: action.videoPlayed};
      return state;
    case DEEPLINK:
      state = {...state, deeplink: action.deeplink};
      return state;
    case LOGOUT_USER:
      // LocalStorage.removeItem('userData');
      // LocalStorage.removeItem('userId');
      state = {
        user: undefined,
        token: undefined,
      };
      // Communications.updateLoginUserTokenSubject.next(undefined);
      // Communications.updateActiveUserIdSubject.next(undefined);
      return state;
    default:
      return state;
  }
};

export default authReducer;
