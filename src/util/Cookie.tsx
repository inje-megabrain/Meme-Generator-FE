import React from "react";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getCookie = (name: string) => {
  return cookies.get(name);
};
export const setCookie = (name: string, value: string, options?: any) => {
  return cookies.set(name, value, { path: "/", ...options });
};
export const removeCookie = (name: string, options?: any) => {
  return cookies.remove(name, options);
};
