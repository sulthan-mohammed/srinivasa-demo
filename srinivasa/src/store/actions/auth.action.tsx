export const LOGIN_USER = 'LOGIN_USER';
export const SHOW_VIDEO = 'SHOW_VIDEO';
export const LOGIN_USER_DATA = 'LOGIN_USER_DATA';
export const LOGOUT_USER = 'LOGOUT_USER';
export const GET_MESSAGE_COUNT = 'GET_MESSAGE_COUNT';
export const SET_MESSAGE_COUNT = 'SET_MESSAGE_COUNT';
export const DEEPLINK = 'DEEPLINK';

export const loginUser = (token: string) => {
  return {type: LOGIN_USER, token};
};

export const showVideoPlayer = (videoPlayed: boolean) => {
  return {type: SHOW_VIDEO, videoPlayed};
};

export const loginUserData = (user: any) => {
  return {type: LOGIN_USER_DATA, user};
};

export const logoutUser = () => {
  return {type: LOGOUT_USER};
};

export const deeplinkUrl = (deeplink: string) => {
  return {type: DEEPLINK, deeplink};
};

export const getMessageCount = () => {
  return {type: GET_MESSAGE_COUNT};
};

export const setMessageCount = (count?: number) => {
  return {type: SET_MESSAGE_COUNT, count};
};
