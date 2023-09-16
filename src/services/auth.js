import Cookies from 'js-cookie';

import { COOKIE_TOKEN, COOKIE_USER } from "../constants";

export const isAuth = () => Cookies.get(COOKIE_TOKEN) !== undefined;

export const getToken = () => Cookies.get(COOKIE_TOKEN);
export const setToken = (token) => Cookies.set(COOKIE_TOKEN, token);

export const getUser = () => Cookies.get(COOKIE_USER) !== undefined && JSON.parse(Cookies.get(COOKIE_USER))
export const setUser = (user) => Cookies.set(COOKIE_USER, JSON.stringify(user));

export const signout = () => {
  Cookies.remove(COOKIE_TOKEN);
  Cookies.remove(COOKIE_USER);
  return window.location.assign("/");
};