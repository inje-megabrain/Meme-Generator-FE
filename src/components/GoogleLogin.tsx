import { useEffect } from "react";
import { oauthLoginAPI } from "../apis/auth";
import React from "react";

const GoogleLogin = () => {
  const code = new URL(window.location.href).searchParams.get("token");

  useEffect(() => {
    oauthLoginAPI(code as string);
  }, []);
  return <></>;
};
export default GoogleLogin;
