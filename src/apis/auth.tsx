import React from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "../constants/Constants";
import jwtDecode from "jwt-decode";
import { decodedjwtType } from "../types";
import { setCookie } from "../util/Cookie";

const headerConfig = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const loginAPI = (id: string, password: string) => {
  axios
    .post(
      API_URL + "/login",
      { username: id, password: password },
      {
        headers: headerConfig,
      }
    )
    .then((response) => {
      console.log(response);
      const decodeToken: decodedjwtType = jwtDecode(response.data.accessToken);
      setCookie("access_token", decodeToken.sub, {
        path: "/",
      });
      console.log(decodeToken);
      if (response.data.accessToken) {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      if (error.response.status == 401) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    });
};
const SignUpAPI = (
  id: string,
  password: string,
  name: string,
  email: string
) => {
  axios
    .post(
      API_URL + "/member",
      { username: id, password: password, name: name, email: email },
      {
        headers: headerConfig,
      }
    )
    .then((response) => {
      console.log(response);
      window.location.href = "/login";
    })
    .catch((error) => {
      console.log(error);
    });
};

export { loginAPI, SignUpAPI };
