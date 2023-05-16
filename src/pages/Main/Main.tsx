import React from "react";
import { useNavigate } from "react-router-dom";
import Wantedmodal from "../../components/Wantedmodal";
import { getCookie, removeCookie } from "../../util/Cookie";

const Main = () => {
  const navigate = useNavigate();

  const cookie = getCookie("access_token");

  const homebtn = () => {
    window.location.reload();
  };

  const signbtn = () => {
    navigate("/login");
  };
  const logoutbtn = () => {
    removeCookie("access_token", { path: "/" });
    window.location.reload();
  };
  const generator = () => {
    navigate("/generator");
  };

  return (
    <>
      <div>
        <div>
          <div className="btn btn-ghost normal-case text-2xl" onClick={homebtn}>
            ME:ME
          </div>
          {!cookie ? (
            <div className="text-right">
              <div
                className="btn btn-ghost normal-case text-base"
                onClick={signbtn}
              >
                로그인
              </div>
            </div>
          ) : (
            <div className="text-right">
              <div
                className="btn btn-ghost normal-case text-base"
                onClick={logoutbtn}
              >
                로그아웃
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="my-modal-1"
              className="btn btn-ghost text-base font-bold"
            >
              수배
            </label>
          </div>
          <div>
            <button
              className="btn btn-ghost text-base font-bold"
              onClick={generator}
            >
              짤 생성
            </button>
          </div>
        </div>
      </div>
      <Wantedmodal modalnumber="my-modal-1" />
    </>
  );
};
export default Main;
